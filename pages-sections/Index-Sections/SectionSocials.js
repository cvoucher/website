import React from "react";
// plugin that creates slider
// @mui components
import { makeStyles } from "@mui/styles";
// @mui/icons-material
// core components
import { GitHub, Telegram, Twitter, YouTube } from "@mui/icons-material";

import styles from "/styles/jss/nextjs-material-kit/pages/componentsSections/whatWeDoStyle.js";
import { Grid } from "@mui/material";
import SocialCard from "../../components/Social/SocialCard";
import ContentBox from "../../components/ContentBox/ContentBox";

const useStyles = makeStyles(styles);

export default function SectionSocials() {
  const classes = useStyles();
  
  return (
    <ContentBox id="socials" title="Socials">
      <Grid container spacing={2} justifyContent="space-between">
        <Grid item xs={6} sm={3} lg={2}>
          <SocialCard location="https://twitter.com/cryptovoucher23" style={{backgroundColor: "rgb(29, 155, 240)", borderRadius: "5px"}}>
            <Twitter style={{fontSize: "3rem", color: "#fff"}} />
          </SocialCard>
        </Grid>
        <Grid item xs={6} sm={3} lg={2}>
          <SocialCard location="https://t.me/cryptovoucher23" title="Telegram" style={{backgroundColor: "#0088cc", borderRadius: "5px"}}>
            <Telegram style={{fontSize: "3rem", color: "#fff"}} />
          </SocialCard>
        </Grid>
        <Grid item xs={6} sm={3} lg={2}>
          <SocialCard location="https://www.youtube.com/@cryptovoucher23" style={{backgroundColor: "#c00", borderRadius: "5px"}}>
            <YouTube style={{fontSize: "3rem", color: "#fff"}} />
          </SocialCard>
        </Grid>
        <Grid item xs={6} sm={3} lg={2}>
          <SocialCard location="https://github.com/cvoucher" style={{backgroundColor: "#24292f", borderRadius: "5px"}}>
            <GitHub style={{fontSize: "3rem", color: "#fff"}} />
          </SocialCard>
        </Grid>
      </Grid>
    </ContentBox>
  );
}
