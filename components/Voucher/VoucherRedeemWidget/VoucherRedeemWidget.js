import { Button, Divider, Grid, Paper, TextField, Typography } from "@mui/material";
import { makeStyles, styled } from "@mui/styles";
import { Stack } from "@mui/system";
import { Web3Button } from '@web3modal/react'
import React from "react";
import { VoucherCode } from "./VoucherCode";
import { CVoucher } from "../../../web3/cvoucher";
import { formatEther, toHex, zeroAddress } from "viem";
import { useAccount } from "wagmi";
import { VoucherPassphrase } from "./VoucherPassphrase";
import { Notification } from "../../Notification/Notification";
import RedemptionSuccessfulContainer from "./VoucherRedemptionSuccessfulContainer";
import { Confetti } from "../../Confetti/Confetti";


const allStyles = {
  voucherContainer: {
    padding: "15px",
    maxWidth: "450px",
    background: "#22b38469"
  }
}
const useStyles = makeStyles(allStyles);

const formatVoucher = async(_voucher, voucherResult) => {
  _voucher.value = voucherResult.value;
  _voucher.redemptionHash = voucherResult.redemptionHash;
  _voucher.claimFee = voucherResult.claimFee;
  _voucher.claimedBy = voucherResult.claimedBy;
  _voucher.claimExpiresAt = voucherResult.claimExpiresAt;
  _voucher.voucherExists =  voucherResult.value > 0 && voucherResult.isActive;
  const voucherNotClaimed = voucherResult.claimedBy == zeroAddress;
  const currentTime = parseInt(Date.now() / 1_000);
  const voucherClaimExpired = voucherResult.claimExpiresAt < currentTime;
  // Voucher can be claimed if:
  // - Voucher is actually valid
  // - No one is currently claiming it
  // - Claim period has expired for the one currently claiming
  _voucher.claimable = _voucher.voucherExists && (voucherNotClaimed || voucherClaimExpired);
  // Check if voucher exists.
  // This is the case if the redemption hash is not empty.
  if(!_voucher.voucherExists){
    _voucher.code.errorText = "Voucher does not exist.";
  }
  
  return _voucher;
}

const LoadVoucherDetailsButton = ({voucherState, loadClaimStage, loadRedeemStage}) => {
  const [voucher, setVoucher] = voucherState;
  const [voucherLoading, setVoucherLoading] = React.useState(false);
  const wallet = useAccount();
  const voucherIsValid = voucher.code.isValid;
  
  const loadVoucher = async() => {
    if(!voucherIsValid) {
      Notification.show("Please fix the red-marked issues.");
      return;
    }
    setVoucherLoading(true);
    const voucherResult = await CVoucher.getVoucher(voucher.code.value);
    const formattedVoucher = await formatVoucher(voucher, voucherResult);
    setVoucher(formattedVoucher);
    setVoucherLoading(false);
    if(!formattedVoucher.voucherExists)
      return;

    // If we are the claimer and there is time left to redeem the voucher, show it.
    if(voucher.claimedBy == wallet.address && voucher.claimExpiresAt > parseInt(Date.now() / 1000))
      loadRedeemStage();
    else
      loadClaimStage();
  }

  return (
    <>
      <Button variant="contained" onClick={loadVoucher} disabled={voucherLoading || !voucherIsValid}>
        {!voucherLoading && "Load voucher"}
        {voucherLoading && "Loading..."}
      </Button>
    </>
  )
}

const ClaimVoucherButton = ({voucherState, loadRedeemStage}) => {

  const [voucher, setVoucher] = voucherState;
  const [voucherClaiming, setVoucherClaiming] = React.useState(false);

  const claimVoucher = async() => {
    setVoucherClaiming(true);
    const { success, message } = await CVoucher.claimVoucher(voucher.code.value, voucher.claimFee);
    Notification.show(message);
    if(success){
      const voucherResult = await CVoucher.getVoucher(voucher.code.value);
      const formattedVoucher = await formatVoucher(voucher, voucherResult);
      setVoucher(formattedVoucher);
      loadRedeemStage();
    }
      
    
    setVoucherClaiming(false);
  }

  return (
    <>
      <Button variant="contained" onClick={claimVoucher} disabled={voucherClaiming || !voucher.claimable}>
        {!voucherClaiming && "Claim voucher"}
        {voucherClaiming && "Claiming..."}
      </Button>
    </>
  )
}

const RedeemVoucherButton = ({voucherState, loadRedeemSuccessfulStaged}) => {
  const [voucher, setVoucher] = voucherState;
  const [voucherReedemption, setVoucherReedemption] = React.useState(false);

  const redeemVoucher = async() => {
    setVoucherReedemption(true);
    const { success, message } = await CVoucher.redeemVoucher(voucher.code.value, voucher.passphrase.value);
    Notification.show(message);
    setVoucherReedemption(false);
    if(success){
      loadRedeemSuccessfulStaged();
      Confetti.show();
      Notification.show("Voucher redeemed!");
    }
      
  }

  return (
    <>
      <Button variant="contained" onClick={redeemVoucher} disabled={voucherReedemption ||  !voucher.code.isValid || !voucher.passphrase.isValid}>
        {!voucherReedemption && "Redeem voucher"}
        {voucherReedemption && "Redeeming..."}
      </Button>
    </>
  )
}

const LoadStage = ({voucherState}) => {
  const [voucher, setVoucher] = voucherState;
  return (
    <VoucherCode voucherState={[voucher, setVoucher]} />
  )
}

const ClaimStage = ({voucherState, voucherStage, reloadClaimStage}) => {
  const [voucher, setVoucher] = voucherState;

  const CanClaimContainer = () => {
    return (
      voucher.claimable &&
        <p>
          Before you can redeem your voucher you first have to claim to know the secret! 
          The voucher creator requires you to put in <strong>{formatEther(voucher.claimFee)} ETH as claim fees</strong>.
          No worries: You will get <strong>100% of the claim fees back</strong> after redemption.
        </p>
    );
  }
  const CantClaimContainer = () => {
    return (
      !voucher.claimable && 
      <p>
        You can't claim the voucher as someone is currently claiming it.
        Please wait a few minutes and come back to try again.
      </p>
    )
  }

  return (
    voucherStage == 1 &&
    <>
      <CanClaimContainer />
      <CantClaimContainer />
    </>
  )
}

const RedeemStage = ({voucherState, voucherStage}) => {
  const [voucher, setVoucher] = voucherState;
  const [redeemTimeLeft, setRedeemTimeLeft] = React.useState(0);

  React.useEffect(() => {
    if(voucher.claimExpiresAt > 0){
      console.log(voucher.claimExpiresAt);
      const redeemTimer = setInterval(() => {
        const timeLeft = redeemTimeLeft > 0 ? 
          redeemTimeLeft - 1 : 
          parseInt(voucher.claimExpiresAt) - parseInt(Date.now() / 1000) - 1;
        if(timeLeft <= 0){
          clearInterval(redeemTimer);
        }
        setRedeemTimeLeft(timeLeft);
      }, 1000);
    }
    
  }, [voucher.claimExpiresAt]);

  const redeemTimeMinutesLeft = redeemTimeLeft >= 60 ? parseInt((redeemTimeLeft - 1) / 60) + 1 : 0;
  const strRedeemTimeLeft = redeemTimeMinutesLeft > 0 ? `${redeemTimeMinutesLeft} minutes`: `${redeemTimeLeft} seconds`;
  return (
    voucherStage == 2 && 
    <>
      <VoucherPassphrase voucherState={[voucher, setVoucher]} />
      <p>
        All things are settled! Ready to redeem your voucher?
        Enter the password and claim your reward.<br />
        {redeemTimeLeft > 0 && <strong>You have {strRedeemTimeLeft} left for redemption.</strong>}
      </p>
    </>
  )
}

const VoucherRedeemWidget = () => {
  const [voucher, setVoucher] = React.useState({
    code: {value: "", errorText: "", isValid: false},
    passphrase: {value: "", errorText: "", isValid: false},
    redemptionHash: "",
    value: 0,
    voucherExists: false,
    claimedBy: "",
    claimFee: 0,
    claimExpiresAt: 0,
    claimInfoText: "",
    claimable: false
  });
  // Four different stages: 0:Load => 1:Claim => 2:Redeem => 3: Successfully redeemed.
  const [voucherStage, setVoucherStage] = React.useState(0);

  const wallet = useAccount();
  const [ready, setIsReady] = React.useState(false);
  React.useEffect(() => setIsReady(true), []);

  React.useEffect(() => {
    if(voucherStage == 3){
      $("#redemption-successful").animate({opacity: 1}, 600);
    }
  }, [voucherStage]);


  const classes = useStyles();
  return (
    <Paper className={classes.voucherContainer} elevation={5}>
      <Grid container rowGap={1}>
        { voucherStage < 3 &&
          <>
            <Grid item xs={12}>
              <Typography variant="h4" style={{color: "#084c36"}}>Redeem Voucher</Typography>
              <Divider style={{marginTop: "10px"}} />
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                    <LoadStage voucherState={[voucher, setVoucher]} />
                    <Grid container>
                      { voucher.value > 0 && 
                      <Grid item xs={12} container justifyContent="space-between">
                        <Grid item>
                          <strong><p>Voucher value:</p></strong>
                        </Grid>
                        <Grid item>
                          <strong style={{fontSize: "1.5rem"}}>{formatEther(voucher.value)} ETH</strong>
                        </Grid>
                      </Grid>
                      }
                      <Grid item xs={12}>
                        <ClaimStage voucherState={[voucher, setVoucher]} voucherStage={voucherStage} reloadClaimStage={() => setVoucherStage(1)} />
                      </Grid>
                      <Grid item xs={12}>
                        <RedeemStage voucherState={[voucher, setVoucher]} voucherStage={voucherStage} />
                      </Grid>
                    </Grid>
              </Stack>
            </Grid>
            <Grid item xs={12} marginTop={3} container justifyContent="space-between">
              <Grid item>
                {ready && wallet.isConnected && voucherStage == 0 && <LoadVoucherDetailsButton voucherState={[voucher, setVoucher]} loadClaimStage={() => setVoucherStage(1)} loadRedeemStage={() => setVoucherStage(2)} />}
                {ready && wallet.isConnected && voucherStage == 1 && <ClaimVoucherButton voucherState={[voucher, setVoucher]} loadRedeemStage={() => setVoucherStage(2)} />}
                {ready && wallet.isConnected && voucherStage == 2 && <RedeemVoucherButton voucherState={[voucher, setVoucher]} loadRedeemSuccessfulStaged={() => setVoucherStage(3)} />}
              </Grid>
              <Grid item>
                <Web3Button />
              </Grid>
            </Grid>
          </>
        }
        { voucherStage == 3 && 
          <div id="redemption-successful" style={{opacity: 0}}>
            <RedemptionSuccessfulContainer voucherState={[voucher, setVoucher]} voucherStageState={[voucherStage, setVoucherStage]} />
          </div>
        }
      </Grid>
    </Paper>
  )
}

export default VoucherRedeemWidget;