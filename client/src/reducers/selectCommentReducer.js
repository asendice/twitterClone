const selectCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case "COMMENT_SELECT":
      return action.payload;
    default:
      return state;
  }
};

export default selectCommentReducer;
