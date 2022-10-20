import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import axios from "axios";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";

import { MORALIS_API_URL, NETWORK_NAME } from "../config";
import { actionCreators } from "../state/index";
import CollectionDropdown from "../components/CollectionDropdown";
import NFTGrid from "../components/NFTGrid";

const SelectNFTPage = () => {
  const [loading, setLoading] = useState(false);

  const account = useSelector((state) => state.account);

  const collectionObject = useSelector((state) => state.collectionObject);

  const nftData = useSelector((state) => state.nftData);

  const displayGrid = useSelector((state) => state.displayGrid);

  const dispatch = useDispatch();

  const { setCollectionObject, setDisplayGrid } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const getNFTDetails = async () => {
    setLoading(true);
    let uniqueCollectionsObject = {};

    const response = await axios.get(
      MORALIS_API_URL +
        account +
        "/nft?chain=" +
        NETWORK_NAME +
        "&format=decimal",
      {
        headers: {
          accept: "application/json",
          "X-API-Key": process.env.REACT_APP_MORALIS_API_KEY,
        },
      }
    );

    response.data.result.map((res) => {
      let tokenAddress = res.token_address;
      let token_list = [];

      if (uniqueCollectionsObject[tokenAddress]) {
        token_list = uniqueCollectionsObject[tokenAddress].token_list;
      }

      if (res.contract_type === "ERC721") {
        try {
          token_list.push(res.token_id);
          let collectionDetail = {
            name: res.name,
            type: res.contract_type,
            token_list: token_list,
          };
          uniqueCollectionsObject[tokenAddress] = collectionDetail;
        } catch (error) {
          console.log(error);
        }
      }
      return null;
    });
    setCollectionObject(uniqueCollectionsObject);
    setLoading(false);
  };

  useEffect(() => {
    if (account && !Object.keys(collectionObject).length > 0) {
      getNFTDetails();
    }
  }, [account]);

  useEffect(() => {
    setDisplayGrid(false);
  }, []);

  if (account) {
    if (loading) {
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
            <Typography>
              Select your NFT collection from the dropdown.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <CollectionDropdown />
            <br />
          </Grid>
          <Grid item xs={12}>
            <div>Selected Token ID: {nftData.tokenID} </div>
            <br />
          </Grid>
          <Grid item xs={12}>
            {displayGrid ? <NFTGrid /> : null}
            <br />
          </Grid>
        </Grid>
      );
    }
  } else {
    return null;
  }
};

export default SelectNFTPage;
