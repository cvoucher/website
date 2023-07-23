import { Stack } from "@mui/system";
import { NumericInputTextField } from "./NumericInputField";
import { formatEther, parseEther } from "viem";



export const VoucherValue = ({voucherState}) => {
  const [voucher, setVoucher] = voucherState;
  const updateVoucherValue = (value) => {
    setVoucher(old => ({...old, value: {value: value, errorText: old.value.errorText, isValid: old.value.isValid}}));
  };

  const validate = () => {
    let error = "";
    let isValid = true;
    const value = voucher.value.value;

    if(value.length == 0){
      isValid = false;
      error = "Please define a voucher value.";
    }
    else if(isNaN(value) || isNaN(parseFloat(value))){
      isValid = false;
      error = "Value is not a number.";
    }
    else if(parseFloat(value) == 0){
      isValid = false;
      error = "Please define a voucher value greater 0.";
    }
    // Also update the fee we take if the validation has been successful.
    let creationFee = voucher.creationFee;
    if(isValid){
      // Use ether notation for calculation since it is more accurate.
      const feeToPay = parseFloat(formatEther(parseEther(value) * BigInt(creationFee.fee) / BigInt(10_000)));
      creationFee.value = feeToPay > creationFee.minFee ? feeToPay: creationFee.minFee;
    }
    setVoucher(old => ({...old, value: {value: value, errorText: error, isValid: isValid}, creationFee: creationFee}));
  }

  return (
    <Stack>
      <NumericInputTextField id="voucher-value" label="Voucher Value" variant="standard" 
        data={voucher.value} infoText="Ethereum amount of voucher."
        onUpdate={(text) => updateVoucherValue(text)}
        validate={validate}
        />
    </Stack>
  );
}