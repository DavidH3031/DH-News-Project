import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteComment, getCommentsById, postComment } from "../api/api";
import { UserContext } from "../contexts/userContext";
import { getTimeStr } from "../utils/getTimeStr";

function Comments() {
  const { article_id } = useParams();
  const [commentsList, setCommentsList] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [postedComments, setPostedComments] = useState(0);
  const [validComment, setValidComment] = useState(true);
  const [deletedComment, setDeletedComment] = useState({});
  const [err, setErr] = useState(null);
  const [delErr, setDelErr] = useState(null);
  const { user, userStatus } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  function handleDelete(index, id) {
    setCommentsList((currComments) => {
      const newComments = [...currComments];
      const oldComment = newComments.splice(index, 1);
      setDeletedComment(oldComment);
      return newComments;
    });

    deleteComment(id).then((res) => {
      if (res) {
        setDelErr("Something went wrong! Please try again.");
        setCommentsList((currComments) => {
          const newComments = [...currComments];
          newComments.splice(index, 0, deletedComment);
          return newComments;
        });
      }
    });
  }

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
        setNewComment(err);
      } else {
        setErr(null);
        setPostedComments((curr) => {
          return curr + 1;
        });
        setNewComment("");
      }
    });
  }

  useEffect(() => {
    setLoading(true);
    getCommentsById(article_id).then((comments) => {
      setCommentsList(comments);
      setLoading(false);
    });
  }, [article_id, postedComments]);

  if (!loading) {
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
          <textarea
            placeholder="Enter your comment here..."
            className={validComment ? "comment-input" : "invalid-comment-input"}
            type="input"
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
          {commentsList.map((comment, index) => {
            const dateTime = getTimeStr(comment.created_at);
            return (
              <li key={comment.comment_id} className="comment-item">
                <section className="header-del">
                  <p className="comment-author">{comment.author}</p>
                  <button
                    className={
                      user.username === comment.author
                        ? "delete-button"
                        : "no-delete-button"
                    }
                    onClick={() => {
                      handleDelete(index, comment.comment_id);
                    }}
                  >
                    x
                  </button>
                </section>
                {delErr ? <p>{delErr}</p> : ""}
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
  } else {
    return <h2>Loading...</h2>;
  }
}

export default Comments;
