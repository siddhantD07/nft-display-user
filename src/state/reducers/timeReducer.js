const reducer = (state = 10, action) =>{
    switch (action.type) {
        case "changeTime":
            return action.payload;
        default: 
            return state;
    }
}

export default reducer;