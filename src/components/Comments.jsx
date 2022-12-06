import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCommentsById, postComment } from "../api/api";
import { UserContext } from "../contexts/userContext";
import { getTimeStr } from "../utils/getTimeStr";

function Comments() {
  const { article_id } = useParams();
  const [commentsList, setCommentsList] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [validComment, setValidComment] = useState(true);
  const [err, setErr] = useState(null);
  const { user, userStatus } = useContext(UserContext);

  function handleSubmit() {
    if (!userStatus) {
      alert("You must be logged in to comment");
      return;
    }
    if (!newComment) return;
    setValidComment(true);
    postComment(article_id, user.username, newComment).then((res) => {
      if (res === 400) {
        setErr("Something went wrong! Please try again.");
        setCommentsList((currComments) => {
          const newComments = [...currComments];
          newComments.shift();
          setNewComment(err);
          return newComments;
        });
      } else {
        setErr(null);
      }
    });

    setCommentsList((currComments) => {
      const newComments = [...currComments];
      const date = new Date();
      const commentObj = {
        comment_id: Date.now(),
        votes: 0,
        created_at: date.toISOString(),
        author: user.username,
        body: newComment,
      };
      newComments.unshift(commentObj);
      setNewComment("");
      return newComments;
    });
  }

  useEffect(() => {
    getCommentsById(article_id).then((comments) => {
      setCommentsList(comments);
    });
  }, [article_id]);

  return (
    <div className="comments-list-box">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (newComment) {
            handleSubmit();
          } else {
            setValidComment(false);
          }
        }}
        className="comment-form"
        action="input"
      >
        <input
          placeholder="Enter your comment here..."
          className={validComment ? "comment-input" : "invalid-comment-input"}
          type="text"
          value={newComment}
          onChange={(e) => {
            setNewComment(e.target.value);
          }}
        />
        <button className="comment-button" type="submit">
          <span>Submit</span>
        </button>
      </form>
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
