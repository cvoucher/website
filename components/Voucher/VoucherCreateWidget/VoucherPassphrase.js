import { Stack } from "@mui/system";
import { InputField } from "../InputField";


export const VoucherPassphrase = ({voucherState}) => {
  const [voucher, setVoucher] = voucherState;

  const updateVoucherPassphrase = (passphrase) => {
    setVoucher(old => ({...old, passphrase: {value: passphrase, errorText: old.passphrase.errorText, isValid: old.isValid}}));
  }

  const validate = () => {
    let error = "";
    let isValid = true;
    const passphrase = voucher.passphrase.value;
    const passphraseMinLen = 6;

    if(passphrase.length < passphraseMinLen){
      isValid = false;
      error = `Passphrase should be at least ${passphraseMinLen} characters long.`
    }
    
    setVoucher(old => ({
      ...old, passphrase: {
        value: old.passphrase.value, 
        errorText: error,
        isValid: isValid
    }}));
  }

  return (
    <Stack>
      <InputField id="voucher-secret" type="password" label="Passphrase" variant="standard"
        data={voucher.passphrase} infoText="Secret to redeem the voucher."
        onUpdate={(text) => updateVoucherPassphrase(text)}
        validate={validate}
        />
    </Stack>
  );
}