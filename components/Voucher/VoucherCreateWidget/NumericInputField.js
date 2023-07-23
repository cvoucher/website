import { TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { InputInformation } from "../InputInformation";

export const NumericInputTextField = (props) => {
  const {onUpdate, data, infoText, validate, ...rest} = props;
  const { value, errorText } = data;
  const evaluateNumber = (number) => {
    if(/^(0|[1-9]\d*)(\.\d*){0,1}$/.test(number) || number.length == 0)
      onUpdate(number);
  }
  const leavingNumberField = () => {
    if(value.slice(-1) == ".")
      onUpdate(value.slice(0, -1));

    validate();
  }
  return (
    <Stack>
      <TextField {...rest} value={value} helperText={errorText} error={errorText.length > 0} onChange={(e) => evaluateNumber(e.target.value)} onBlur={leavingNumberField} />
      <InputInformation infoText={infoText} />
    </Stack>
  )
}