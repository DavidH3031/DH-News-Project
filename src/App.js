import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import ArticleList from "./components/ArticleList";
import SingleArticle from "./components/SingleArticle";
import { UserContext } from "./contexts/userContext";
import { useEffect, useState } from "react";
import Topics from "./components/Topics";
import InvalidTopic from "./components/InvalidTopic";
import { getArticles, getTopics } from "./api/api";
import InvalidArticle from "./components/InvalidArticle";

function App() {
  const [loading, setLoading] = useState(true);
  const [userStatus, setUserStatus] = useState(false);
  const [currentTopic, setCurrentTopic] = useState();
  const [validTopics, setValidTopics] = useState([]);
  const [validArticles, setValidArticles] = useState([]);
  const [currentArticle, setCurrentArticle] = useState();

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

  const [user, setUser] = useState({
    username: "cooljmessy",
    name: "Peter Messy",
    avatar_url:
      "https://vignette.wikia.nocookie.net/mrmen/images/1/1a/MR_MESSY_4A.jpg/revision/latest/scale-to-width-down/250?cb=20170730171002",
  });
  if (!loading) {
    return (
      <UserContext.Provider
        value={{ user, setUser, userStatus, setUserStatus }}
      >
        <div className="App">
          <Header />
          <Navbar />
          <Routes>
            <Route path="/" element={<ArticleList />} />
            <Route path="/topics" element={<Topics />} />
            <Route
              path="/topics/:topic_slug"
              element={
                validTopics.includes(currentTopic) ? (
                  <ArticleList />
                ) : (
                  <InvalidTopic setCurrentTopic={setCurrentTopic} />
                )
              }
            />
            <Route
              path="/article/:article_id"
              element={
                validArticles.includes(currentArticle) ? (
                  <SingleArticle />
                ) : (
                  <InvalidArticle setCurrentArticle={setCurrentArticle} />
                )
              }
            />
          </Routes>
        </div>
      </UserContext.Provider>
    );
  } else {
    return <h2>Loading...</h2>;
  }
}

export default App;
