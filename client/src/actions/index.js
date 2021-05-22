import backendApi from "../apis/backendApi";

export const selectBox = (box) => {
  return {
    type: "BOX_SELECT",
    payload: box,
  };
};
export const selectComment = (comment) => {
  return {
    type: "COMMENT_SELECT",
    payload: comment,
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

export const boxesLoading = () => {
  return {
    type: "BOXES_LOADING",
  };
};

export const getBoxes = (index) => {
  return async (dispatch) => {
    dispatch(boxesLoading());
    await backendApi
      .get(
        "/boxes",
        {
          params: {
            firstIndex: index.firstIndex,
            secondIndex: index.secondIndex,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
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
      .then((boxes) => {
        setTimeout(() => {
          dispatch(addBoxes(boxes.data.result));
        }, 500);
      });
  };
};

export const postBoxes = (box) => {
  const json = JSON.stringify(box);
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
        console.log("postBoxes", error.result);
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
        console.log("postComments", error.result);
      });
  };
};

export const putComment = (comment) => {
  const json = JSON.stringify(comment);
  return async (dispatch) => {
    await backendApi
      .put(`/comments/${comment.boxId}`, json, {
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
      .then((response) => dispatch(updateBox(response)));
  };
};

export const getComments = (boxId) => {
  return async (dispatch) => {
    dispatch(commentsLoading());
    await backendApi
      .get(`/comments/${boxId}`, {
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
      .then((comments) => dispatch(addComments(comments.data.result)));
  };
};

export const commentsLoading = () => {
  return {
    type: "COMMENTS_LOADING",
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

export const register = (formValues) => {
  const json = JSON.stringify({
    email: formValues.email,
    name: formValues.name,
    password: formValues.password,
    password_confirmation: formValues.confirmPassword,
  });
  return (dispatch) => {
    backendApi
      .post("/register", json, {
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
          console.log(error, "error");
          error.response = JSON.stringify(response);
        }
      })
      .then((response) => dispatch(registered(response)))
      .catch((error) => {
        dispatch(registered(error.response));
      });
  };
};

export const registered = (res) => {
  return {
    type: "REG_RESPONSE",
    payload: res,
  };
};

export const login = (formValues) => {
  const json = JSON.stringify({
    name: formValues.name,
    password: formValues.password,
  });
  return (dispatch) => {
    backendApi
      .post("/login", json, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response) {
          localStorage.setItem("user", JSON.stringify(response.data.result));
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          console.log(error, "error");
          error.response = JSON.stringify(response);
        }
      })
      .then((response) => dispatch(loggedin(response)))
      .catch((error) => {
        dispatch(loggedin(error.response));
      });
  };
};

export const loggedin = (res) => {
  return {
    type: "LOG_RESPONSE",
    payload: res,
  };
};
export const updateIndex = (res) => {
  return {
    type: "UPDATE_INDEX",
    payload: res,
  };
};
export const updateUser = (res) => {
  return {
    type: "UPDATE_USER",
    payload: res,
  };
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("user");
  dispatch({
    type: "LOGOUT",
  });
};

export const getUsers = () => {
  return async (dispatch) => {
    await backendApi
      .get(`/users`, {
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
      .then((users) => dispatch(addUsers(users.data.result)));
  };
};
export const getUser = (name) => {
  return async (dispatch) => {
    await backendApi
      .get(`/profile/${name}`, {
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
      .then((users) => dispatch(selectUser(users.data.result)));
  };
};
export const getBox = (id) => {
  return async (dispatch) => {
    await backendApi
      .get(`/boxes/${id}`, {
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
      .then((box) => dispatch(selectBox(box.data.result)));
  };
};

export const usersLoading = () => {
  return {
    type: "USERS_LOADING",
  };
};

export const updateUsers = (users) => {
  return {
    type: "UPDATE_USERS",
    payload: users,
  };
};

export const addUsers = (users) => {
  return {
    type: "ADD_USERS",
    payload: users,
  };
};
export const selectUser = (user) => {
  return {
    type: "USER_SELECT",
    payload: user,
  };
};

export const addLikeUser = (ids) => {
  const json = JSON.stringify(ids);
  return async (dispatch) => {
    await backendApi
      .put(`/users/add/${ids.userId}`, json, {
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
      .then((response) => dispatch(updateUser(response)));
  };
};

export const addLikeBox = (ids) => {
  const json = JSON.stringify(ids);
  return async (dispatch) => {
    await backendApi
      .put(`/boxes/${ids.boxId}`, json, {
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
      .then((response) => {
        dispatch(updateBox(response));
        dispatch(selectBox(response.data.result));
      });
  };
};
export const delLikeUser = (ids) => {
  const json = JSON.stringify(ids);
  return async (dispatch) => {
    await backendApi
      .put(`/users/del/${ids.userId}`, json, {
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
      .then((response) => {
        dispatch(updateUser(response));
      });
  };
};

export const delLikeBox = (ids) => {
  const json = JSON.stringify(ids);
  return async (dispatch) => {
    await backendApi
      .put(`/boxes/del/${ids.boxId}`, json, {
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
      .then((response) => {
        dispatch(updateBox(response));
        dispatch(selectBox(response.data.result));
      });
  };
};

export const updateBox = (box) => {
  return {
    type: "UPDATE_BOX",
    payload: box,
  };
};

export const editProfilePic = (item) => {
  let formData = new FormData();
  formData.append("image", item.profilePic[0]);
  return async (dispatch) => {
    await backendApi
      .put(`/users/pic/${item.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
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
      .then((response) => {
        dispatch(loggedin(response));
        dispatch(selectUser(response.data.result));
      });
  };
};

export const editBackground = (item) => {
  let formData = new FormData();
  formData.append("image", item.background[0]);
  return async (dispatch) => {
    await backendApi
      .put(`/users/bkg/${item.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
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
      .then((response) => {
        dispatch(loggedin(response));
        dispatch(selectUser(response.data.result));
      });
  };
};

export const editBio = (items) => {
  const json = JSON.stringify(items);
  return async (dispatch) => {
    await backendApi
      .put(`/users/bio/${items.id}`, json, {
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
      .then((response) => {
        dispatch(loggedin(response));
        dispatch(selectUser(response.data.result));
      });
  };
};

export const postReply = (reply) => {
  const json = JSON.stringify(reply);
  return (dispatch) => {
    backendApi
      .post("/replies", json, {
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
      .then((replies) => dispatch(addReply(replies.data.result)))
      .catch((error) => {
        console.log("postReply", error.result);
      });
  };
};

export const addReplyToComment = (item) => {
  const json = JSON.stringify(item);
  return async (dispatch) => {
    await backendApi
      .put(`/comments/replies/${item.commentId}`, json, {
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
      .then((response) => dispatch(updateComment(response.data.result)));
  };
};

export const updateComment = (comment) => {
  return {
    type: "UPDATE_COMMENT",
    payload: comment,
  };
};

export const getReplies = (boxId) => {
  return async (dispatch) => {
    await backendApi
      .get(`/replies/${boxId}`, {
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
      .then((replies) => dispatch(addReplies(replies.data.result)));
  };
};

export const addReply = (reply) => {
  return {
    type: "ADD_REPLY",
    payload: reply,
  };
};

export const addReplies = (replies) => {
  return {
    type: "ADD_REPLIES",
    payload: replies,
  };
};

export const addFollower = (item) => {
  const json = JSON.stringify(item);
  return async (dispatch) => {
    await backendApi
      .put(`/users/followers/add/${item.selectedUserId}`, json, {
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
      .then((response) => {
        dispatch(updateUsers(response.data.result));
      });
  };
};

export const addFollowing = (item) => {
  const json = JSON.stringify(item);
  return async (dispatch) => {
    await backendApi
      .put(`/users/following/add/${item.currentUserId}`, json, {
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
      .then((response) => {
        dispatch(updateUsers(response.data.result));
      });
  };
};

export const delFollower = (item) => {
  const json = JSON.stringify(item);
  return async (dispatch) => {
    await backendApi
      .put(`/users/followers/del/${item.selectedUserId}`, json, {
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
      .then((response) => {
        dispatch(updateUsers(response.data.result));
      });
  };
};

export const delFollowing = (item) => {
  const json = JSON.stringify(item);
  return async (dispatch) => {
    await backendApi
      .put(`/users/following/del/${item.currentUserId}`, json, {
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
      .then((response) => {
        dispatch(updateUsers(response.data.result));
      });
  };
};
