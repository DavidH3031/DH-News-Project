import { useParams } from "react-router-dom";
import Topics from "./Topics";

function InvalidTopic({ setCurrentTopic }) {
  const { topic_slug } = useParams();
  setCurrentTopic(topic_slug);

  return (
    <div>
      <h1>This topic does not exist!</h1>
      <h2>Please chose one from the list below</h2>
      <Topics />
    </div>
  );
}

export default InvalidTopic;
