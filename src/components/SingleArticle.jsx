import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../api/api";
import { getTimeStr } from "../utils/getTimeStr";

function SingleArticle() {
  const { article_id } = useParams();
  const [currentArticle, setCurrentArticle] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArticleById(article_id).then((article) => {
      console.log(article);
      setCurrentArticle(article);

      setLoading(false);
    });
  }, [article_id]);

  if (!loading) {
    const dateTime = getTimeStr(currentArticle.created_at);
    return (
      <div className="article-box">
        <section className="article-header">
          <h2 className="article-header-text">{currentArticle.title}</h2>
          <p className="article-author">Created by: {currentArticle.author}</p>
          <p className="article-topic">Topic: {currentArticle.topic}</p>
          <p className="article-created-at">
            Created: {dateTime[0]} at {dateTime[1]}
          </p>
          <p className="article-comment-count">
            Comments: {currentArticle.comment_count}
          </p>
        </section>
        <section className="article-body">
          <p className="article-body-text">{currentArticle.body}</p>
        </section>
      </div>
    );
  }
}

export default SingleArticle;
