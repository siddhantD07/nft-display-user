import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { Box, TextField, MenuItem, Button, Grid, CircularProgress } from "@mui/material";

import { actionCreators } from "../state/index";

const CollectionDropdown = () => {
  const collectionSelected = useSelector((state) => state.collectionSelected);

  const displayGrid = useSelector((state) => state.displayGrid);

  const dispatch = useDispatch();

  const { setCollectionSelected, setDisplayGrid, setNftData } =
    bindActionCreators(actionCreators, dispatch);

  const collectionObject = useSelector((state) => state.collectionObject);

  const handleChange = (event) => {
    setCollectionSelected(event.target.value);
    setDisplayGrid(false);
    setNftData({ address: null, tokenID: null });
  };

  const handleDisplayGrid = () => {
    if (collectionSelected) {
      setDisplayGrid(true);
    }
  };

  const getMenuItem = (key) => {
    return (
      <MenuItem value={key} key={key}>
        {collectionObject[key].name}
      </MenuItem>
    );
  };

  if (Object.keys(collectionObject).length > 0) {
    return (
      <Grid
        alignItems="center"
        justifyContent="center"
        minWidth={"150px"}
      >
        <Grid item xs={12} paddingBottom={"10%"}>
          <TextField
            label="Select Collection"
            select
            value={collectionSelected}
            onChange={handleChange}
            fullWidth
          >
            {Object.keys(collectionObject).map((key) => getMenuItem(key))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleDisplayGrid} fullWidth>
            Display NFTs
          </Button>
        </Grid>
      </Grid>
    );
  }else if(Object.keys(collectionObject).length < 1){
    return(
      <Grid
        alignItems="center"
        justifyContent="center"
        minWidth={"150px"}
      >
      <Grid item xs={12}>
          No Collection Found
        </Grid>

      </Grid>
    )
  }
  else{
    return <CircularProgress/>;
  }
  // {
    /* return (
    <Grid
      conatiner
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      {Object.keys(collectionObject).length > 0 ? (
        <>
          <Grid item xs={12}>
            <TextField
              label="Select Collection"
              select
              value={collectionSelected}
              onChange={handleChange}
              fullWidth
            >
              {Object.keys(collectionObject).map((key) => getMenuItem(key))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleDisplayGrid}>
              Display NFTs
            </Button>
          </Grid>
        </>
      ) : (
        <></>
      )}
    </Grid>
  ); */
  // }
};

export default CollectionDropdown;
