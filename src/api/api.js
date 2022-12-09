import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://newsapi-qkxs.onrender.com/api",
});

export const getArticles = async (topic_slug, sort, ascOrDesc) => {
  const res = await newsApi.get("/articles", {
    params: { topic: topic_slug, sort_by: sort, order: ascOrDesc, limit: 1000 },
  });
  return res.data.articles;
};

export const getTopics = async () => {
  const res = await newsApi.get("/topics");
  return res.data.topics;
};

export const getArticleById = async (id) => {
  const res = await newsApi.get(`/articles/${id}`);
  return res.data.article;
};

export const getCommentsById = async (id) => {
  const res = await newsApi.get(`/articles/${id}/comments`);
  return res.data.comments;
};

export const updateVotes = async (id, increment) => {
  const body = { inc_votes: increment };
  try {
    const res = await newsApi.patch(`/articles/${id}`, body);
    return res.data.article;
  } catch (error) {
    return error.response.status;
  }
};

export const postComment = async (id, username, body) => {
  try {
    const sendBody = { username, body };
    const res = await newsApi.post(`/articles/${id}/comments`, sendBody);
    return res.data.comment;
  } catch (error) {
    return error.response.status;
  }
};

export const deleteComment = async (id) => {
  try {
    await newsApi.delete(`/comments/${id}`);
    return;
  } catch (error) {
    return error.response.status;
  }
};

export const postArticle = async (author, title, body, topic) => {
  try {
    const sendBody = { author, title, body, topic };
    const res = await newsApi.post(`/articles`, sendBody);
    return res.data.article;
  } catch (error) {
    return error.response.status;
  }
};

export const postTopic = async (slug, description) => {
  try {
    const name = slug.toLowerCase();
    const sendBody = { slug: name, description };
    const res = await newsApi.post(`/topics`, sendBody);
    return res.data.topic;
  } catch (error) {
    return error.response.status;
  }
};

export const getUsers = async () => {
  try {
    const res = await newsApi.get("/users/");
    return res.data.users;
  } catch (error) {
    return error;
  }
};

export const createUser = async ({ username, name, avatar_url }) => {
  try {
    const body = { username, name, avatar_url };
    const res = await newsApi.post("/users", body);
    return res.data.newUser;
  } catch (error) {
    return error;
  }
};
