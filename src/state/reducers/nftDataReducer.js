const reducer = (state = { address:null, tokenID: null, name: null}, action) =>{
    switch (action.type) {
        case "changeNftData":
            let nftData = {
                address: action.payload.address,
                tokenID: action.payload.tokenID,
                name: action.payload.name
            }
            return nftData;
        default: 
            return state;
    }
}

export default reducer;