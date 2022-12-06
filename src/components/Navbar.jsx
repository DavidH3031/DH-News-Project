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
        <h2 className="navbar--links-button">Topics</h2>
      </section>
      {!userStatus ? (
        <button onClick={handleLogin} className="login--button">
          Login
        </button>
      ) : (
        <p className="user-loggedin">Logged in as: {user.username}</p>
      )}
    </div>
  );
}

export default Navbar;
