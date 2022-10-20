import React from 'react'
import { useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import { bindActionCreators} from "redux";
import {Card, CardActionArea, CardMedia, CardContent, Typography} from "@mui/material"

import {actionCreators} from "../state/index";


const NFTCard = ({token_id, token_address, image_url}) => {
    const nftData = useSelector((state) => state.nftData);

    const dispatch = useDispatch();

    const {setNftData} = bindActionCreators(actionCreators, dispatch)

    const cardSelected = () =>{
      let tempNftData = {
        address: token_address,
        tokenID: token_id
      }
      setNftData(tempNftData)
    }

  if(nftData.address === token_address && nftData.tokenID === token_id){
    return (
      <Card onClick={cardSelected} key={token_id} sx={{ border: '7px solid #0d7eff'}} >
          <CardActionArea>
              <CardMedia
              component="img"
              // height="140"
              image={image_url}
              alt="NFT"/>
          <CardContent>
              <Typography variant="h5" component="div">Token ID: {token_id}</Typography>              
          </CardContent>
          </CardActionArea>
      </Card>
    )
  }else{
    return (
      <Card onClick={cardSelected} key={token_id} selected={true}>
          <CardActionArea>
              <CardMedia
              component="img"
              // height="140"
              image={image_url}
              alt="NFT"/>
          <CardContent>
              <Typography variant="h5" component="div">Token ID: {token_id}</Typography>
          </CardContent>
          </CardActionArea>
      </Card>
    )
  }

}

export default NFTCard