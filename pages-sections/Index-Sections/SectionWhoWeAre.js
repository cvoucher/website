import React from "react";
// plugin that creates slider
// @mui components
import { makeStyles } from "@mui/styles";
// @mui/icons-material
// core components

import styles from "/styles/jss/nextjs-material-kit/pages/componentsSections/whoWeAreStyle.js";
import { Grid , Stack, Typography} from "@mui/material";
import MemberCard from "../../components/Card/MemberCard";
import ContentBox from "../../components/ContentBox/ContentBox";
import { Listing, ListingItem } from "../../components/Listing/Listing";
import { Star } from "@mui/icons-material";

const useStyles = makeStyles(styles);

const BaseListItem = ({icon, title}) => {
  return <ListingItem iconStyle={{minWidth: 0, paddingRight: "8px"}} icon={icon} textStyle={{fontSize: "0.9rem"}} text={title} />
}

const MemberCapabilityListItem = ({title}) => {
  return <BaseListItem icon={<Star style={{fill: "rgb(203 137 55)", width: "16px", height: "16px"}} />} title={title} />
}

const MemberQuote = ({quote, name}) => {
  return (
    <Stack direction="row">
      <span>
        <span style={{fontStyle: "italic"}}>{quote}</span> - {name}
      </span>
    </Stack>
  )
}

export default function SectionWhoWeAre() {
  return (
    <ContentBox id="who-we-are" title="Team">
      <Grid container justifyContent="center">
        <Grid item container justifyContent="space-evenly" spacing={2}>
          <Grid item xs={12} sm={8} xl={6}>
            <div data-aos="fade-right" data-aos-duration="1000" data-aos-offset="100">
              <MemberCard image="/img/people/kojo.png" title="Kojo">
                <p>Project founder and CEO</p>
                <Listing>
                  <MemberCapabilityListItem title="12 years in blockchain" />
                  <MemberCapabilityListItem title="12+ years in enterprise database/data engineering" />
                  <MemberCapabilityListItem title="Blockchain enthusiast" />
                  <MemberCapabilityListItem title="Soccer coach" />
                  <MemberCapabilityListItem title="Husband & Father of 3 boys" />
                </Listing>
                <MemberQuote quote="Despise not small beginnings" name="Kojo" />
              </MemberCard>
            </div>
          </Grid>
          <Grid item xs={12} sm={8} xl={6}>
            <div data-aos="fade-right" data-aos-duration="1000" data-aos-offset="100">
              <MemberCard image="/img/people/trickz.png" title="Dominik">
                <p>Blockchain developer and CIO</p>
                <Listing>
                  <MemberCapabilityListItem title="+3 years experience in blockchain" />
                  <MemberCapabilityListItem title="+12 years experience in software development" />
                  <MemberCapabilityListItem title="Tech nerd" />
                  <MemberCapabilityListItem title="Website & Smart Contract developer" />
                  <MemberCapabilityListItem title="Computer Scientist" />
                </Listing>
                <MemberQuote quote="The borders you face are the borders you create. What's good about that? You can break them." name="Dominik" />
              </MemberCard>
            </div>
          </Grid>
        </Grid>
        <Grid item>
          <Typography>
            You can count on many years of experience in the blockchain field from our side which is why we thought of bringing it together within this project.
            Our combined force of deep blockchain knowledge as well as the possibility to develop everything on our own will lead us to success.
          </Typography>
        </Grid>
      </Grid>
    </ContentBox>
  );
}
