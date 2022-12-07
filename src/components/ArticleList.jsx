import { useEffect, useState } from "react";
import { getArticles } from "../api/api";
import ArticlePreview from "./ArticlePreview";
import { useNavigate, useParams } from "react-router-dom";

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const { topic_slug } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArticles(topic_slug).then((articlesRes) => {
      setArticles(articlesRes);
      setLoading(false);
    });
  }, [topic_slug]);

  function handleArticleClick(id) {
    navigate(`/article/${id}`);
  }
  if (!loading) {
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
  } else {
    return <h2>Loading...</h2>;
  }
}

export default ArticleList;
