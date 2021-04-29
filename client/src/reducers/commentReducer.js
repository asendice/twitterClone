const commentReducer = (state = { comments: [] }, action) => {
  switch (action.type) {
    case "ADD_COMMENTS":
      const sortCommentsList = action.payload.sort((a, b) => {
        return Date(b.createdAt) - Date(a.createdAt);
      });
      return { ...state, comments: sortCommentsList };
    case "ADD_COMMENT":
      return { ...state, comments: state.comments.concat(action.payload) };
    default:
      return state;
  }
};

export default commentReducer;
