import { Grid, TextField } from "@mui/material";

import { Stack } from "@mui/system";
import { styled } from "@mui/styles";
import { InputInformation } from "./InputInformation";

export const InputField = ({data, infoText, onUpdate, validate, ...rest}) => {
  const { value, errorText } = data;
  return (
    <Stack>
      {errorText !== undefined &&
        <TextField {...rest} value={value} helperText={errorText} error={errorText.length > 0} onChange={(e) => onUpdate(e.target.value)} onBlur={validate} />
      }
      {errorText === undefined &&
        <TextField {...rest} value={value} onChange={(e) => onUpdate(e.target.value)} onBlur={validate} />
      }
      <InputInformation infoText={infoText} />
    </Stack>
  )
}