const usersReducer = (state = { users: [], isLoading: true }, action) => {
  switch (action.type) {
    case "ADD_USERS":
      return { ...state, isLoading: false, users: action.payload };
    case "UPDATE_USERS":
      const newList = state.users.map(
        (user) => [action.payload].find((item) => item._id === user._id) || user
      );
      return { ...state, isLoading: false, users: newList };
    case "USERS_LOADING":
      return { ...state, isLoading: true, users: [] };
    default:
      return state;
  }
};

export default usersReducer;
