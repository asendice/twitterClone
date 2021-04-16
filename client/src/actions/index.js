import backendApi from "../apis/backendApi";

export const addBox = (box) => {
  return {
    type: "ADD_BOX",
    payload: box,
  };
};

export const addBoxes = (boxes) => {
  return {
    type: "ADD_BOXES",
    payload: boxes,
  };
};

export const getBoxes = () => {
  return async (dispatch) => {
    await backendApi
      .get("/boxes", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response) {
          console.log(response, 'getboxes')
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      })
      .then((boxes) => dispatch(addBoxes(boxes.data.message)));
  };
};

export const postBoxes = (box) => {
  const json = JSON.stringify(box);
  console.log("json", json);
  return (dispatch) => {
    backendApi
      .post("/boxes", json, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      })
      .then((boxes) => dispatch(addBox(boxes.data.result)))
      .catch((error) => {
        console.log("postBoxes", error.message);
      });
  };
};
