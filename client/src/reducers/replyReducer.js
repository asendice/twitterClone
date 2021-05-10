const replyReducer = (state = { replies: [] }, action) => {
  switch (action.type) {
    case "ADD_REPLIES":
      const sortReplies = action.payload.sort((a, b) => {
        return Date(b.createdAt) - Date(a.createdAt);
      });
      return { ...state, replies: sortReplies };
    case "ADD_REPLY":
      return { ...state, replies: state.replies.concat(action.payload) };
    default:
      return state;
  }
};

export default replyReducer;
