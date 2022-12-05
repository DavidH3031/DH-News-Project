import React, { useEffect, useState } from "react";
import { getArticles } from "../api/api";
import ArticlePreview from "./ArticlePreview";
import { useNavigate } from "react-router-dom";

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getArticles().then((articlesRes) => {
      setArticles(articlesRes);
    });
  }, []);

  function handleArticleClick(id) {
    navigate(`/article/${id}`);
  }

  return (
    <div className="article--list-box">
      <ul className="article--list">
        {articles.map((article) => {
          return (
            <li
              onClick={() => {
                handleArticleClick(article.article_id);
              }}
              className="article--list-item"
              key={article.article_id}
            >
              <ArticlePreview article={article} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ArticleList;
