import React from "react";
// material-ui components
import { makeStyles } from "@mui/styles";
// core components
import Card from "/components/Card/Card.js";
import CardBody from "/components/Card/CardBody.js";
import Button from "/components/CustomButtons/Button.js";

import imagesStyles from "/styles/jss/nextjs-material-kit/imagesStyles.js";

import { cardTitle, whatWeDoCardTitle } from "/styles/jss/nextjs-material-kit.js";
import Image from "next/image";

const styles = {
  ...imagesStyles,
  cardTitle,
  whatWeDoCardTitle
};

const useStyles = makeStyles(styles);

export default function WhatWeDoCard({background, icon, title, children}) {
  const classes = useStyles();
  return (
    <Card style={{margin: 0, color: "#fff", background: "transparent", overflow: "hidden"}}>
      <Image
        src={background}
        width={400}
        height={800}
        style={{position: "absolute", width: "100%", height: "100%", objectFit: "cover", opacity: "0.3"}}
        alt="what-we-do"
        />
      <CardBody style={{padding: "0.6rem 1rem 1rem 1rem", zIndex: 1}}>
        <div className={classes.whatWeDoCardTitle}>
          <h4 style={{fontWeight: "bold"}}>{title}</h4>
          {icon}
        </div>
        <hr />
        <p style={{fontSize: "15px"}}>{children}</p>
      </CardBody>
    </Card>
  );
}