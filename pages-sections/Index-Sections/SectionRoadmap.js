import { React } from "react";
// plugin that creates slider
// @mui components
import { makeStyles } from "@mui/styles";
// @mui/icons-material
// core components

import styles from "/styles/jss/nextjs-material-kit/pages/componentsSections/howToBuyStyle.js";
import { Card, CardActionArea, CardContent, CardMedia, Divider, Grid, Typography } from "@mui/material";



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
import ContentBox from "../../components/ContentBox/ContentBox";
import { Listing, ListingItem } from "../../components/Listing/Listing";
import { Check} from "@mui/icons-material";
import HourglassBottom from "../../components/Icons/HourglassBottom";
import Circle from "../../components/Icons/Circle";

const CheckedListItem = ({title}) => {
  return <ListingItem icon={<Check style={{color: "#398756"}} />} style={{padding: 0}} text={title} />
}

const ActiveListItem = ({title}) => {
  return <ListingItem icon={<HourglassBottom style={{fill: "rgb(58 114 163 / 93%)"}} />} style={{padding: 0}} text={title} />
}

const InactiveListItem = ({title}) => {
  return <ListingItem icon={<Circle style={{fill: "rgb(110 107 100 / 60%)"}} />} style={{padding: 0}} text={title} />
}

const PhaseOne = () => {
  return (
    <Card style={{ height: "100%", maxWidth: 4000 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image="/img/sections/roadmap/phase1.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Phase 1
          </Typography>
          <Divider />
          <Listing>
            <CheckedListItem title="CVoucher release v1.0" />
            <CheckedListItem title="Website launch" />
            <ActiveListItem title="Presale" />
            <ActiveListItem title="Listing on coin sites" />
            <InactiveListItem title="CMC and CG listings" />
            <InactiveListItem title="Give-aways" />
          </Listing>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

const PhaseTwo = () => {
  return (
    <Card style={{ height: "100%", opacity: "0.4" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image="/img/sections/roadmap/phase2.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Phase 2
          </Typography>
          <Divider />
          <Listing>
            <ActiveListItem title="DApp development" />
            <InactiveListItem title="Support for ERC20 tokens" />
            <InactiveListItem title="Enhanced advertisement and promotion" />
            <InactiveListItem title="Give-aways" />
          </Listing>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

const PhaseThree = () => {
  return (
    <Card style={{ height: "100%", opacity: "0.4" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image="/img/sections/roadmap/phase3.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Phase 3
          </Typography>
          <Divider />
          <Listing>
            <InactiveListItem title="Further dApp enhancement" />
            <InactiveListItem title="Expansion to other blockchains" />
            <InactiveListItem title="Cross-blockchain vouchers" />
            <InactiveListItem title="Press-release and wide-spread adaptation" />
            <InactiveListItem title="Give-aways" />
          </Listing>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default function SectionRoadmap() {
  const classes = useStyles();
  const cvoucherTokenAddress = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";
  const uniswapSwapAddress = `https://app.uniswap.org/#/tokens/ethereum/${cvoucherTokenAddress}`;
  
  return (
    <ContentBox id="roadmap">
      <Typography variant="h2">Roadmap</Typography>
      <Grid container justifyContent="center" spacing={2} style={{marginTop: "1rem"}}>
        <Grid item xs={12} sm={8} lg={4}>
          <div data-aos="fade-up" data-aos-duration="400" data-aos-offset="200" data-aos-delay="200" style={{height: "100%"}}>
          <PhaseOne />
          </div>
        </Grid>
        <Grid item xs={12} sm={8} lg={4}>
          <div data-aos="fade-up" data-aos-duration="400" data-aos-offset="200" data-aos-delay="400" style={{height: "100%"}}>
            <PhaseTwo />
          </div>
        </Grid>
        <Grid item xs={12} sm={8} lg={4}>
          <div data-aos="fade-up" data-aos-duration="400" data-aos-offset="200" data-aos-delay="700" style={{height: "100%"}}>
            <PhaseThree />
          </div>
        </Grid>
      </Grid>
    </ContentBox>
  );
}
