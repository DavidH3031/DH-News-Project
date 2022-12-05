import React from "react";

function Navbar() {
  return (
    <div className="navbar">
      <section className="navbar--links">
        <h2 className="navbar--links-button">Home</h2>
        <h2 className="navbar--links-button">Topics</h2>
      </section>
      <button className="login--button">Login</button>
    </div>
  );
}

export default Navbar;
