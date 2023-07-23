import { container, title, cvoucherButton } from "/styles/jss/nextjs-material-kit.js";
import customCheckboxRadioSwitch from "/styles/jss/nextjs-material-kit/customCheckboxRadioSwitch.js";

const whatWeDoStyle = {
  sections: {
    padding: "70px 0"
  },
  container,
  title: {
    paddingTop: "80px",
    minHeight: "32px",
    textDecoration: "none",
    textAlign: "center",
    fontSize: "3rem",
    scrollBehavior: "smooth"
  },
  space50: {
    height: "50px",
    display: "block"
  },
  space70: {
    height: "70px",
    display: "block"
  },
  icons: {
    width: "17px",
    height: "17px",
    color: "#FFFFFF"
  },
  cvoucherButton,
  ...customCheckboxRadioSwitch
};

export default whatWeDoStyle;
