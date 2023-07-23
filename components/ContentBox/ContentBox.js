import React from "react";
// material-ui components
import { makeStyles } from "@mui/styles";
// core components
import Card from "/components/Card/Card.js";
import CardBody from "/components/Card/CardBody.js";
import Button from "/components/CustomButtons/Button.js";

import contentBoxStyle from "/styles/jss/cvoucher/components/contentBoxStyle.js";
import { Grid } from "@mui/material";

const styles = {
  ...contentBoxStyle,
};
const useStyles = makeStyles(styles);


const ContentBox = ({id, title, className, children}) => {
  const classes = useStyles();
  
  return (
    <div id={id} className={classes.outerContainer}>
      <div className={[classes.container, className].join(" ")}>
        <Grid container>
          <Grid item xs={12}>
            <h2 className={classes.title}>{title}</h2>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.content}>
              {children}
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default ContentBox;