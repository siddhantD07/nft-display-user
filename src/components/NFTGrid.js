import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import axios from "axios";
import { Grid, CircularProgress } from "@mui/material";

import { actionCreators } from "../state/index";
import {
  OPENSEA_IMAGE_API,
  PLACEHOLDER_IMAGE_URL,
  IMAGE_API_RATE_LIMIT,
} from "../config";
import NFTCard from "./NFTCard";

const NFTGrid = () => {
  const collectionObject = useSelector((state) => state.collectionObject);

  const collectionSelected = useSelector((state) => state.collectionSelected);

  const dispatch = useDispatch();

  const { setCollectionObject } = bindActionCreators(actionCreators, dispatch);

  const [imageUrlObject, setImageUrlObject] = useState({});

  const [rerenderer, setRerenderer] = useState(false);

  useEffect(() => {
    if (Object.keys(imageUrlObject).length < 1) {
      retrieveAssetOpenseaAPI();
    }
    setRerenderer(!rerenderer);
  }, []);

  const retrieveAssetOpenseaAPI = async () => {
    try {
      if (!collectionObject[collectionSelected]) return;
      let imageUrlObjectTemp = {};
      let i = 0;
      let length = collectionObject[collectionSelected].token_list.length;
      for (const id of collectionObject[collectionSelected].token_list) {
        i++;
        const url = OPENSEA_IMAGE_API + collectionSelected + "/" + id;
        const fetchAssetData = async (i, url) => {
          const timer = setTimeout(async function () {
            let assetData = null;
            try {
              assetData = await axios.get(url);
            } catch (err) {
              imageUrlObjectTemp[id] = PLACEHOLDER_IMAGE_URL;
            }
            if(assetData){
              if (assetData.data.image_thumbnail_url === null) {
                imageUrlObjectTemp[id] = PLACEHOLDER_IMAGE_URL;
              } else {
                imageUrlObjectTemp[id] = await assetData.data
                  .image_thumbnail_url;
              }
            }
            
            if (i === length) {
              setImageUrlObject(imageUrlObjectTemp);
            }
          }, i * IMAGE_API_RATE_LIMIT);
        };
        await fetchAssetData(i, url);
      }
    } catch (error) {
    }
  };

  if (Object.keys(imageUrlObject).length > 0 && collectionSelected) {
    return (
      <Grid container spacing={3} paddingLeft={"10px"} paddingRight={"10px"}>
        {collectionObject[collectionSelected].token_list.map((id) => {
          return (
            <Grid item xs={6} md={4} lg={2} key={id}>
              <NFTCard
                token_id={id}
                token_address={collectionSelected}
                image_url={imageUrlObject[id]}
              />
            </Grid>
          );
        })}
      </Grid>
    );
  } else {
    return <CircularProgress />;
  }
};

export default NFTGrid;
