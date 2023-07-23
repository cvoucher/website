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
import { Listing, ListingItem, NumberedListingItem } from "../../components/Listing/Listing";

const allStyles = {
  centerSmall: {
    "@media(max-width: 600px)": {
      margin: "auto"
    }
  },
  ...styles
}
const useStyles = makeStyles(allStyles);

const InitFadeOnScroll = (threshold) => {
  var runFadeAnimation = true;

  $(document).ready(() => {
    $(window).on("scroll", () => {
      let container = document.getElementById("img-farm-sky");
      let offsetTop = container.getBoundingClientRect().top;

      if(offsetTop <= threshold && runFadeAnimation){
        runFadeAnimation = false;
        alert("NOW");
      }
    });
  });
}

export default function SectionRedeemVouchers() {
  const classes = useStyles();
  
  return (
    <ContentBox id="redeem-voucher" className={[classes.mainContainer, ""].join(" ")}>
      <Grid container spacing={2} className={classes.container} justifyContent="space-between">
        <Grid item xs={12} lg={6}>
          <Stack spacing={4}>
            <Typography variant="h3" style={{paddingTop: 0}}>Redeem your voucher</Typography>
            <Grid container>
              <Grid item xs={12} sm={10}>
              <Typography variant="body" style={{fontSize: "1.2rem"}}>
                <Stack spacing={2}>
                  <span>Redeeming a voucher has never been easier:</span>
                  <Listing>
                    <NumberedListingItem number="1." textStyle={{fontSize: "1.1rem"}} text="Enter the voucher code and load the voucher" />
                    <NumberedListingItem number="2." textStyle={{fontSize: "1.1rem"}} text="Claim to know the passphrase and pay the claim fee" />
                    <NumberedListingItem number="3." textStyle={{fontSize: "1.1rem"}} text="Enter the passphrase and redeem the voucher" />
                  </Listing>
                  <span>
                    For step 2, you have to pay a claim fee. 
                    That fee is a necessary part of our two-phase redemption protocol and you can learn more about it below.
                    Just keep in mind: You get 100% of that fee back. 
                    We just use it as a security measure.
                  </span>
                </Stack>
              </Typography>
              </Grid>
            </Grid>
          </Stack>
        </Grid>
        <Grid item lg={6}>
          <VoucherRedeemWidget />
        </Grid>
      </Grid>
    </ContentBox>
  );
}
