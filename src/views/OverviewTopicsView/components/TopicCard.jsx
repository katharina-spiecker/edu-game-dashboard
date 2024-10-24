import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";

/**
 * Diese Komponente zeigt ein Quizthema an.
 * Es wird das Quizthema, die Anzahl an Fragen in dem Quiz, ein Löschen-Icon und ein Bearbeiten-Icon angezeigt.
 * Das Bearbeiten-Icon führt zu der Thema-Detailseite. 
 * 
 * @component
 * @param {Objekt} topic Die Themendaten darunter topicName, id und quiz.
 * @param {Function} deleteHandler Die Funktion, welche das Thema inklusive aller dazugehörigen Multiple-Choice-Fragen löscht.
 * @returns {JSX.Element} Die TopicCard Komponente.
 */
function TopicCard({ topic, deleteHandler }) {

  const navigate = useNavigate();

  return (
    <div className="bg-white shadow shadow-slate-300 p-4 relative rounded-2xl h-40 flex justify-center items-center">
      <div>{topic.topicName}</div>
      <span className="absolute topic-card__number text-gray-500">
        {topic.quiz.length} {topic.quiz.length === 1 ? "Frage" : "Fragen"}
      </span>
      <FontAwesomeIcon
        icon={faPenToSquare}
        className="card__edit-icon absolute hover:cursor-pointer"
        onClick={() => navigate(`/edit-topic/${topic._id}`)}
      />
      <FontAwesomeIcon
        icon={faTrashCan}
        className="card__delete-icon text-red-600 absolute hover:cursor-pointer"
        onClick={deleteHandler}
      />
    </div>
  );
}

export default TopicCard;