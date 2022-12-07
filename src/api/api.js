import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://dh-ncnews.cyclic.app/api",
});

export const getArticles = async (topic_slug, sort, ascOrDesc) => {
  const res = await newsApi.get("/articles", {
    params: { topic: topic_slug, sort_by: sort, order: ascOrDesc },
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
