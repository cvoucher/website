
import { makeStyles } from "@mui/styles";
import { getPriorityConnector, initializeConnector } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";
import { WalletConnect } from "@web3-react/walletconnect";
import { getWalletClient, useSigner } from "@wagmi/core";

import dynamic from 'next/dynamic'
const SwapWidget = dynamic(
  async() => {
  const res = await import('@uniswap/widgets');
  return res.SwapWidget;
  },
  {ssr: false}
  )
const JSON_RPC_URL = 'https://cloudflare-eth.com';
const metaMask = () => {
  const [connector, hooks] = initializeConnector((actions) => new MetaMask(actions, false));
  return [connector, hooks];
}
const walletConnect = () => {
  const [connector, hooks] = initializeConnector(
    (actions) =>
      new WalletConnect(
        actions,
        {
          rpc: { 1: JSON_RPC_URL },
        },
        false
      )
  );
  return [connector, hooks];
}

const connectors = [metaMask(), walletConnect()];

const activeProvider = () => {
  return getPriorityConnector(...connectors).usePriorityProvider();
}

import styles from "/styles/jss/nextjs-material-kit/pages/componentsSections/uniswapWidgetStyle.js";
import styled from "@emotion/styled";
import { createWalletClient, custom } from "viem";
import { ganache } from "../../web3/ganache-chain";
import { useWalletClient } from "wagmi";
const useStyles = makeStyles(styles);

const PresaleWidgetContainer = ({children}) => {
  return (
    <div style={{position: "relative"}}>
      <div style={{
        zIndex: 1, position: "absolute", 
        height: "100%", width: "100%", 
        background: "rgb(0 0 0 / 70%)", 
        display: "flex", justifyContent: "center", alignItems: "center"}}>
        <p style={{textAlign: "center", fontWeight: "bold", color: "#fff"}}>
          The Uniswap Widget will be available after presale ended.<br />
          For now, join our community by grabbing yourself an early bag!
        </p>
      </div>
      {children}
    </div>
  )
}

const UniswapWidget = (props) => {
  const classes = useStyles();
  //const provider = activeProvider();
  const client = getWalletClient();
  const TOKEN_LIST = 'https://gateway.ipfs.io/ipns/tokens.uniswap.org';
  const UNI = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984';
  const presaleRunning = process.env.NEXT_PUBLIC_PRESALE_ACTIVE === "true";
  const Widget = () => <SwapWidget
    jsonRpcEndpoint={JSON_RPC_URL}
    tokenList={TOKEN_LIST}
    provider={client}
    /*locale={locale}
    onConnectWallet={focusConnectors}*/
    defaultInputTokenAddress="NATIVE"
    defaultInputAmount="1"
    defaultOutputTokenAddress={UNI}
    className={classes.widget}
    defaultChainId={1337}
    {...props}
    />

  if(presaleRunning)
    return (
      <PresaleWidgetContainer>
        <Widget />
      </PresaleWidgetContainer>
    )
  else
    return <Widget />
}

export default UniswapWidget;