import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import ArticleList from "./components/ArticleList";
import SingleArticle from "./components/SingleArticle";
import { UserContext } from "./contexts/userContext";
import { useEffect, useState } from "react";
import Topics from "./components/Topics";
import { getArticles, getTopics } from "./api/api";
import NewArticlePage from "./components/NewArticlePage";
import LoginPage from "./components/LoginPage";

function App() {
  const [loading, setLoading] = useState(true);
  const [userStatus, setUserStatus] = useState(false);
  const [validTopics, setValidTopics] = useState([]);
  const [validArticles, setValidArticles] = useState([]);

  useEffect(() => {
    getTopics().then((topics) => {
      const valid = topics.map((topic) => {
        return topic.slug;
      });
      setValidTopics(valid);
    });
    getArticles().then((articles) => {
      const valid = articles.map((article) => {
        return article.article_id;
      });
      setValidArticles(valid);
    });
    setLoading(false);
  }, []);

  const [user, setUser] = useState({});
  if (!loading) {
    return (
      <UserContext.Provider
        value={{ user, setUser, userStatus, setUserStatus }}
      >
        <div className="App">
          <Header />
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <ArticleList
                  validTopics={validTopics}
                  setValidTopics={setValidTopics}
                />
              }
            />
            <Route
              path="/create"
              element={<NewArticlePage validTopics={validTopics} />}
            />
            <Route path="/topics" element={<Topics />} />
            <Route
              path="/topics/:topic_slug"
              element={<ArticleList validTopics={validTopics} />}
            />
            <Route
              path="/article/:article_id"
              element={<SingleArticle validArticles={validArticles} />}
            />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
      </UserContext.Provider>
    );
  } else {
    return <h2>Loading...</h2>;
  }
}

export default App;
