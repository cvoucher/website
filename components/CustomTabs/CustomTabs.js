import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";

// material-ui components
import { MuiThemeProvider, makeStyles, styled } from "@mui/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Icon from "@mui/material/Icon";
// core components
import Card from "/components/Card/Card.js";
import CardBody from "/components/Card/CardBody.js";
import CardHeader from "/components/Card/CardHeader.js";

import styles from "/styles/jss/nextjs-material-kit/components/customTabsStyle.js";
import createBreakpoints from "@mui/system/createTheme/createBreakpoints";
import { ThemeProvider, createTheme, useMediaQuery } from "@mui/material";

const useStyles = makeStyles(() => styles);
const breakpoints = createBreakpoints({});

const theme = createTheme({
  overrides: {
    // Name of the component
    MuiTabs: {
      // Name of the slot
      flexContainer: {
        display: "flexx",
        justifyContent: "flex-end",
        [breakpoints.down(600)]: {
          display: "none"
        },
      },
    },
  },
});

const StyledTabs = styled(Tabs)(() => ({
  '& .MuiTabs-flexContainer': {
    justifyContent: "flex-end"
  },
  '& .MuiTab-iconWrapper': {
    marginBottom: 0,
    marginRight: "6px"
  }
}));


export default function CustomTabs(props) {
  const [value, setValue] = React.useState(0);
  const showSummary = useMediaQuery(breakpoints.down(600));

  const handleChange = (event, value) => {
    setValue(value);
  };
  const classes = useStyles();
  const { headerColor, plainTabs, tabs, title, rtlActive, summary } = props;
  const cardTitle = classNames({
    [classes.cardTitle]: true,
    [classes.cardTitleRTL]: rtlActive
  });
  return (
    <Card plain={plainTabs}>
      <CardHeader color={headerColor} plain={plainTabs}>
        {title !== undefined ? <div className={cardTitle}>{title}</div> : null}
        <ThemeProvider theme={theme}>
          <Tabs
            value={value}
            onChange={handleChange}
            classes={{
              root: classes.tabsRoot,
              indicator: classes.displayNone
            }}
          >
            {tabs.map((prop, key) => {
              var icon = {};
              if (prop.tabIcon) {
                icon = {
                  icon:
                    typeof prop.tabIcon === "string" ? (
                      <Icon>{prop.tabIcon}</Icon>
                    ) : (
                      <prop.tabIcon />
                    )
                };
              }
              return (
                <Tab
                  classes={{
                    root: classes.tabRootButton,
                    label: classes.tabLabel,
                    selected: classes.tabSelected,
                    wrapper: classes.tabWrapper
                  }}
                  key={key}
                  label={prop.tabName}
                  {...icon}
                />
              );
            })}
          </Tabs>
        </ThemeProvider>
      </CardHeader>
      <CardBody>
        {
          showSummary ? 
          <div>{summary}</div> :
          tabs.map((prop, key) => {
            if (key === value) {
              return <div key={key}>{prop.tabContent}</div>;
            }
            return null;
          })
        }
      </CardBody>
    </Card>
  );
}

CustomTabs.propTypes = {
  headerColor: PropTypes.oneOf([
    "warning",
    "success",
    "danger",
    "info",
    "primary",
    "rose",
    "cvoucherSecondary",
    "cvoucherTertiary"
  ]),
  title: PropTypes.string,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      tabName: PropTypes.string.isRequired,
      tabIcon: PropTypes.object,
      tabContent: PropTypes.node.isRequired
    })
  ),
  rtlActive: PropTypes.bool,
  plainTabs: PropTypes.bool
};
