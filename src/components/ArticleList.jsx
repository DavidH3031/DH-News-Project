import { useEffect, useState } from "react";
import { getArticles } from "../api/api";
import ArticlePreview from "./ArticlePreview";
import { useNavigate, useParams } from "react-router-dom";
import InvalidTopic from "./InvalidTopic";
import CreateArticle from "./CreateArticle";

function ArticleList({ validTopics }) {
  const [articles, setArticles] = useState([]);
  const { topic_slug } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState();
  const [ascOrDesc, setascOrDesc] = useState("desc");

  function handleSort(e) {
    switch (e.target.innerText) {
      case "Date":
        setSort("created_at");
        return;
      case "Comment count":
        setSort("comment_count");
        return;
      case "Upvotes":
        setSort("votes");
        return;
      case "Ascending":
        setascOrDesc("desc");
        return;
      case "Descending":
        setascOrDesc("asc");
        return;
      default:
        break;
    }
  }

  useEffect(() => {
    getArticles(topic_slug, sort, ascOrDesc).then((articlesRes) => {
      setArticles(articlesRes);
      setLoading(false);
    });
  }, [topic_slug, sort, ascOrDesc]);

  function handleArticleClick(id) {
    navigate(`/article/${id}`);
  }

  if (!loading) {
    if (!topic_slug || validTopics.includes(topic_slug)) {
      return (
        <main className="homepage">
          <CreateArticle />
          <div className="article--list-box">
            <section className="sort-by">
              <h3 className="sort-by-text">Sort by:</h3>
              <button
                className="sorting-buttons"
                onClick={handleSort}
                disabled={sort === "created_at"}
              >
                Date
              </button>
              <button
                className="sorting-buttons"
                onClick={handleSort}
                disabled={sort === "comment_count"}
              >
                Comment count
              </button>
              <button
                className="sorting-buttons"
                onClick={handleSort}
                disabled={sort === "votes"}
              >
                Upvotes
              </button>
              <button
                className="sorting-buttons"
                id="asc-desc"
                onClick={handleSort}
              >
                {ascOrDesc === "asc" ? "Ascending" : "Descending"}
              </button>
            </section>
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
        </main>
      );
    } else if (!validTopics.includes(topic_slug)) {
      return <InvalidTopic />;
    } else {
      return <h2>Loading...</h2>;
    }
  }
}
export default ArticleList;
