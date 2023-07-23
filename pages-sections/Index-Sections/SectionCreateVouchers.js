import React from "react";
// plugin that creates slider
// @mui components
import { makeStyles } from "@mui/styles";
// @mui/icons-material
// core components
import Button from "/components/CustomButtons/Button.js";

import styles from "/styles/jss/nextjs-material-kit/pages/componentsSections/whatWeDoStyle.js";
import { Grid, Typography } from "@mui/material";

import ContentBox from "../../components/ContentBox/ContentBox";
import { Landscape, Memory } from "@mui/icons-material";

import Ethereum from "../../components/Icons/Ethereum";
import Monitoring from "../../components/Icons/Monitoring";
import WhatWeDoCard from "../../components/Card/WhatWeDoCard";
import VoucherCreateWidget from "../../components/Voucher/VoucherCreateWidget/VoucherCreateWidget";
import VoucherRedeemWidget from "../../components/Voucher/VoucherRedeemWidget/VoucherRedeemWidget";
import { Stack } from "@mui/system";

const allStyles = {
  centerSmall: {
    "@media(max-width: 600px)": {
      margin: "auto"
    }
  },
  ...styles
}
const useStyles = makeStyles(allStyles);

export default function SectionCreateVouchers() {
  const classes = useStyles();
  
  return (
    <ContentBox id="create-voucher" className={[classes.mainContainer, "vouchers"].join(" ")}>
      <Grid container spacing={2} className={classes.container} justifyContent="space-between">
        <Grid item xs={12} lg={6}>
          <Stack spacing={4}>
            <Typography variant="h3" style={{paddingTop: 0}}>Create your voucher</Typography>
            <Grid container>
              <Grid item xs={12} sm={10}>
              <Typography variant="body" style={{fontSize: "1.2rem"}}>
                Ever wanted to gift someone crypto currency in a reliable, easy way? 
                No hidden complexity - just define a voucher code of your choice, a passphrase to secure redemption 
                and a claim fee people have to pay that they get back when successfully redeeming the code. 
                The claim fee is part of our two-phase protocol that ensures nobody redeems your code before you do.
              </Typography>
              </Grid>
            </Grid>
          </Stack>
        </Grid>
        <Grid item lg={6}>
          <VoucherCreateWidget />
        </Grid>
      </Grid>
    </ContentBox>
  );
}
