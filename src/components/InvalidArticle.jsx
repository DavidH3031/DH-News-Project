import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function InvalidArticle({ setCurrentArticle }) {
  const { article_id } = useParams();

  useEffect(() => {
    setCurrentArticle(+article_id);
  }, [setCurrentArticle, article_id]);
  return (
    <div>
      <h1>No article with that ID!</h1>
      <h2>
        Click <Link to="/">here</Link> to return to the homepage.
      </h2>
    </div>
  );
}

export default InvalidArticle;
