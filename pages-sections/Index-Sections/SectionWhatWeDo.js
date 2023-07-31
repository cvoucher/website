import React from "react";
// plugin that creates slider
// @mui components
import { makeStyles } from "@mui/styles";
// @mui/icons-material
// core components
import Button from "/components/CustomButtons/Button.js";

import styles from "/styles/jss/nextjs-material-kit/pages/componentsSections/whatWeDoStyle.js";
import { Grid } from "@mui/material";

import ContentBox from "../../components/ContentBox/ContentBox";
import { Landscape, Memory } from "@mui/icons-material";

import Ethereum from "../../components/Icons/Ethereum";
import Monitoring from "../../components/Icons/Monitoring";
import WhatWeDoCard from "../../components/Card/WhatWeDoCard";

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

export default function SectionWhatWeDo() {
  const classes = useStyles();
  
  return (
    <ContentBox id="what-we-do" title="Farming meets AI" className={[classes.mainContainer, "what-we-do"].join(" ")}>
      <Grid container spacing={2} className={classes.container}>
        <Grid item xs={12} sm={12} md={6} xl={3}>
          <WhatWeDoCard background="/img/sections/what-we-do/autonomous-agriculture.jpg" icon={<Landscape style={{color: "#28946e"}} />} title="Autonomous agriculture">
            Farm AI is an AI-focused technology company that is committed to revolutionizing agriculture through the use of data-driven insights powered by autonomous, artificial intelligence solutions.
            Our goal is to help farmers make smarter decisions that lead to higher yields, reduced costs, and increased sustainability.
            With the global population on the rise, it has become more important than ever to find innovative solutions that can feed our growing world while protecting our planet.
          </WhatWeDoCard>
        </Grid>
        <Grid item xs={12} sm={12} md={6} xl={3}>
          <WhatWeDoCard background="/img/sections/what-we-do/next-gen-technology.jpg" icon={<Memory style={{color: "#28946e"}} />} title="Next-gen technology">
          Our team of experts have a deep understanding of the challenges facing modern agriculture.
          Through AI-powered tools, Farm AI Solutions will empower farmers to monitor their crop health, predict growth accuracy, diagnose diseases, promote efficient water usage, and optimize farming schedules according to weather data.
          By providing farmers with access to these insights, we help them to make more informed decisions that drive down costs and maximize yields.
          </WhatWeDoCard>
        </Grid>
        <Grid item xs={12} sm={12} md={6} xl={3}>
          <WhatWeDoCard background="/img/sections/what-we-do/blockchain-based-data.jpg" icon={<Monitoring style={{color: "#28946e", fill: "currentColor"}} />} title="Blockchain-based data">
          To further enhance the value of our ecosystem, we will integrate blockchain technology to provide a secure and transparent way to store and share data.
          Our focus on data management, traceability, automated contract signing and supply chain management leverage the decentralized storage of blockchains.
          Together with our native cryptocurrency token, <strong>$FAI</strong>, we are able to create a trustworthy and efficient ecosystem for all participants that is accessible at any point in time.
          </WhatWeDoCard>
        </Grid>
        <Grid item xs={12} sm={12} md={6} xl={3}>
          <WhatWeDoCard background="/img/sections/what-we-do/blockchain-based-payment.jpg" icon={<Ethereum style={{color: "#28946e", fill: "currentColor"}} />} title="Blockchain-based payment">
          With <strong>$FAI</strong>, we are creating a new paradigm in agriculture, incentivizing contributors through a governance model that rewards long-term participation and contributes to the growth and sustainability of the ecosystem.
          As a first-class payment solution for our services, <strong>$FAI</strong> puts power and responsibility into our community to drive the future of Crypto Voucher Solutions.
          Our ecosystem is built on trust, transparency, and collaboration, and we are excited to be at the forefront of this revolutionary change.
          </WhatWeDoCard>
        </Grid>
        <Grid container item sm={7} lg={8} xs={12}>
          <Grid item className={classes.centerSmall}>
            <div data-aos="fade-right" data-aos-duration="500">
              <Button className={classes.cvoucherButton} href="/files/whitepaper.pdf" target="_blank">Read the whitepaper</Button>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </ContentBox>
  );
}
