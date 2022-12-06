import { getTimeStr } from "../utils/getTimeStr";

function ArticlePreview({ article }) {
  const dateTime = getTimeStr(article.created_at);

  return (
    <div className="article--item">
      <h2 className="article--list-item-header">{article.title}</h2>
      <section className="article-preview-body">
        <p className="article--list-item-author">
          Created by: <b>{article.author}</b> on
        </p>
        <p className="article--list-item-topic">{article.topic}</p>
      </section>
      <section className="article-preview-footer">
        <p className="article--list-item-comment-count">
          Comments: {article.comment_count}
        </p>
        <p className="article--list-item-created-at">
          <b>
            Created: {dateTime[0]} at {dateTime[1]}
          </b>
        </p>
      </section>
    </div>
  );
}

export default ArticlePreview;
