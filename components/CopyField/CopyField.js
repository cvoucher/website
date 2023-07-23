
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

const CopyField = (props) => {
  const classes = useStyles();
  const onCopyClick = () => {
    navigator.clipboard.writeText(content);
    Notification.show(message);
  }

  const {label, content, message, containerStyle, inputType} = props;

  return (
    <Grid container style={containerStyle}>
      <Grid item xs={9} sm={10}>
        <TextField 
          id="outlined-basic" 
          label={label}
          variant="outlined"
          InputLabelProps={{ shrink: true }} 
          value={content}
          fullWidth 
          disabled 
          style={{color: "#fff"}}
          className={classes.faiTextField}
          type={inputType === undefined ? "text": inputType}
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

export default CopyField;