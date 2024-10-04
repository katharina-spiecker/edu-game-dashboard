import "../styles/TopicCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
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
 * @param {Objekt} topic Themen Daten darunter topicName, id, quiz
 * @param {Function} deleteHandler Funktion um Thema und alle Quizze die dazu gehören zu löschen
 */
// TODO
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
        onClick={() => navigate(`/edit-topic/${topic.id}`)}
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