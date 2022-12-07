import { useEffect, useState } from "react";
import { getTopics } from "../api/api";
import { useNavigate } from "react-router-dom";

function Topics() {
  const [topicsList, setTopicsList] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  function handleClick(topic) {
    navigate(`/topics/${topic}`);
  }

  useEffect(() => {
    getTopics().then((topics) => {
      setTopicsList(topics);
      setLoading(false);
    });
  }, []);

  if (!loading) {
    return (
      <div className="topics-box">
        <ul className="topic-list">
          {topicsList.map((topic) => {
            return (
              <li
                onClick={() => {
                  handleClick(topic.slug);
                }}
                className="topic-list-item"
                key={topic.slug}
              >
                <h2 className="topic-name">{topic.slug}</h2>
                <p className="topic-description">{topic.description}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  } else {
    return <h2>Loading...</h2>;
  }
}

export default Topics;
