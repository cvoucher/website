import InfoIcon from '@mui/icons-material/Info';
import { Grid } from '@mui/material';
import { makeStyles, styled } from '@mui/styles';
import { Stack } from '@mui/system';

const allStyles = {
  iconStyle: {
    color: "#606060",
    verticalAlign: "middle"
  }
}
const useStyles = makeStyles(allStyles);

export const InputInformation = ({infoText, children}) => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item style={{flexBasis: 0}}>
        <InfoIcon className={classes.iconStyle} fontSize="small" />
      </Grid>
      <Grid item style={{flexBasis: 1, flexGrow: 1}}>
        <Stack style={{marginLeft: "5px"}}>
          <span style={{fontSize: "14px"}}>{infoText}</span>
          <span>{children}</span>
        </Stack>
      </Grid>
    </Grid>
  )
}