const boxReducer = (state = { boxes: [] }, action) => {
  switch (action.type) {
    case "ADD_BOXES":
      return { ...state, boxes: action.payload };
    case "ADD_BOX":
      return { ...state, boxes: state.boxes.concat(action.payload) };
    default:
      return state;
  }
};

export default boxReducer;
