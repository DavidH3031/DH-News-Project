import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://dh-ncnews.cyclic.app/api",
});

export const getArticles = async () => {
  const res = await newsApi.get("/articles");
  return res.data.articles;
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
