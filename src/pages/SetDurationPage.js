import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Grid,
  Stack,
} from "@mui/material";
import { ethers } from "ethers";

import { actionCreators } from "../state/index";
import { ABI, CONTRACT_ADDRESS } from "../contract";

const SetDurationPage = () => {
  const [displayRent, setDisplayRent] = useState(-1);

  const time = useSelector((state) => state.time);

  const rent = useSelector((state) => state.rent);

  const displayId = useSelector((state) => state.displayId);

  const account = useSelector((state) => state.account);

  const provider = useSelector((state) => state.provider);

  const web3Instance = useSelector((state) => state.web3Instance);

  const chainId = useSelector((state) => state.chainId);

  const dispatch = useDispatch();

  const { setTime, setRent } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    const getRentForDisplay = async () => {
      try {
        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
        const txn = await contract.display(displayId);
        const actualRentPer10MinsWei = txn.rentPer10Mins.toString();
        const actualRentPer10MinsEth = ethers.utils.formatEther(
          actualRentPer10MinsWei
        );
        setDisplayRent(actualRentPer10MinsEth);
        if (rent === 0) setRent(actualRentPer10MinsEth);
      } catch (error) {
        console.log(error);
      }
    };
    getRentForDisplay();
  }, []);

  const incrementTime = () => {
    let newTime = time + 10;
    setTime(newTime);
    let finalRentTemp = (newTime * displayRent) / 10;
    setRent(finalRentTemp);
  };
  const decrementTime = () => {
    if (time > 10) {
      let newTime = time - 10;
      setTime(newTime);
      let finalRentTemp = (newTime * displayRent) / 10;
      setRent(finalRentTemp);
    }
  };
  if (displayRent < 0) {
    return <CircularProgress />;
  } else {
    return (
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={12} marginBottom={"20px"}>
          <Typography variant="h5" compenent="div">
            Set Duration
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" compenent="div">
            {time} Minutes
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={2} direction="row" paddingBottom={"20px"} paddingTop={"20px"}>
            <Button variant="contained" onClick={decrementTime}>
              <Typography variant="h5" compenent="div">
                -
              </Typography>
            </Button>
            <Button variant="contained" onClick={incrementTime}>
              <Typography variant="h5" compenent="div">
                +
              </Typography>
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" compenent="div">
            Rent per 10 minutes: {displayRent} ETH
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" compenent="div">
            Rent to pay: {rent.toString().slice(0,7)} ETH
          </Typography>
        </Grid>
      </Grid>
    );
  }
};

export default SetDurationPage;
