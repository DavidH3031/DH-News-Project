import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { postArticle } from "../api/api";
import { UserContext } from "../contexts/userContext";

function CreateArticle({ setPostedArticle }) {
  const { user, userStatus } = useContext(UserContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState();
  const [topic, setTopic] = useState();
  const [body, setBody] = useState();
  const { pathname } = useLocation();

  function handleSubmit(e) {
    e.preventDefault();
    if (!userStatus) {
      alert("You must be logged into create an article!");
      return;
    }
    postArticle(user.username, title, body, topic.toLowerCase()).then((res) => {
      if (res.article_id) {
        setTitle("");
        setTopic("");
        setBody("");
        navigate(`/article/${res.article_id}`);
      }
    });
  }

  return (
    <div
      className={pathname === "/" ? "create-article" : "create-article-page"}
    >
      <h2 className="create-header">Create Article</h2>
      <form className="create-article-form" onSubmit={handleSubmit}>
        <section className="title-section">
          <label className="new-article-header" htmlFor="create-article-header">
            Title
          </label>
          <input
            className="title-input"
            type="text"
            name="create-article-header"
            placeholder="Title..."
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </section>
        <section className="topic-section">
          <label className="new-article-header" htmlFor="create-article-topic">
            Topic
          </label>
          <input
            className="topic-input"
            type="text"
            name="create-article-topic"
            placeholder="Topic..."
            value={topic}
            onChange={(e) => {
              setTopic(e.target.value);
            }}
          />
        </section>
        <section className="body-section">
          <label className="new-article-header" htmlFor="create-article-body">
            Body
          </label>
          <textarea
            className="body-input"
            type="input"
            name="create-article-body"
            placeholder="Write your article here..."
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
            }}
          />
        </section>
        <button className="create-article-button">Submit</button>
      </form>
    </div>
  );
}

export default CreateArticle;
