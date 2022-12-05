import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://dh-ncnews.cyclic.app/api",
});

export const getArticles = async () => {
  const res = await newsApi.get("/articles");
  console.log(res.data.articles[0]);
  return res.data.articles;
};
