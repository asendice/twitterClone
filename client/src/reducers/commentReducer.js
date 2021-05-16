const commentReducer = (state = { comments: [] }, action) => {
  switch (action.type) {
    case "ADD_COMMENTS":
      const sortCommentsList = action.payload.sort((a, b) => {
        return Date(b.createdAt) - Date(a.createdAt);
      });
      return { ...state, comments: sortCommentsList };
    case "ADD_COMMENT":
      return { ...state, comments: state.comments.concat(action.payload) };
    case "UPDATE_COMMENT":
      const newList = state.comments.map(
        (comment) =>
          [action.payload].find((item) => item._id === comment._id) || comment
      );
      return { ...state, comments: newList };
    default:
      return state;
  }
};

export default commentReducer;
