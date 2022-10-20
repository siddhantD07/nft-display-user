const reducer = (state = false, action) =>{
    switch (action.type) {
        case "changeDisplayGrid":
            return action.payload;
        default: 
            return state;
    }
}

export default reducer;