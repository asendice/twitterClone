const usersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case "ADD_USERS":
      return { ...state, users: action.payload };
    case "UPDATE_USERS":
      const newList = state.users.map(
        (user) => [action.payload].find((item) => item._id === user._id) || user
      );
      return { ...state, users: newList };
    default:
      return state;
  }
};

export default usersReducer;
