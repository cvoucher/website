import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @mui components
import { makeStyles } from "@mui/styles";

// core components
import styles from "/styles/jss/nextjs-material-kit/components/parallaxStyle.js";
import { Grid } from "@mui/material";

const useStyles = makeStyles(styles);

export default function Parallax(props) {
  const { filter, className, children, style, image, small, responsive } =
    props;
  const classes = useStyles();
  const parallaxClasses = classNames({
    [classes.parallax]: true,
    [classes.filter]: filter,
    [classes.small]: small,
    [classes.parallaxResponsive]: responsive,
    [className]: className !== undefined
  });
  return (
    <Grid container
      direction="row"
      className={parallaxClasses}
      justifyContent="center"
      style={{
        ...style,
        backgroundImage: "url(" + image + ")",
        // transform: transform
      }}
    >
      <Grid item xs={9} justifyContent="center">
        {children}
      </Grid>
    </Grid>
  );
}

Parallax.propTypes = {
  className: PropTypes.string,
  filter: PropTypes.bool,
  children: PropTypes.node,
  style: PropTypes.string,
  image: PropTypes.string,
  small: PropTypes.bool,
  // this will add a min-height of 660px on small screens
  responsive: PropTypes.bool
};
