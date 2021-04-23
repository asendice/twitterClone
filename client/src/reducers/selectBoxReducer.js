const selectBoxReducer = (state = {}, action) => {
  switch (action.type) {
    case "BOX_SELECT":
      return action.payload;
    default:
      return state;
  }
};

export default selectBoxReducer;
