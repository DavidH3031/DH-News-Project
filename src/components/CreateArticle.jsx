import { useContext, useState } from "react";
import { postArticle } from "../api/api";
import { UserContext } from "../contexts/userContext";

function CreateArticle() {
  const { user, userStatus } = useContext(UserContext);
  const [title, setTitle] = useState();
  const [topic, setTopic] = useState();
  const [body, setBody] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    postArticle(user.username, title, body, topic.toLowerCase()).then((res) => {
      console.log(res);
    });
  }

  return (
    <div className="create-article">
      <h2 className="create-header">Create Article</h2>
      <form className="create-article-form" onSubmit={handleSubmit}>
        <section className="title-section">
          <label className="new-article-header" htmlFor="create-article-header">
            Title
          </label>
          <input
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
            type="input"
            name="create-article-body"
            placeholder="Write your article here..."
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
            }}
          />
        </section>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default CreateArticle;
