import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { ethers } from "ethers";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Grid,
  Stack,
} from "@mui/material";

import { CHAIN_ID, SECONDS_IN_A_MINUTE } from "../config";
import { actionCreators } from "../state/index";
import { ABI, CONTRACT_ADDRESS } from "../contract";
import SelectNFTPage from "../pages/SelectNFTPage";
import SetDurationPage from "../pages/SetDurationPage";
import VerifyPage from "../pages/VerifyPage";

const steps = ["Select NFT", "Set Duration", "Verify and Submit"];

const getStepContent = (step) => {
  switch (step) {
    case 0:
      return <SelectNFTPage />;
    case 1:
      return <SetDurationPage />;
    case 2:
      return <VerifyPage />;
    default:
      return null;
  }
};

const Steps = () => {
  const [rerender, setRerender] = useState(false);

  const nftData = useSelector((state) => state.nftData);

  const account = useSelector((state) => state.account);

  const activeStep = useSelector((state) => state.activeStep);

  const provider = useSelector((state) => state.provider);

  const chainId = useSelector((state) => state.chainId);

  const collectionSelected = useSelector((state) => state.collectionSelected);

  const displayId = useSelector((state) => state.displayId);

  const rent = useSelector((state) => state.rent);

  const displayOccupied = useSelector((state) => state.displayOccupied);

  const time = useSelector((state) => state.time);

  const dispatch = useDispatch();

  const {
    setNftData,
    setCollectionSelected,
    setActiveStep,
    setDisplayOccupied,
  } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    const checkDisplayOccupied = async () => {
      try {
        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
        const txn = await contract.isOccupied(displayId);
        setDisplayOccupied(txn);
      } catch (error) {
        console.log(error);
      }
    };

    if (provider && account) {
      if (chainId === CHAIN_ID && displayId) checkDisplayOccupied();
    }
  }, [provider]);

  useEffect(() => {
    return;
  }, [displayOccupied]);

  useEffect(() => {
    setRerender(!rerender);
  }, [account, chainId]);

  const handleNext = () => {
    let currentStep = activeStep;
    if (currentStep < 2) {
      if (currentStep === 0) {
        if (nftData.tokenID != null) {
          setActiveStep(currentStep + 1);
        } else {
          alert("Select an NFT before proceeding!");
        }
      } else {
        setActiveStep(currentStep + 1);
      }
    }
  };

  const handleSubmit = async () => {
    let currentStep = activeStep;
    if (currentStep === 2) {
      try {
        const currentBlock = await provider.getBlockNumber();
        const timeNow = await provider.getBlock(currentBlock);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
        const txn = await contract.isOccupied(displayId);
        if(txn){
            alert("The display is currently occupied, please try after some time.");
            return;
        }
        const timeInSeconds = time * SECONDS_IN_A_MINUTE; //can change this to 1 sec during testing
        const formattedRent = rent.toString();
        const options = { value: ethers.utils.parseEther(formattedRent) };
        const receipt = await contract.setImage(
          nftData.address,
          nftData.tokenID,
          displayId,
          timeInSeconds,
          options
        );
        window.alert("Submitted");
      } catch (error) {
        if(error.code === 4001)
            alert("User denied the transaction request.")
      }
    }
  };
  const handleBack = () => {
    let currentStep = activeStep;
    if (currentStep > 0) {
      if (currentStep === 1) {
        setNftData({ address: null, tokenID: null });
        setCollectionSelected("");
        setActiveStep(currentStep - 1);
      } else {
        setActiveStep(currentStep - 1);
      }
    }
  };

  if (!displayId) {
    return (
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={12}>
          No display ID selected
        </Grid>
      </Grid>
    );
  } else if (displayOccupied === true) {
    return (
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={12}>
          Display already occupied, please try later.
        </Grid>
      </Grid>
    );
  } else if (chainId == null) {
    return null;
  } else if (chainId !== CHAIN_ID) {
    return (
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={12}>
          Wrong Chain Selected
        </Grid>
      </Grid>
    );
  } else {
    return (
      <>
        <Stepper activeStep={activeStep}>
          {steps.map((step, index) => {
            return (
              <Step key={index}>
                <StepLabel>{step}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <br />
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          {account ? (
            <>
              <Stack spacing={2} direction="row" paddingBottom={"20px"}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleBack}
                  disabled={activeStep < 1}
                >
                  Back
                </Button>
                {activeStep === 2 ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    disabled={activeStep === 2}
                  >
                    Next
                  </Button>
                )}
              </Stack>
            </>
          ) : null}

          {getStepContent(activeStep)}
        </Grid>
      </>
    );
  }
};

export default Steps;
