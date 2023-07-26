import { useRef, useEffect, React } from "react";
// plugin that creates slider
// @mui components
import { makeStyles } from "@mui/styles";
// @mui/icons-material
// core components

import styles from "/styles/jss/nextjs-material-kit/pages/componentsSections/howToBuyStyle.js";
import { Chip, Grid, Typography } from "@mui/material";
import Button from "/components/CustomButtons/Button.js";

import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';


const allStyles = {
  uniswapBuyButton: {
    backgroundColor: "rgb(231 60 151 / 90%)",
    '&:hover, &:focus': {
      backgroundColor: 'rgb(169 45 111 / 90%)',
    }
  },
  centerSmall: {
    "@media(max-width: 900px)": {
      textAlign: "center"
    }
  },
  ...styles
}
const useStyles = makeStyles(allStyles);

// Tokenomics data
// @mui/icons-material
import UniswapWidget from "../../components/web3/UniswapWidget";
import ContentBox from "../../components/ContentBox/ContentBox";
import { Listing, ListingItem } from "../../components/Listing/Listing";
import { School , HourglassFull, MonetizationOn, Code, Face, Chat, Build, Assessment, Opacity} from "@mui/icons-material";
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import CustomTabs from '../../components/CustomTabs/CustomTabs';
import { Stack, styled } from "@mui/system";
import ContractAddressInfo from "../../components/web3/ContractAddressInfo";

const UniswapBuyButton = (props) => {
  const cvoucherTokenAddress = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";
  const uniswapSwapAddress = `https://app.uniswap.org/#/tokens/ethereum/${cvoucherTokenAddress}`;

  return (
    <Button href={uniswapSwapAddress} target="_blank" {...props}>Buy on Uniswap</Button>
  )
}

const PresaleButton = (props) => {
  const presaleAddress = "https://www.pinksale.finance/launchpad";

  return (
    <Button href={presaleAddress} target="_blank" {...props} disabled>Presale starting soon</Button>
  )
}

const TokenDistributionChart = () => {
  const canvas = useRef();
  const distribution = {
    "Decentralized Exchange": 80,
    "Staking": 20
  };

  useEffect(() => {
    const ctx = canvas.current;

    let chartStatus = Chart.getChart('myChart');
      if (chartStatus != undefined) {
        chartStatus.destroy();
    }

    const chart = new Chart(ctx, {
      plugins: [ChartDataLabels],
      type: 'pie',
      data: {
        labels: Object.keys(distribution),
        datasets: [
          {
            label: 'Percentage',
            data: Object.values(distribution),
            backgroundColor: [
              'rgba(255, 99, 132, 0.8)',
              'rgba(54, 162, 235, 0.8)',
              'rgba(255, 206, 86, 0.8)',
              'rgba(75, 192, 192, 0.8)',
              'rgba(153, 102, 255, 0.8)',
              'rgba(255, 159, 64, 0.8)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        animation: false,
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              font: {
                size: 14
              }
            }
          },
          datalabels: {
            formatter: (value, ctx) => {
                let sum = 0;
                let dataArr = ctx.chart.data.datasets[0].data;
                dataArr.map(data => {
                    sum += data;
                });
                let percentage = (value*100 / sum)+"%";
                return percentage;
            },
            color: '#fff',
         },
        },
      },
    });
  }, []);

  return (
    <div style={{display: "flex", justifyContent: "center", width: "100%", height: "50vh"}}>
      <canvas id="myChart" ref={canvas}></canvas>
    </div>
  );
}

const Tokenomics = () => {
  const LargeChip = (props) => <Chip style={{fontSize: "1em", fontWeight: 100, height: "40px"}} {...props} />
  const MediumChip = (props) => <Chip style={{fontSize: "0.8em", fontWeight: 100}} {...props} />

  return (
    <Stack rowGap={3}>
      <LargeChip variant="filled" label="10,000,000 Total Token Supply" sx={{ '& .MuiChip-label': { overflow: "visible" }}} />
      <Grid container justifyContent="space-between">
        <Grid item>
          <MediumChip variant="filled" label="5% Buy Fee" />
        </Grid>
        <Grid item>
          <MediumChip variant="filled" label="5% Sell Fee" />
        </Grid>
      </Grid>
      <TokenDistributionChart />
    </Stack>
  )
}

export default function SectionToken() {
  const classes = useStyles();
  
  return (
    <ContentBox id="token">
      <Grid container justifyContent={{xs: "center", sm:"space-between"}} gap={2}>
        <Grid item container xs={12} md={6} alignContent="flex-start">
          <Grid item xs={12}>
            <Typography variant="h2">Token</Typography>
          </Grid>
          <Grid item style={{marginTop: "1rem"}}>
            <Typography variant="body">
              The crypto voucher project is backed by our very own <strong>$CVT</strong> token. 
              Our token contributes to the fundraising of our project and ensures its growth.
              Investors are able to become a part of <strong>$CVT</strong> by grabbing themselves a bag. 
              Token fees are low and used to stabilize project health and investors shares.<br /><br />
              Since our token did not launch yet, we are running our presale on PinkSale. 
              Read through the website to get a good idea about crypto voucher and how we revolutionize decentralized crypto gifting.
              Join our socials and participate in the presale to become a member of our community.<br />
              <strong>The team does not own any tokens initially. </strong>
              When we do hold tokens, we bought them with our own private funds.
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.centerSmall} style={{marginTop: "1rem"}}>
            {
              process.env.NEXT_PUBLIC_PRESALE_ACTIVE === "true" ?
                <PresaleButton className={classes.uniswapBuyButton} /> :
                <UniswapBuyButton className={classes.uniswapBuyButton} />
            }
          </Grid>
          <Grid item xs={12} style={{marginTop: 10}}>
            <ContractAddressInfo />
          </Grid>
        </Grid>
        <Grid item>
          <Tokenomics />
        </Grid>
      </Grid>
    </ContentBox>
  );
}
