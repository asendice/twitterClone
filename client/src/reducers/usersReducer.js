const usersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case "ADD_USERS":
      return { ...state, users: action.payload };
    case "UPDATE_USERS":
      const combineArr = [...state.users, action.payload];
      const names = combineArr.map((x) => x.name);
      const updatedUsers = combineArr.filter(
        ({ name }, index) => !names.includes(name, index + 1)
      );
      console.log(updatedUsers, "updatedUsers")
      return { ...state, users: updatedUsers };
    default:
      return state;
  }
};

export default usersReducer;
