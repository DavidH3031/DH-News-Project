import React, { useEffect, useState } from "react";
import { getArticles } from "../api/api";
import Article from "./Article";

function ArticleList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles().then((articlesRes) => {
      setArticles(articlesRes);
    });
  }, []);

  return (
    <div className="article--list-box">
      <ul className="article--list">
        {articles.map((article) => {
          return (
            <li className="article--list-item" key={article.article_id}>
              <Article article={article} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ArticleList;
