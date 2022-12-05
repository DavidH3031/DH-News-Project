import React from "react";

function Article({ article }) {
  return (
    <div className="article--item">
      <h2 className="article--list-item-header">{article.title}</h2>
      <p className="article--list-item-author">{article.author}</p>
      <p className="article--list-item-topic">{article.topic}</p>
      <p className="article--list-item-created-at">{article.created_at}</p>
      <p className="article--list-item-comment-count">
        {article.comment_count}
      </p>
    </div>
  );
}

export default Article;
