import { Stack } from "@mui/system";
import { NumericInputTextField } from "./NumericInputField";

export const VoucherClaimFee = ({voucherState}) => {
  const [voucher, setVoucher] = voucherState;
  const updateVoucherClaimFee = (claimFee) => {
    console.debug(voucher);
    setVoucher(old => ({...old, claimFee: {value: claimFee, errorText: old.claimFee.errorText, isValid: old.claimFee.isValid}}));
  };

  const validate = () => {
    let error = "";
    let isValid = true;
    const claimFee = voucher.claimFee.value;

    if(claimFee.length == 0){
      error = "Please define a claim fee.";
      isValid = false;
    } else if(isNaN(claimFee) || isNaN(parseFloat(claimFee))){
      error = "Claim fee is not a number.";
      isValid = false;
    }

    setVoucher(old => ({...old, claimFee: {value: old.claimFee.value, errorText: error, isValid: isValid}}));
  }

  return (
    <Stack>
      <NumericInputTextField id="voucher-claim-fee" label="Ethereum Claim Fee" variant="standard" 
        data={voucher.claimFee} infoText="Fee a user pays for claiming to know the voucher secret."
        onUpdate={(text) => updateVoucherClaimFee(text)}
        validate={validate}
        />
    </Stack>
  );
}