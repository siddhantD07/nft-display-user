import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state/index";

import { Grid, Typography } from "@mui/material";

const VerifyPage = () => {
  const collectionObject = useSelector((state) => state.collectionObject);
  const nftData = useSelector((state) => state.nftData);
  const time = useSelector((state) => state.time);

  const displayId = useSelector((state) => state.displayId);

  const rent = useSelector((state) => state.rent);

  const getCollectionName = () => {
    try {
      return collectionObject[nftData.address].name;
    } catch {
      return null;
    }
  };
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={12} paddingBottom={"10px"}>
        <Typography variant="h5" component="div">
          Display Id: {displayId}
        </Typography>
      </Grid>
      <Grid item xs={12} paddingBottom={"10px"} textAlign={"center"}>
        <Typography
          variant="h5"
          component="div"
          style={{ wordWrap: "break-word" }}
        >
          Collection Name: {getCollectionName()}
        </Typography>
      </Grid>
      <Grid item xs={12} paddingBottom={"10px"}>
        <Typography variant="h5" component="div">
          Token ID: {nftData.tokenID}
        </Typography>
      </Grid>
      <Grid item xs={12} paddingBottom={"10px"}>
        <Typography variant="h5" component="div">
          Total Time: {time} Minutes
        </Typography>
      </Grid>
      <Grid item xs={12} paddingBottom={"10px"}>
        <Typography
          variant="h5"
          component="div"
          style={{ wordWrap: "break-word" }}
        >
          Total Rent: {rent.toString().slice(0, 7)} ETH
        </Typography>
        <br />
      </Grid>
    </Grid>
  );
};

export default VerifyPage;
