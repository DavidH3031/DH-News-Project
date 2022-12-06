import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, updateVotes } from "../api/api";
import { getTimeStr } from "../utils/getTimeStr";
import Comments from "./Comments";

function SingleArticle() {
  const { article_id } = useParams();
  const [currentArticle, setCurrentArticle] = useState();
  const [loading, setLoading] = useState(true);
  const [votes, setVotes] = useState();
  const [clicked, setClicked] = useState(false);
  const [err, setErr] = useState(null);

  function handleClick(e) {
    if (e.target.innerText === "👍") {
      updateVotes(article_id, 1).then((res) => {
        if (res === 400) {
          setErr("Something went wrong! Please try again.");
          setVotes((currVotes) => {
            return currVotes - 1;
          });
        } else {
          setErr(null);
          setClicked(true);
        }
      });
      setVotes((currVotes) => {
        return currVotes + 1;
      });
    } else {
      updateVotes(article_id, 1).then((res) => {
        if (res === 400) {
          setErr("Something went wrong! Please try again.");
          setVotes((currVotes) => {
            return currVotes + 1;
          });
        } else {
          setErr(null);
          setClicked(true);
        }
      });

      setVotes((currVotes) => {
        return currVotes - 1;
      });
    }
  }

  useEffect(() => {
    getArticleById(article_id).then((article) => {
      setCurrentArticle(article);
      setLoading(false);
      setVotes(article.votes);
    });
  }, [article_id]);

  if (!loading) {
    const dateTime = getTimeStr(currentArticle.created_at);
    return (
      <main>
        <div className="article-box">
          <section className="article-header">
            <h2 className="article-header-text">{currentArticle.title}</h2>
            <p className="article-author">
              Created by: {currentArticle.author}
            </p>
            <p className="article-topic">Topic: {currentArticle.topic}</p>
            <p className="article-created-at">
              Created: {dateTime[0]} at {dateTime[1]}
            </p>
            <p className="article-comment-count">
              Comments: {currentArticle.comment_count}
            </p>
            <section className="voting-buttons-box">
              <button
                className="voting-buttons"
                onClick={!clicked ? handleClick : null}
              >
                👍
              </button>
              <button
                className="voting-buttons"
                onClick={!clicked ? handleClick : null}
              >
                👎
              </button>
            </section>
            <h3 className="upvotes">Upvotes: {votes}</h3>
            <h3 className="error-msg">{err}</h3>
          </section>
          <section className="article-body">
            <p className="article-body-text">{currentArticle.body}</p>
          </section>
        </div>
        <section className="comments-list-section">
          <h2>Comments</h2>
          <Comments />
        </section>
      </main>
    );
  } else {
    return <h2>Loading...</h2>;
  }
}

export default SingleArticle;
