
import { ContentCopy } from "@mui/icons-material";
import { Button, Grid, IconButton, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Notification } from "../Notification/Notification";

const styles = {
  faiTextField: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#333!important',
      },
      '& input': {
        color: "#333",
        "-webkit-text-fill-color": "#333"
      },
    },
    '& .MuiInputLabel-root': {
      color: "#333"
    }
  },
  faiCopyButton: {
    color: "#333"
  }
};
const useStyles = makeStyles(styles);

const ContractAddressInfo = (props) => {
  const classes = useStyles();
  const tokenAddress = "Revealed soon";
  const onCopyClick = () => {
    navigator.clipboard.writeText(tokenAddress);
    Notification.show("Address copied to clipboard!");
  }


  return (
    <Grid container>
      <Grid item xs={9} sm={10}>
        <TextField 
          id="outlined-basic" 
          label="Token address" 
          variant="outlined"
          InputLabelProps={{ shrink: true }} 
          value={tokenAddress}
          fullWidth 
          disabled 
          style={{color: "#fff"}}
          className={classes.faiTextField}
          />
      </Grid>
      <Grid item>
        <IconButton aria-label="copy" size="large" className={classes.faiCopyButton} onClick={onCopyClick}>
          <ContentCopy fontSize="inherit" />
        </IconButton>
      </Grid>
    </Grid>
  )
}

export default ContractAddressInfo;