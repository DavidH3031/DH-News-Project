import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <section className="navbar--links">
        <Link className="home-link" to="/">
          <h2 className="navbar--links-button">Home</h2>
        </Link>
        <h2 className="navbar--links-button">Topics</h2>
      </section>
      <button className="login--button">Login</button>
    </div>
  );
}

export default Navbar;
