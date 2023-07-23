import { container, cvoucherButton } from "/styles/jss/nextjs-material-kit.js";

const componentsStyle = {
  container,
  brand: {
    color: "#FFFFFF",
    textAlign: "left",
    textShadow: "0px 0px 3px #0d4024",
    textAlign: "center"
  },
  title: {
    fontSize: "4rem",
    fontWeight: "600",
    display: "inline-block",
    position: "relative",
  },
  subtitle: {
    fontSize: "1.313rem",
    maxWidth: "510px",
    textShadow: "0px 0px 2px #0d4024",
  },
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3"
  },
  mainRaised: {
    margin: "-60px 0px 0px",
    borderRadius: "6px",
    color: "#fff",
    backgroundColor: "#489d78ed",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
    "@media (max-width: 830px)": {
      marginLeft: "10px",
      marginRight: "10px",
    }
  },
  link: {
    textDecoration: "none"
  },
  textCenter: {
    textAlign: "center"
  },
  mainContent: {
    background: "linear-gradient(90deg, rgba(148,187,233,0.4) 0%, rgba(238,174,202,0.3) 100%);",
    color: "#333",
    fontSize: "1.2rem"
  },
  learnMoreButton: {
    background: "linear-gradient(90deg, rgba(148,187,233,1) 0%, rgba(238,174,202,1) 100%);",
    color: "#fff"
  }
};

export default componentsStyle;
