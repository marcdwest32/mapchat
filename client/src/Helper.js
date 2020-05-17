import * as axios from 'axios';
// const localIP = '172.24.12.151'; //Paul
// const localIP = '10.0.0.28'; //paul home

const localIP = '192.168.0.22'; // Marc

export const getAll = () => {
  return axios.get(`http://${localIP}:8080/messages/all`);
};

export const getOne = postProperties => {
  return axios.get(`http://${localIP}:8080/messages`, postProperties);
};

export const postMessageHelper = (postInput, location, userId) => {
  let body = {
    title: postInput.title,
    text: postInput.message,
    post_public: postInput.comments,
    post_local: postInput.global,
    post_anonymous: postInput.anon,
    coordinate: {
      long: location.longitude,
      lat: location.latitude,
    },
    userId: userId,
  };
  return axios.post(`http://${localIP}:8080/messages`, body);
};

export const getUser = userInput => {
  return axios.get(`http://${localIP}:8080/users`, userInput);
};

export const postUser = userInput => {
  let body = {
    username: userInput.username,
    name_first: userInput.name_first,
    name_last: userInput.name_last,
    password: userInput.password,
    email: userInput.email,
    bio: userInput.bio,
    status: userInput.status,
    public: userInput.public,
  };
  return axios.post(`http://${localIP}:8080/users`, body);
};
export const updateUser = userInput => {
  let body = {
    username: userInput.username,
    name_first: userInput.name_first,
    name_last: userInput.name_last,
    password: userInput.password,
    email: userInput.email,
    bio: userInput.bio,
    status: userInput.status,
    public: userInput.public,
    id: userInput.id,
  };
  return axios.patch(`http://${localIP}:8080/users`, body);
};

export const postComment = commentInput => {
  const body = {
    postId: commentInput.postId,
    text: commentInput.text,
    userId: commentInput.userId,
  };
  return axios.post(`http://${localIP}:8080/comments`, body);
};

export const addLike = likeInput => {
  const body = {
    userId: likeInput.userId,
    postId: likeInput.postId,
  };
  return axios.post(`http://${localIP}:8080/likes`, body);
};

export const removeLike = likeInput => {
  const body = {
    userId: likeInput.userId,
    postId: likeInput.postId,
  };
  return axios.delete(`http://${localIP}:8080/likes`, { data: body });
};
