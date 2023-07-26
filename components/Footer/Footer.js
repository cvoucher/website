/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// material-ui core components
import { List, ListItem } from "@mui/material";
import { makeStyles } from "@mui/styles";

// @mui/icons-material
import Favorite from "@mui/icons-material/Favorite";

import styles from "/styles/jss/nextjs-material-kit/components/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  const { whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  return (
    <footer className={footerClasses}>
      <div>
        &copy; {1900 + new Date().getYear()} <strong>Crypto Voucher</strong> based upon the template framework of {" "}
        <a
          href="https://www.creative-tim.com?ref=njsmk-footer"
          className={aClasses}
          target="_blank"
        >
          Creative Tim
        </a>{" "}
      </div>
    </footer>
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool
};
