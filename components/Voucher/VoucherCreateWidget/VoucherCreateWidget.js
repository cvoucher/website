import { Button, Divider, Grid, IconButton, Paper, TextField, Typography } from "@mui/material";
import { makeStyles, styled } from "@mui/styles";
import { Stack } from "@mui/system";
import Link from "next/link";
import { Web3Button } from '@web3modal/react'
import { ethers } from "ethers"


import InfoIcon from '@mui/icons-material/Info';
import SyncIcon from '@mui/icons-material/Sync';
import React from "react";
import { useAccount, useContract } from 'wagmi'
import { CVoucher } from "../../../web3/cvoucher";
import { formatEther, keccak256, parseEther, toHex, zeroAddress } from "viem";
import { Notification } from "../../Notification/Notification";
import { VoucherPassphrase } from "./VoucherPassphrase";
import { VoucherCode } from "./VoucherCode";
import { VoucherValue } from "./VoucherValue";
import { VoucherClaimFee } from "./VoucherClaimFee";
import { VoucherCreationSuccessfulContainer } from "./VoucherCreationSuccessfulContainer";


const allStyles = {
  voucherContainer: {
    padding: "15px",
    maxWidth: "450px",
    background: "#c0ceffe0"
  }
}
const useStyles = makeStyles(allStyles);

const CreateVoucherButton = ({voucherState, generationSuccessful}) => {
  const [voucher, setVoucher] = voucherState;
  const [inGeneration, setInGeneration] = React.useState(false);

  const voucherIsValid = voucher.code.isValid && voucher.passphrase.isValid && voucher.value.isValid && voucher.claimFee.isValid;
  const validateVoucher = async() => {
    if(!voucherIsValid) {
      Notification.show("Please fix the red-marked issues.");
      return;
    }

    // Final value to put in includes our fees.
    const finalVoucherValue = (parseEther(voucher.value.value) + parseEther(voucher.creationFee.value.toString())).toString();
    const hashedPassphrase = keccak256(voucher.passphrase.value);
    const formattedClaimFee = parseEther(voucher.claimFee.value);
    setInGeneration(true);
    const { success, message } = await CVoucher.createVoucher(voucher.code.value, hashedPassphrase, finalVoucherValue, formattedClaimFee);
    setInGeneration(false);
    if(success) {
      generationSuccessful();
      Notification.show("Voucher created!");
    }
  }

  return (
    <>
      <Button variant="contained" onClick={validateVoucher} disabled={inGeneration || !voucherIsValid}>
        {!inGeneration && "Generate"}
        {inGeneration && "Waiting for confirmation..."}
      </Button>
    </>
  )
}

const VoucherGenerationFee = ({voucher}) => {
  return (
    voucher.creationFee.value > 0 && <p>For generating the voucher, we take a fee of {voucher.creationFee.value} ETH.</p>
  )
}

const VoucherCreateWidget = () => {
  const [voucher, setVoucher] = React.useState({
    code: {value: "", errorText: "", isValid: false},
    passphrase: {value: "", errorText: "", isValid: false},
    value: {value: "", errorText: "", isValid: false},
    creationFee: {fee: 0, minFee: 0, value: 0},
    claimFee: {value: "0.1", errorText: "", isValid: true},
  });
  
  
  const wallet = useAccount();
  const [ready, setIsReady] = React.useState(false);
  const [generationStage, setGenerationStage] = React.useState(0);

  React.useEffect(() => {
    setIsReady(true);
    const loadVoucherFees = async() => {
      const { success, data} = await CVoucher.creationFee();
      if(success){
        setVoucher(old => ({...old, creationFee: {fee: data.fees, minFee: parseFloat(formatEther(data.minFees.toString())), value: 0}}));
      } else {
        Notification.show("Failed to get generation fee.");
      }
    }
    loadVoucherFees();
  }, []);
  React.useEffect(() => {
    if(generationStage == 1){
      $("#creation-successful").animate({opacity: 1}, 1000);
    }
  }, [generationStage]);

  const classes = useStyles();
  return (
    <Paper className={classes.voucherContainer} elevation={5}>
      <Grid container rowGap={1}>
        { generationStage == 0 && 
          <div id="creation-container">
            <Grid item xs={12}>
              <Typography variant="h4" style={{color: "#0b365a"}}>Generate Voucher</Typography>
              <Divider style={{marginTop: "10px"}} />
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <VoucherCode voucherState={[voucher, setVoucher]} />
                <VoucherPassphrase voucherState={[voucher, setVoucher]} />
                <VoucherValue voucherState={[voucher, setVoucher]} />
                <VoucherClaimFee voucherState={[voucher, setVoucher]} />
                <VoucherGenerationFee voucher={voucher} />
              </Stack>
            </Grid>
            <Grid item xs={12} marginTop={3} container justifyContent="space-between">
              <Grid item>
                {ready && wallet.isConnected && <CreateVoucherButton voucherState={[voucher, setVoucher]} generationSuccessful={() => setGenerationStage(1)} />}
              </Grid>
              <Grid item>
                <Web3Button />
              </Grid>
            </Grid>
          </div>
        }
        {generationStage == 1 && 
          <div id="creation-successful" style={{opacity: 0}}>
            <VoucherCreationSuccessfulContainer voucherState={[voucher, setVoucher]} voucherStageState={[generationStage, setGenerationStage]} />
          </div>
        }
      </Grid>
    </Paper>
  )
}


export default VoucherCreateWidget;