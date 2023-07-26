/*eslint-disable*/
import React from "react";
import Link from "next/link";

// @mui components
import { makeStyles } from "@mui/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

// @mui/icons-material
import { Apps, CloudDownload } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

// core components
import Button from "/components/CustomButtons/Button.js";

import styles from "/styles/jss/nextjs-material-kit/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button
          href="/#create-voucher"
          color="transparent"
          className={classes.navLink}
        >
          Create Voucher
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="/#redeem-voucher"
          color="transparent"
          className={classes.navLink}
        >
          Redeem Voucher
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="/#how-it-works"
          color="transparent"
          className={classes.navLink}
        >
          How it works
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="/#token"
          color="transparent"
          className={classes.navLink}
        >
          Token
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="/#roadmap"
          color="transparent"
          className={classes.navLink}
        >
          Roadmap
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="/#socials"
          color="transparent"
          className={classes.navLink}
        >
          Socials
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="https://docs.cryptovoucher.tech/crypto-vouchers/"
          target="_blank"
          color="transparent"
          className={classes.navLink}
        >
          Docs
        </Button>
      </ListItem>
    </List>
  );
}
