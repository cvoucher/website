import { Grid, IconButton } from "@mui/material";
import SyncIcon from '@mui/icons-material/Sync';
import { Stack } from "@mui/system";
import { InputField } from "../InputField";
import { CVoucher } from "../../../web3/cvoucher";
import { toHex } from "viem";

const GenerateRandomCodeButton = ({updateVoucherCode, validate}) => {
  const randomCode = () => {
    const rnd = () => Math.floor(Math.random() * 62);
    const characterMap = "ABCDEFGHJIJLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let codeString = "";
    for(const _ of Array(24).keys())
      codeString += characterMap[rnd()];

    return codeString;
  }
  const onGenerateClick = () => {
    const newCode = randomCode()
    updateVoucherCode(newCode);
    validate(newCode);
  }

  return (
    <IconButton style={{width: "48px", height: "48px"}} onClick={onGenerateClick}>
      <SyncIcon />
    </IconButton>
  )
}

export const VoucherCode = ({voucherState}) => {
  const [voucher, setVoucher] = voucherState;

  const updateVoucherCode = (code) => {
    setVoucher(old => ({...old, code: {value: code, errorText: old.code.errorText, isValid: old.code.isValid}}));
  }
  
  const validate = async(codeToValidate) => {
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
    } else {
        // Valid. Check if it already exists.
        const existingVoucher = await CVoucher.getVoucher(code);
        if(existingVoucher.isActive){
          isValid = false;
          error = "Voucher code is already taken.";
        }
    }

    setVoucher(old => ({
      ...old, code: {
        value: old.code.value, 
        errorText: error,
        isValid: isValid
    }}));
  }

  const validateCode = (event) => {
    validate();
  }

  return (
    <Stack>
      <Grid container>
        <Grid item sx={{flexGrow: 1}}>
          <InputField 
            id="voucher-code" label="Voucher Code" variant="standard" style={{width: "100%"}} 
            data={voucher.code} infoText="Code to redeem."
            onUpdate={(text) => updateVoucherCode(text)}
            validate={validateCode}
            />
        </Grid>
        <Grid item xs="auto" container alignItems="center">
          <GenerateRandomCodeButton updateVoucherCode={updateVoucherCode} validate={validate} />
        </Grid>
      </Grid>
    </Stack>
    
  );
}