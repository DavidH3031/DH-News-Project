import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/userContext";

function Navbar() {
  const { user, userStatus, setUserStatus } = useContext(UserContext);

  function handleLogin() {
    setUserStatus(true);
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
      </section>
      {!userStatus ? (
        <button onClick={handleLogin} className="login--button">
          Login
        </button>
      ) : (
        <seciton className="user-info">
          <img className="avatar" src={user.avatar_url} alt="avatar_url"></img>
          <p className="user-loggedin">Logged in as: {user.username}</p>
        </seciton>
      )}
    </div>
  );
}

export default Navbar;
