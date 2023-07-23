import { Button, Grid, Typography } from "@mui/material";
import CopyField from "../../CopyField/CopyField";
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import GiftAndHands from "../../Icons/GiftAndHands";
import { formatEther } from "viem";


const CopyVoucherCodeField = ({voucher, containerStyle}) => {
  return (
    <CopyField label="Voucher Code" content={voucher.code.value} message="Voucher Code copied to clipboard" containerStyle={containerStyle} />
  )
}

const CopyVoucherPassphraseField = ({voucher, containerStyle}) => {
  return (
    <CopyField label="Voucher Passphrase" content={voucher.passphrase.value} message="Voucher Passphrase copied to clipboard" containerStyle={containerStyle} inputType="password" />
  )
}

export const VoucherCreationSuccessfulContainer = ({voucherState, voucherStageState}) => {
  const [voucher, setVoucher] = voucherState;
  const [voucherStage, setVoucherStage] = voucherStageState;

  const createAnotherVoucher = () => {
    // Reset voucher.
    setVoucher({
      code: {value: "", errorText: "", isValid: false},
      passphrase: {value: "", errorText: "", isValid: false},
      value: {value: "", errorText: "", isValid: false},
      creationFee: {fee: voucher.creationFee.fee, minFee: voucher.creationFee.minFee, value: 0},
      claimFee: {value: "0.1", errorText: "", isValid: true},
    });
    // Reset stage.
    setVoucherStage(0);
  }

  return (
    <Grid container id="creation-successful" justifyContent="center" rowGap={2}>
      <Grid item xs={12}>
        <Typography variant="h4" style={{textAlign: "center"}}>Voucher created</Typography>
      </Grid>
      <Grid item>
        <GiftAndHands style={{fill: "#19347290", width: "12em", height: "12em"}} />
      </Grid>
      <Grid item xs={12} style={{textAlign: "center"}}>
        <Typography variant="body" style={{fontSize: "1.2rem"}}>
          Creation has been successful, well done!
          Feel free to use the fields below to copy your voucher details or create another one.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <CopyVoucherCodeField voucher={voucher} />
      </Grid>
      <Grid item xs={12}>
        <CopyVoucherPassphraseField voucher={voucher} />
      </Grid>
      <Button variant="contained" onClick={createAnotherVoucher}>Create another voucher</Button>
    </Grid>
  )
}