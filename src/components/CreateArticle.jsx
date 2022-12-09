import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { postArticle, postTopic } from "../api/api";
import { UserContext } from "../contexts/userContext";

function CreateArticle({ validTopics, setValidTopics }) {
  const { user, userStatus } = useContext(UserContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [topicDesc, setTopicDesc] = useState("");
  const [body, setBody] = useState("");
  const [newTopic, setNewTopic] = useState(false);
  const { pathname } = useLocation();

  function postNewArticle() {
    postArticle(user.username, title, body, topic.toLowerCase()).then((res) => {
      if (res.article_id) {
        navigate(`/article/${res.article_id}`);
      }
    });
  }

  function handleBlur(e) {
    if (!validTopics.includes(topic)) {
      setNewTopic(true);
    } else {
      setNewTopic(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!userStatus) {
      alert("You must be logged into create an article!");
      return;
    }
    if (newTopic) {
      postTopic(topic, topicDesc).then((res) => {
        if (res.slug === topic.toLowerCase()) {
          setValidTopics((curr) => {
            const newTopics = [...curr, res.slug];
            return newTopics;
          });
          postNewArticle();
        }
      });
    } else {
      postNewArticle();
    }
  }

  return (
    <div
      className={
        pathname === "/create" ? "create-article-page" : "create-article"
      }
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
            onBlur={(e) => {
              handleBlur(e);
            }}
          />
        </section>
        {newTopic ? (
          <section className="topic-desc-section">
            <label
              className="new-article-header"
              htmlFor="create-article-topic"
            >
              Topic Description
            </label>
            <input
              className="topic-input"
              type="text"
              name="create-article-topic"
              placeholder="Topic..."
              value={topicDesc}
              onChange={(e) => {
                setTopicDesc(e.target.value);
              }}
            />
          </section>
        ) : (
          ""
        )}
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
