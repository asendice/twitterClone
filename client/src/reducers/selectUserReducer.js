const selectUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_SELECT":
      return action.payload;
    default:
      return state;
  }
};

export default selectUserReducer;
