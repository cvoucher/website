import React from "react";
// material-ui components
import { makeStyles } from "@mui/styles";
// core components
import Card from "/components/Card/Card.js";
import CardBody from "/components/Card/CardBody.js";

import imagesStyles from "/styles/jss/nextjs-material-kit/imagesStyles.js";

import { cardTitle } from "/styles/jss/nextjs-material-kit.js";
import { Grid, Stack } from "@mui/material";

const styles = {
  ...imagesStyles,
  cardTitle,
};

const useStyles = makeStyles(styles);

export default function MemberCard({image, title, children}) {
  const classes = useStyles();
  return (
    <Card>
      <Grid container flexDirection={{xs: "column", sm: "row"}}>
        <Grid item xs={12} lg={5}>
          <img
          style={{
            height: "320px", display: "block", backgroundColor: "rgb(21 80 121 / 95%)", padding: "10px", 
            objectFit: "contain", 
            borderRadius: {
              xs: "5px 5px 0px 0px",
              sm: "5px 0px 0px 5px"
            }}}
          className={classes.imgCardTop}
          src={image}
          alt="Card-img-cap"
        />
        </Grid>
        <Grid item xs={12} lg={7}>
          <CardBody>
            <h4 className={classes.cardTitle}>{title}</h4>
            <Stack>{children}</Stack>
          </CardBody>
        </Grid>
      </Grid>
    </Card>
  );
}