const boxReducer = (state = { boxes: [] }, action) => {
  switch (action.type) {
    case "ADD_BOXES":
      return { ...state, boxes: action.payload };
    case "ADD_BOX":
      return { ...state, boxes: state.boxes.concat(action.payload) };
    case "UPDATE_BOX":
      const newList = state.boxes.map(
        (box) =>
          [action.payload.data.result].find((item) => item._id === box._id) ||
          box
      );
      return { ...state, boxes: newList };
    default:
      return state;
  }
};

export default boxReducer;
