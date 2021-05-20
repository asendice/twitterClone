const indexReducer = (
  state = {
    firstIndex: 0,
    secondIndex: 25,
  },
  action
) => {
  switch (action.type) {
    case "UPDATE_INDEX":
      return action.payload;
    default:
      return state;
  }
};

export default indexReducer;
