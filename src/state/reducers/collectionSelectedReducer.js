const reducer = (state = "", action) =>{
    switch (action.type) {
        case "changeCollectionSelected":
            return action.payload;
        default: 
            return state;
    }
}

export default reducer;