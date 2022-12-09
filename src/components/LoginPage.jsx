import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../api/api";
import { UserContext } from "../contexts/userContext";

function LoginPage() {
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();
  const { setUser, setUserStatus } = useContext(UserContext);

  function handleClick(fetchedUser) {
    setUser(fetchedUser);
    setUserStatus(true);
    navigate("/");
  }

  useEffect(() => {
    getUsers().then((users) => {
      setUserList(users);
    });
  }, []);

  return (
    <div className="login-page">
      <ul className="user-list">
        {userList.map((fetchedUser) => {
          return (
            <li key={fetchedUser.username} className="user-card">
              <img
                className="user-avatar"
                src={fetchedUser.avatar_url}
                alt="user avatar"
              />
              <h3 className="username">{fetchedUser.username}</h3>
              <h4 className="Real Name">{fetchedUser.name}</h4>
              <button
                onClick={() => {
                  handleClick(fetchedUser);
                }}
                className="login-button-user"
              >
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
