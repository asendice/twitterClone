const boxReducer = (state = { boxes: [], isLoading: true }, action) => {
  switch (action.type) {
    case "ADD_BOXES":
      return { ...state, isLoading: false, boxes: action.payload };
    case "ADD_BOX":
      return {
        ...state,
        isLoading: false,
        boxes: state.boxes.concat(action.payload),
      };
    case "UPDATE_BOX":
      const newList = state.boxes.map(
        (box) =>
          [action.payload.data.result].find((item) => item._id === box._id) ||
          box
      );
      return { ...state, isLoading: false, boxes: newList };
    case "BOXES_LOADING":
      return { ...state, isLoading: true, boxes: state.boxes };
    default:
      return state;
  }
};

export default boxReducer;
