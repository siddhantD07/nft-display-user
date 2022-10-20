import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";

import { actionCreators } from "../state/index";
import { CONTRACT_ADDRESS, ABI } from "../contract";
import { INFURA_ID, CHAIN_ID } from "../config";
import { Grid, Button, IconButton } from "@mui/material";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const providerOptions = {
  coinbasewallet: {
    package: CoinbaseWalletSDK,
    options: {
      appName: "Web 3 Modal Demo",
      infuraId: INFURA_ID,
    },
  },
};

const Header = () => {
  const account = useSelector((state) => state.account);

  const web3Instance = useSelector((state) => state.web3Instance);

  const dispatch = useDispatch();

  const {
    setAccount,
    setActiveStep,
    setProvider,
    setWeb3Instance,
    setChainId,
    setCollectionObject,
    setCollectionSelected,
    setDisplayGrid,
    setNftData,
    setDisplayId,
  } = bindActionCreators(actionCreators, dispatch);

  const disconnect = async () => {
    setAccount(null);
    setChainId(null);
    setWeb3Instance(null);
    console.log("Disconnect");
  };

  const connectToWallet = async () => {
    try {
      let web3Modal = new Web3Modal({
        cacheProvider: false,
        providerOptions,
      });
      const web3ModalInstance = await web3Modal.connect();
      const web3ModalProvider = new ethers.providers.Web3Provider(
        web3ModalInstance
      );

      const accounts = await web3ModalProvider.listAccounts();
      const network = await web3ModalProvider.getNetwork();

      if (network.chainId !== CHAIN_ID) alert("Incompatible Chain");

      setProvider(web3ModalProvider);
      setWeb3Instance(web3ModalInstance);

      if (accounts) {
        setAccount(accounts[0]);
        setChainId(network.chainId);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const displayId = queryParams.get("id");
    setDisplayId(displayId);

    if (web3Instance?.on) {
      const handleAccountsChanged = (accounts) => {
        setAccount(accounts[0]);
        setCollectionObject({});
        setCollectionSelected("");
        setDisplayGrid(false);
        setNftData({ address: null, tokenID: null });
        setActiveStep(0);
        console.log("Acc changed");
      };

      const handleChainChanged = (chain) => {
        const chainIdParsed = parseInt(chain, 16);
        setChainId(chainIdParsed);
        if (chainIdParsed !== CHAIN_ID) alert("Incompatible Chain");
      };

      const handleDisconnect = () => {
        setActiveStep(0);
        disconnect();
      };

      web3Instance.on("accountsChanged", handleAccountsChanged);
      web3Instance.on("chainChanged", handleChainChanged);
      web3Instance.on("disconnect", handleDisconnect);

      return () => {
        if (web3Instance.removeListener) {
          web3Instance.removeListener("accountsChanged", handleAccountsChanged);
          web3Instance.removeListener("chainChanged", handleChainChanged);
          web3Instance.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [web3Instance]);

  const getAbbrWalletAddress = (walletAddress) => {
    let abbrWalletAddress =
      " " +
      walletAddress.substring(0, 4) +
      "..." +
      walletAddress.substring(38, 42);
    return abbrWalletAddress.toUpperCase();
  };

  return (
    <Grid container paddingBottom={"40px"}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            QR-Code App
          </Typography>
          <Button
            variant="contained"
            onClick={account ? disconnect : connectToWallet}
          >
            {account ? getAbbrWalletAddress(account) : "Connect"}
          </Button>
        </Toolbar>
      </AppBar>
    </Grid>
  );
};

export default Header;
