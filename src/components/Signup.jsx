import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../api/api";
import { UserContext } from "../contexts/userContext";

function Signup() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const navigate = useNavigate();
  const { setUser, setUserStatus } = useContext(UserContext);

  function handleSubmit(e) {
    e.preventDefault();
    createUser({ username, name, avatar_url: avatarUrl }).then((res) => {
      if (res.username) {
        setUser(res);
        setUserStatus(true);
        navigate("/");
      }
    });
  }

  return (
    <div className="new-article-page">
      <div className="create-article-page">
        <h2 className="create-header">Sign up</h2>
        <form className="create-article-form" onSubmit={handleSubmit}>
          <section className="title-section">
            <label
              className="new-article-header"
              htmlFor="create-article-header"
            >
              Username
            </label>
            <input
              className="title-input"
              type="text"
              name="create-article-header"
              placeholder="Username..."
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </section>
          <section className="topic-section">
            <label
              className="new-article-header"
              htmlFor="create-article-topic"
            >
              Name
            </label>
            <input
              className="topic-input"
              type="text"
              name="create-article-topic"
              placeholder="Name..."
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </section>
          <section className="body-section">
            <label className="new-article-header" htmlFor="create-article-body">
              Avatar URL
            </label>
            <input
              className="avatar-input"
              type="input"
              name="create-article-body"
              placeholder="Enter your avatar URL..."
              value={avatarUrl}
              onChange={(e) => {
                setAvatarUrl(e.target.value);
              }}
            />
          </section>
          <button className="create-article-button">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
