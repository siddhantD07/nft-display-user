export const setAccount = (address) => {
    return (dispatch) => {
        dispatch({
            type: "changeAccount",
            payload: address
        })
    }
}

export const setNftData = (nftData) =>{
    return (dispatch) =>{
        dispatch({
            type: "changeNftData",
            payload: nftData
        })
    }
}

export const setTime = (time) =>{
    return (dispatch) =>{
        dispatch({
            type: "changeTime",
            payload: time
        })
    }
}

export const setRent = (rent) =>{
    return (dispatch) =>{
        dispatch({
            type: "changeRent",
            payload: rent
        })
    }
}

export const setProvider = (provider) =>{
    return (dispatch) =>{
        dispatch({
            type: "changeProvider",
            payload: provider
        })
    }
}

export const setWeb3Instance = (web3Instance) =>{
    return (dispatch) =>{
        dispatch({
            type: "changeWeb3Instance",
            payload: web3Instance
        })
    }
}

export const setChainId = (chainId) =>{
    return (dispatch) =>{
        dispatch({
            type: "changeChainId",
            payload: chainId
        })
    }
}

export const setCollectionObject = (collectionObject) =>{
    return (dispatch) =>{
        dispatch({
            type: "changeCollectionObject",
            payload: collectionObject
        })
    }
}

export const setCollectionSelected = (collectionSelected) =>{
    return (dispatch) =>{
        dispatch({
            type: "changeCollectionSelected",
            payload: collectionSelected
        })
    }
}

export const setDisplayGrid = (displayGrid) =>{
    return (dispatch) =>{
        dispatch({
            type: "changeDisplayGrid",
            payload: displayGrid
        })
    }
}

export const setActiveStep = (activeStep) =>{
    return (dispatch) =>{
        dispatch({
            type: "changeActiveStep",
            payload: activeStep
        })
    }
}

export const setDisplayId = (displayId) =>{
    return (dispatch) =>{
        dispatch({
            type: "changeDisplayId",
            payload: displayId
        })
    }
}

export const setDisplayOccupied = (isOccupied) =>{
    return (dispatch) =>{
        dispatch({
            type: "changeDisplayOccupied",
            payload: isOccupied
        })
    }
}