import { combineReducers } from "redux";
import accountReducer from "./accountReducer";
import nftDataReducer from "./nftDataReducer";
import timeReducer from "./timeReducer";
import rentReducer from "./rentReducer";
import providerReducer from "./providerReducer";
import web3InstanceReducer from "./web3InstanceReducer";
import chainIdReducer from "./chainIdReducer";
import collectionObjectReducer from "./collectionObjectReducer";
import collectionSelectedReducer from "./collectionSelectedReducer";
import displayGridReducer from "./displayGridReducer"
import activeStepReducer from "./activeStepReducer"
import displayIdReducder from "./displayIdReducer"
import dsiplayOccupiedReducer from "./displayOccupiedReducer"

const reducers = combineReducers({
    account: accountReducer,
    nftData: nftDataReducer,
    time: timeReducer,
    rent: rentReducer,
    provider: providerReducer,
    web3Instance: web3InstanceReducer,
    chainId: chainIdReducer,
    collectionObject: collectionObjectReducer,
    collectionSelected: collectionSelectedReducer,
    displayGrid: displayGridReducer,
    activeStep: activeStepReducer,
    displayId: displayIdReducder,
    displayOccupied: dsiplayOccupiedReducer
});

export default reducers;