import React from "react";
// material-ui components
import { makeStyles } from "@mui/styles";
// core components
import Card from "/components/Card/Card.js";

import CardBody from "/components/Card/CardBody.js";
import Button from "/components/CustomButtons/Button.js";

import imagesStyles from "/styles/jss/nextjs-material-kit/imagesStyles.js";

import { cardTitle } from "/styles/jss/nextjs-material-kit.js";
import Link from "next/link";

const styles = {
  ...imagesStyles,
  cardTitle,
};

const useStyles = makeStyles(styles);

export default function SocialCard({location, children, style}) {
  const classes = useStyles();
  return (
    <Link href={location} target="_blank">
      <Card>
        <div className={classes.social} style={style}>
          {children}
        </div>
      </Card>
    </Link>
  );
}