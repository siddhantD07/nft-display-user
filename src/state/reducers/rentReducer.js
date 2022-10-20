const reducer = (state = 0, action) =>{
    switch (action.type) {
        case "changeRent":
            return action.payload;
        default: 
            return state;
    }
}

export default reducer;