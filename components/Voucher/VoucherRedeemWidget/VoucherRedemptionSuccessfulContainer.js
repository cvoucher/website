import { Button, Grid, Typography } from "@mui/material";
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import { formatEther } from "ethers";
import HappyFace from "../../Icons/HappyFace";

const RedemptionSuccessfulContainer = ({voucherState, voucherStageState}) => {
  const [voucher, setVoucher] = voucherState;
  const [voucherStage, setVoucherStage] = voucherStageState;

  const redeemAnotherVoucher = () => {
    // Reset voucher.
    setVoucher({
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
    // Reset stage.
    setVoucherStage(0);
  }

  return (
    <Grid container justifyContent="center" gap={2}>
      <Grid item>
        <Typography variant="h4">{formatEther(voucher.value)} ETH earned</Typography>
      </Grid>
      <Grid item>
        <HappyFace style={{fill: "#13614cc4", width: "12em", height: "12em"}} />
      </Grid>
      <Grid item style={{textAlign: "center"}}>
        <Typography variant="body" style={{fontSize: "1.1rem"}}>
          Redemption has been successful, congratulations!
          Thank you for being part of <strong>CVoucher</strong>, see you soon.
        </Typography>
      </Grid>
      <Grid item style={{marginTop: 10}}>
        <Button variant="contained" onClick={redeemAnotherVoucher}>Redeem another voucher</Button>
      </Grid>
      
    </Grid>
  )
}

export default RedemptionSuccessfulContainer;