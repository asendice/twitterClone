const commentReducer = (state = { comments: [], isLoading: true }, action) => {
  switch (action.type) {
    case "ADD_COMMENTS":
      const sortCommentsList = action.payload.sort((a, b) => {
        return Date(b.createdAt) - Date(a.createdAt);
      });
      return { ...state, isLoading: false, comments: sortCommentsList };
    case "ADD_COMMENT":
      return {
        ...state,
        isLoading: false,
        comments: state.comments.concat(action.payload),
      };
    case "UPDATE_COMMENT":
      const newList = state.comments.map(
        (comment) =>
          [action.payload].find((item) => item._id === comment._id) || comment
      );
      return { ...state, isLoading: false, comments: newList };
    case "COMMENTS_LOADING":
      return { ...state, isLoading: true, comments: [] };
    default:
      return state;
  }
};

export default commentReducer;
