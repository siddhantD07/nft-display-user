const reducer = (state = null, action) =>{
    switch (action.type) {
        case "changeDisplayId":
            return action.payload;
        default: 
            return state;
    }
}

export default reducer;