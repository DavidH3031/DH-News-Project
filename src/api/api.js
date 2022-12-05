import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://dh-ncnews.cyclic.app/api",
});

export const getArticles = async () => {
  const res = await newsApi.get("/articles");
  return res.data.articles;
};

export const getArticleById = async (id) => {
  console.log(id, "id");
  const res = await newsApi.get(`/articles/${id}`);
  console.log(res.data.article);
  return res.data.article;
};
