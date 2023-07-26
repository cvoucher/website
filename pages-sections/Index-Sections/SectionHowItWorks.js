import React from "react";
// plugin that creates slider
// @mui components
import { makeStyles } from "@mui/styles";
// @mui/icons-material
// core components
import Button from "/components/CustomButtons/Button.js";

import styles from "/styles/jss/nextjs-material-kit/pages/componentsSections/whatWeDoStyle.js";
import { Grid, Paper, Typography } from "@mui/material";

import ContentBox from "../../components/ContentBox/ContentBox";
import { Landscape, Memory } from "@mui/icons-material";

import Ethereum from "../../components/Icons/Ethereum";
import Monitoring from "../../components/Icons/Monitoring";
import WhatWeDoCard from "../../components/Card/WhatWeDoCard";
import VoucherCreateWidget from "../../components/Voucher/VoucherCreateWidget/VoucherCreateWidget";
import VoucherRedeemWidget from "../../components/Voucher/VoucherRedeemWidget/VoucherRedeemWidget";
import { Stack } from "@mui/system";
import Password from "../../components/Icons/Password";
import Secure from "../../components/Icons/Secure";
import Coins from "../../components/Icons/Coins";
import GiftAndHands from "../../components/Icons/GiftAndHands";
import Text from "../../components/Icons/Text";
import Lock from "../../components/Icons/Lock";
import HappyFace from "../../components/Icons/HappyFace";

const allStyles = {
  centerSmall: {
    "@media(max-width: 600px)": {
      margin: "auto"
    }
  },
  ...styles
}
const useStyles = makeStyles(allStyles);

const StepCard = ({icon, num, content}) => {
  return (
    <Paper style={{padding: "1rem", textAlign: "center", background: "rgb(255 255 255 / 30%)", height: "100%", position: "relative"}} elevation={8}>
      <Typography variant="body" style={{position: "absolute", top: 0, right: 0, margin: "2vh"}}><strong>{num}</strong></Typography>
      <Grid container direction="column">
        <Grid item>
          {icon}
        </Grid>
        <Grid item style={{fontSize: "0.9rem", height: "100%"}}>
          <strong>{content}</strong>
        </Grid>
      </Grid>
    </Paper>
  )
}

const ArrowStep = () => {
  return (
    <Grid item sx={{display: {xs: "none", lg: "flex"}, alignItems:"center", fontSize: "3rem"}}>
      &#10140;
    </Grid>
  );
}

const Creation = () => {
  return (
    <Stack style={{padding: "1.5rem", boxShadow: "0px 0px 10px 1px rgb(28 54 85 / 65%)", borderRadius: "5px", backgroundColor: "rgb(192 206 255 / 25%)"}}>
      <Typography variant="h4" style={{marginBottom: "0.5rem"}}>Creation</Typography>
      <Grid container justifyContent="space-between" gap={{xs: 3, lg: 1}}>
        <Grid item xs={12} sm={5} lg={2}>
          <StepCard num={1} icon={<Password style={{fill:"#10314e", width: "5em", height: "4em"}} />} content="Provide voucher code and passphrase" />
        </Grid>
        <ArrowStep />
        <Grid item xs={12} sm={5} lg={2}>
          <StepCard num={2} icon={<Coins style={{fill:"rgb(197 131 31)", width: "4em", height: "4em"}} />} content="Define voucher value and a fee users pay as a liability" />
        </Grid>
        <ArrowStep />
        <Grid item xs={12} sm={5} lg={2}>
          <StepCard num={3} icon={<Secure style={{fill:"rgb(159 75 75)", width: "4em", height: "4em"}} />} content="Hash code on-chain, passphrase off-chain" />
        </Grid>
        <ArrowStep />
        <Grid item xs={12} sm={5} lg={2}>
          <StepCard num={4} icon={<GiftAndHands style={{fill:"#10314e", width: "4em", height: "4em"}} />} content="Voucher is ready to be redeemed" />
        </Grid>
      </Grid>
      <Typography variant="body" style={{fontSize: "1.1rem", marginTop: "1rem"}}>
        Creating a voucher is pretty simple and straight forward. 
        Two essential properties we require a creator to supply are a voucher code and a passphrase. 
        The voucher code can virtually be any text and it is hashed on the blockchain.
        For the passphrase, while storing it hashed on the blockchain is a good idea, 
        people that watch the transaction pool and analyze these transactions can still find the secret.
        When we do hash the passphrase on the blockchain it's one step too late as the plain passphrase is part 
        of a transaction every user has open access to.<br /><br />
        Therefore we do hash the passphrase not on the blockchain, but before sending it to the blockchain.
        Now everyone is able to read the hash of the passphrase which is uncritical and secure.
        Along to code and passphrase, the creator has to provide the voucher value and an amount of claim fee.
        The claim fee is a fee a user has to pay if they like to the redeem the voucher.
        That claim fee helps to eliminate the risk of front-running attacks and to minimize denial-of-service attacks.
      </Typography>
    </Stack>
  )
}

const Redemption = () => {
  return (
    <Stack style={{padding: "1.5rem", boxShadow: "0px 0px 10px 1px rgba(14, 69, 35, 0.65)", borderRadius: "5px", backgroundColor: "rgb(39 189 141 / 20%)"}} gap={1}>
      <Typography variant="h4" style={{marginBottom: "0.5rem"}}>Redemption</Typography>
      <Grid container gap={1} justifyContent="space-between">
        <Grid item xs={12} sm={5} lg={2}>
          <StepCard num={1} icon={<Text style={{fill:"#10314e", width: "4em", height: "4em"}} />} content="Enter code to load voucher (Phase 1)" />
        </Grid>
        <ArrowStep />
        <Grid item xs={12} sm={5} lg={2}>
          <StepCard num={2} icon={<Lock style={{fill:"#333", width: "4em", height: "4em"}} />} content="Claim to lock voucher - only your wallet can redeem it now" />
        </Grid>
        <ArrowStep />
        <Grid item xs={12} sm={5} lg={2}>
          <StepCard num={3} icon={<Password style={{fill:"#10314e", width: "4em", height: "4em"}} />} content="Provide the passphrase within ten minutes (Phase 2)" />
        </Grid>
        <ArrowStep />
        <Grid item xs={12} sm={5} lg={2}>
          <StepCard num={4} icon={<HappyFace style={{fill:"#10314e", width: "4em", height: "4em"}} />} content="Redeem the voucher and earn rewards. Fully return claim fee" />
        </Grid>
      </Grid>
      <Typography variant="body"style={{fontSize: "1.1rem", marginTop: "1rem"}}>
        To redeem a voucher, the user has to know the voucher code and the initial passphrase. 
        After providing the code they are required to <i>claim to know the secret</i>, which is <strong>Phase 1</strong>. 
        What that does is it locks the voucher to be only redeemable by the current claimer. 
        With that lock, if the current claimer wants to redeem the voucher and therefore provides the passphrase, 
        no second malicious actor can watch the transaction pool and front-run our user. The funds are save. 
        Redeeming the voucher by using the correct passphrase is <strong>Phase 2</strong>.<br /><br />
        Because any user can always claim a voucher and therefore lock a voucher without knowing the secret, we introduce a claim fee. 
        That fee is payed during claim, at <strong>Phase 1</strong>, and fully returned after successful redemption, at <strong>Phase 2</strong>.<br />
        <strong>Users are able to redeem a voucher within ten minutes after claim. </strong>
        If they fail to do so, they have to face a heavy penalty on the claim fee. 
        This discourages malicious actors from claiming vouchers they don't know the secret from.
        We punish the bad guys and guard the good guys.<br />
        That's good, isn't it?
      </Typography>
    </Stack>
  )
}

export default function SectionHowItWorks() {
  const classes = useStyles();
  
  return (
    <ContentBox id="how-it-works" className={[classes.mainContainer, "vouchers"].join(" ")}>
      <Stack rowGap={3}>
        <Typography variant="h2" style={{marginBottom: "1rem"}}>How it works</Typography>
        <Typography variant="body" style={{fontSize: "1.1rem"}}>
          To allow secure voucher creation and redemption we established a two-phase redemption protocol.
        </Typography>
        <Creation />
        <Redemption />
      </Stack>
    </ContentBox>
  );
}
