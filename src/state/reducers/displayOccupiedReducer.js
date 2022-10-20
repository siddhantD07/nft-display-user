const reducer = (state = false, action) =>{
    switch (action.type) {
        case "changeDisplayOccupied":
            return action.payload;
        default: 
            return state;
    }
}

export default reducer;