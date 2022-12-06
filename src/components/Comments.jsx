import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCommentsById } from "../api/api";
import { getTimeStr } from "../utils/getTimeStr";

function Comments() {
  const { article_id } = useParams();
  const [commentsList, setCommentsList] = useState([]);
  useEffect(() => {
    getCommentsById(article_id).then((comments) => {
      setCommentsList(comments);
    });
  }, [article_id]);

  return (
    <div className="comments-list-box">
      <ul className="comments-list">
        {commentsList.map((comment) => {
          const dateTime = getTimeStr(comment.created_at);
          return (
            <li key={comment.comment_id} className="comment-item">
              <p className="comment-author">{comment.author}</p>
              <p className="comment-body">{comment.body}</p>
              <p className="comment-creation">
                Created: {dateTime[0]} at {dateTime[1]}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Comments;
