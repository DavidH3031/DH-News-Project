import { useContext, useEffect, useState } from "react";
import { getUsers } from "../api/api";
import { UserContext } from "../contexts/userContext";

function LoginPage() {
  const [userList, setUserList] = useState([]);
  const { user, setUser, userStatus, setUserStatus } = useContext(UserContext);

  function handleClick(e) {
    console.log(e);
  }

  useEffect(() => {
    getUsers().then((users) => {
      setUserList(users);
    });
  }, []);

  return (
    <div className="login-page">
      <ul className="user-list">
        {userList.map((user) => {
          return (
            <li className="user-card">
              <img
                className="user-avatar"
                src={user.avatar_url}
                alt="user avatar"
              />
              <h3 className="username">{user.username}</h3>
              <h4 className="Real Name">{user.name}</h4>
              <button onClick={handleClick} className="login-button-user">
                Login
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default LoginPage;
