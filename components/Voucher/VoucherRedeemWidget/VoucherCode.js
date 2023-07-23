import { Grid, IconButton } from "@mui/material";
import SyncIcon from '@mui/icons-material/Sync';
import { Stack } from "@mui/system";
import { InputField } from "../InputField";
import { CVoucher } from "../../../web3/cvoucher";
import { toHex } from "viem";


export const VoucherCode = ({voucherState}) => {
  const [voucher, setVoucher] = voucherState;

  const updateVoucherCode = (code) => {
    setVoucher(old => ({...old, code: {value: code, errorText: old.code.errorText, isValid: old.code.isValid}}));
  }
  
  const validate = (codeToValidate) => {
    // Voucher code should be of certain length.
    const code = typeof(codeToValidate) !== typeof("") ? voucher.code.value : codeToValidate;
    const voucherCodeMinLen = 4; const voucherCodeMaxLen = 32;
    const allowedCharacters = /[A-Za-z0-9]+/;
    let isValid = true;
    let error = "";
    if(!(code.length >= voucherCodeMinLen && code.length <= voucherCodeMaxLen)){
      isValid = false;
      error = `Voucher code should be between ${voucherCodeMinLen} and ${voucherCodeMaxLen} characters.`;
    } 
    // Only certain characters.
    else if(!allowedCharacters.test(code)) {
      isValid = false;
      error = "Only the follow characters are allowed: A-Z, a-z, 0-9";
    }

    setVoucher(old => ({
      ...old, code: {
        value: old.code.value, 
        errorText: error,
        isValid: isValid
    }}));
  }

  return (
    <InputField 
      id="voucher-code" label="Voucher Code" variant="standard" style={{width: "100%"}} 
      data={voucher.code} infoText="Code to redeem."
      onUpdate={(text) => updateVoucherCode(text)}
      validate={validate}
      />
    
  );
}