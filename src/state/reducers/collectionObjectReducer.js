const reducer = (state = {}, action) =>{
    switch (action.type) {
        case "changeCollectionObject":
            return action.payload;
        default: 
            return state;
    }
}

export default reducer;