import "../styles/TopicCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";

/**
 * TopicCard component
 * 
 * Diese Komponente zeigt ein Quizthema an.
 * Es wird der Quizname, die Anzahl an Fragen in dem Quiz
 * und ein Bearbeiten icon angezeigt, welches zu der Übersicht
 * aller Fragen von diesem Quizthema leitet.
 *  
 * 
 * @component.
 * @param {string} topicName Name des Themas
 * @param {number} topicId Themen Id
 * @param {number} questionCount Anzahl der Mehrfachauswahlfragen des Themas
 */
function TopicCard({ topicName, topicId, questionCount }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow shadow-slate-300 p-4 relative rounded-2xl h-40 flex justify-center items-center">
      <div>{topicName}</div>
      <FontAwesomeIcon
        icon={faPenToSquare}
        className="card__edit-icon absolute hover:cursor-pointer"
        onClick={() => navigate(`/edit-topic/${topicId}`)}
      />
      <span className="absolute topic-card__number text-gray-500">
        {questionCount} {questionCount === 1 ? "Frage" : "Fragen"}
      </span>
    </div>
  );
}

export default TopicCard;