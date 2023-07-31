import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @mui components
import { makeStyles } from "@mui/styles";
// @mui/icons-material
// core components
import Header from "/components/Header/Header.js";
import HeaderLinks from "/components/Header/HeaderLinks.js";
import Footer from "/components/Footer/Footer.js";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Button from "/components/CustomButtons/Button.js";
import Parallax from "/components/Parallax/Parallax.js";
// sections for this page

import styles from "/styles/jss/nextjs-material-kit/pages/index.js";

// Custom font
import { Nunito } from "next/font/google";
import { Grid, ThemeProvider, createTheme } from "@mui/material";
import SectionCreateVouchers from "../pages-sections/Index-Sections/SectionCreateVouchers";
import SectionRedeemVouchers from "../pages-sections/Index-Sections/SectionRedeemVouchers";
import SectionHowItWorks from "../pages-sections/Index-Sections/SectionHowItWorks";
import SectionToken from "../pages-sections/Index-Sections/SectionToken";
import SectionRoadmap from "../pages-sections/Index-Sections/SectionRoadmap";
import SectionSocials from "../pages-sections/Index-Sections/SectionSocials";
import SectionWhoWeAre from "../pages-sections/Index-Sections/SectionWhoWeAre";
const nunito = Nunito({ subsets: ['latin'], fallback: ['"Roboto", "Helvetica", "Arial", sans-serif']})

const useStyles = makeStyles(() => ({
  mainScreenBuyButton: {
    marginTop: "5vh"
  },
  ...styles
}));

const theme = createTheme({
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          fontFamily: nunito.style.fontFamily
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: nunito.style.fontFamily
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: nunito.style.fontFamily
        }
      }
    }
  }
});

const MainApp = ({props}) => {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
        <style jsx global>{`
          html body * {
            font-family: ${nunito.style.fontFamily};
          };

        `}</style>
        <Header
          brand="Crypto Vouchers"
          rightLinks={<HeaderLinks />}
          fixed
          color="transparent"
          changeColorOnScroll={{
            height: 400,
            color: "cvoucher"
          }}
          {...rest}
        />
        <Parallax image="/img/bg/1.jpg" style={{backgroundPositionY: "45%"}}>
          <Grid container direction="column" justifyContent="center" style={{height: "100%"}}>
            <Grid item xs={12} sm={6} container justifyContent="center" alignContent="center">
              <Grid item>
                <div className={classes.brand}>
                  <h1 className={classes.title}>Crypto Vouchers</h1>
                  <h3 className={classes.subtitle} style={{marginTop: "6vh"}}>
                    Generating and redeeming decentralized crypto vouchers has never been more easy and secure.
                  </h3>
                  <h3 className={classes.subtitle} style={{marginTop: "3vh"}}>
                    <strong>Welcome to gifting on the blockchain.</strong>
                  </h3>
                  <Button href="https://www.pinksale.finance/launchpad/0x96a9c5cd3a74f134617dEbe0D1D7cff9A129c07f?chain=ETH" target="_blank" className={classes.learnMoreButton}>Our presale has started!</Button>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Parallax>

        <Grid container justifyContent="center" className={classes.mainContent}>
          <Grid item container justifyContent="center" xs={12}>
            <Grid item lg={8} xs={12}>
              <SectionCreateVouchers />
              <SectionRedeemVouchers />
              <SectionHowItWorks />
              <SectionToken />
              <SectionRoadmap />
              <SectionSocials />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Footer />
          </Grid>
        </Grid>
      </div>
  )
}

export default function Index(props) {
  return (
    <ThemeProvider theme={theme}>
      <MainApp props={props} />
    </ThemeProvider>
  );
}
