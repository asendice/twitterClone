import backendApi from "../apis/backendApi";

// selected comment and selected profile
// collects the box  or profile and their id's for the GET req
export const selectBox = (box) => {
  return {
    type: "BOX_SELECT",
    payload: box,
  };
};

export const profileSelect = (prof) => {
  return {
    type: "PROFILE_SELECT",
    payload: prof,
  };
};

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
          console.log(response, "getboxes");
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

export const postComment = (comment) => {
  const json = JSON.stringify(comment);
  return (dispatch) => {
    backendApi
      .post("/comments", json, {
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
      .then((comments) => dispatch(addComment(comments.data.result)))
      .catch((error) => {
        console.log("postComments", error.message);
      });
  };
};

export const getComments = (boxId) => {
  return async (dispatch) => {
    await backendApi
      .get("/comments", {
        params: {
          boxId: boxId,
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response) {
          console.log(response, "getComments");
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      })
      .then((comments) => dispatch(addComments(comments.data.message)));
  };
};

export const addComment = (comment) => {
  return {
    type: "ADD_COMMENT",
    payload: comment,
  };
};

export const addComments = (comments) => {
  return {
    type: "ADD_COMMENTS",
    payload: comments,
  };
};
