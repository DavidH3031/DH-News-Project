import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";

function Navbar() {
  const { user, userStatus } = useContext(UserContext);
  const navigate = useNavigate();

  function handleSignup() {
    navigate("/signup");
  }

  function handleLogin() {
    navigate("/login");
  }

  return (
    <div className="navbar">
      <section className="navbar--links">
        <Link className="home-link" to="/">
          <h2 className="navbar--links-button">Home</h2>
        </Link>
        <Link className="home-link" to="/topics">
          <h2 className="navbar--links-button">Topics</h2>
        </Link>
        <Link className="home-link" id="new-article" to="/create">
          <h2 className="navbar--links-button-new">New Article</h2>
        </Link>
      </section>
      {!userStatus ? (
        <section className="user-controls">
          <button onClick={handleLogin} className="login--button">
            Login
          </button>
          <button onClick={handleSignup} className="signup--button">
            Signup
          </button>
        </section>
      ) : (
        <section className="user-info">
          <img className="avatar" src={user.avatar_url} alt="avatar_url"></img>
          <p className="user-loggedin">Logged in as: {user.username}</p>
        </section>
      )}
    </div>
  );
}

export default Navbar;
