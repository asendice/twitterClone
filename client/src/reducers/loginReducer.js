let user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? { loggedIn: true, result: {}, user } : {};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_RESPONSE":
      return {
        loggedIn: action.payload.status === 200 ? true : false,
        result: action.payload,
        user: action.payload.data.result,
      };
    case "LOGOUT":
      return {};
    case "UPDATE_USER":
      return { ...state, user: action.payload.data.result };
    default:
      return state;
  }
};

export default loginReducer;
