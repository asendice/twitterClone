const commentReducer = (state = { comments: [] }, action) => {
  switch (action.type) {
    case "ADD_COMMENTS":
      console.log(action.payload, "action.payload");
      const sortCommentsList = action.payload.sort((a, b) => {
        return a - b;
      });
      return { ...state, comments: sortCommentsList };
    case "ADD_COMMENT":
      return { ...state, comments: state.comments.concat(action.payload) };
    default:
      return state;
  }
};

export default commentReducer;
