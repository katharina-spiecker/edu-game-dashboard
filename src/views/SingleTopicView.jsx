import { useParams } from "react-router-dom";
import data from "../assets/data.js";
import MultipleChoiceCard from "../components/MultipleChoiceCard.jsx";
import PrimaryButton from "../components/PrimaryButton.jsx";
import Modal from "../components/Modal.jsx";
import { useState } from "react";
import TextArea from "../components/TextArea.jsx";
import { faCheck, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * SingleTopicView component
 *
 * Diese View Komponente generiert eine Seite,
 * welche die Fragen und Antworten zu einem einzelnes Thema anzeigt.
 *
 * @component
 */
function SingleTopicView() {
  const { id } = useParams();

  const topic = data.find((topic) => topic.id == id);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [mode, setMode] = useState(null);
  const [quizIndex, setQuizIndex] = useState(null);
  const [editQuizContent, setEditQuizContent] = useState(null);
  const [newMultipleChoiceQuiz, setNewMultipleChoiceQuiz] = useState({
    question: null,
    answers: [
      {
        text: null,
        correct: false
      },
      {
        text: null,
        correct: false
      }
    ]
  });

  function openModal(mode = "", index = null) {
    if (mode === "edit") {
      setQuizIndex(index);
      setEditQuizContent(topic.quiz[index]);
    }
    setMode(mode);
    setModalIsOpen(true);
  }

  function resetModal() {
    setModalIsOpen(false);
    setMode(null);
    setQuizIndex(null);
    setEditQuizContent(null);
    setNewMultipleChoiceQuiz({
        question: null,
        answers: [
          {
            text: null,
            correct: false
          },
          {
            text: null,
            correct: false
          }
        ]
    });
  }

  function saveNewHandler() {
    // add quiz
    topic.quiz.push(newMultipleChoiceQuiz);
    // reset quiz
    setNewMultipleChoiceQuiz({
      question: null,
        answers: [
          {
            text: null,
            correct: false
          },
          {
            text: null,
            correct: false
          }
        ]
    });

    resetModal();
  }

  /**
   * Saves edited quiz item.
   */
  function saveEditHandler() {
    topic.quiz[quizIndex] = editQuizContent;
    resetModal();
  }

  /**
   * Bearbeitet existierende oder neu erstellte Fragen.
   * @param {string} newText neue Text für die Frage
   * @param {Function} setterFunction setEditQuizContent oder setNewMultipleChoiceQuiz
   */
  function updateQuestion(newText, setterFunction) {
    // update question, copy existing answers
    setterFunction((prevState) => {
      return {
        question: newText,
        answers: prevState.answers
      }
    });
  }


  /**
   * Speichert veränderten oder neu erstellten Antworttext
   * @param {number} index Index der Antwort im answers array von quiz ObjeKt
   * @param {string} newText neuer Antworttext
   * @param {Function} setterFunction setEditQuizContent oder setNewMultipleChoiceQuiz state setter Funktion
   */
  function updateAnswer(index, newText, setterFunction) {
    setterFunction((prevState) => { // save updated answers
      // make deep clone of existing answers (deep clone necessary since array of objects)
      const updatedAnswers = structuredClone(prevState.answers);
      updatedAnswers[index].text = newText;

      return {
        question: prevState.question,
        answers: updatedAnswers,
      };
    });
  }

  /**
   * Speichert die Auswahl der richtigen Antwort für bearbeitete oder neu erstellte Quizfragen.
   * @param {*} index 
   * @param {*} setterFunction setEditQuizContent oder setNewMultipleChoiceQuiz state setter Funktion
   */
  function updateCorrectAnswer(index, setterFunction) {
    setterFunction((prevState) => {
      // make deep clone of existing answers (deep clone necessary since array of objects)
      const updatedAnswers = structuredClone(prevState.answers);

      // setzte alle auf false, außer die, die neu ausgewählt wurde
      updatedAnswers.forEach((answer, answerIndex) => {
        if (index === answerIndex) {
          answer.correct = true;
        } else {
          answer.correct = false;
        }
      });

      return {
        question: prevState.question,
        answers: updatedAnswers,
      };
    });
  }

  /**
   * Fügt einem Quiz eine neue Antwortmöglichkeit hinzu.
   */
  function addNewAnswer() {
    setNewMultipleChoiceQuiz((prevState) => {
      const newAnwers = [...prevState.answers, {
        text: null,
        correct: false
      }];

      return {
        question: prevState.question,
        answers: newAnwers
      }
    })
  }

  return (
    <>
      <div className="flex items-center justify-between mx-auto mb-7">
        <span className="inline-block w-1/3">
          {topic.quiz.length} {topic.quiz.length === 1 ? "Frage" : "Fragen"}
        </span>
        <h1 className="text-center text-2xl">Thema {topic.topicName}</h1>
        <div className="w-1/3 text-end">
          <PrimaryButton
            text="Neue Frage"
            clickHandler={() => openModal("create")}
          />
        </div>
      </div>

      {
        topic.quiz.map((item, index) => (
          <MultipleChoiceCard
            key={index}
            content={item}
            openModal={() => openModal("edit", index)}
          />
        ))
      }
      {/* new question modal */}
      {mode === "edit" ? (
        <Modal
          isOpen={modalIsOpen}
          closeModal={resetModal}
          saveHandler={saveEditHandler}
          saveText="Änderungen Speichern">

          <div className="mb-5">
            <TextArea
              id="question"
              label="Frage"
              defaultValue={editQuizContent.question}
              changeHandler={(newText) => updateQuestion(newText, setEditQuizContent)}
            />
          </div>
          {editQuizContent.answers.map((answer, index) => (
            <div
              className="flex items-center"
              key={index}
            >
              <button
                onClick={() => updateCorrectAnswer(index, setEditQuizContent)}
                className="shrink-0 rounded-full border w-6 h-6 flex items-center justify-center me-2 cursor-pointer"
                disabled={answer.correct}>
                <FontAwesomeIcon className={answer.correct ? "text-green-700" : "text-gray-200"} icon={faCheck} /> 
              </button>
              <TextArea
                id={"antwort-" + (index + 1)}
                label={"Antwort " + (index + 1)}
                defaultValue={answer.text}
                changeHandler={(newText) => updateAnswer(index, newText, setEditQuizContent)}
              />
            </div>
          ))}
        </Modal>
      ) : (
        <Modal
          isOpen={modalIsOpen}
          closeModal={resetModal}
          saveText="Speichern"
          saveHandler={saveNewHandler}>

        <div className="mb-5">
          <TextArea
            id="new-question"
            label="Frage"
            changeHandler={(newText) => updateQuestion(newText, setNewMultipleChoiceQuiz)}
          />
        </div>
          {
            newMultipleChoiceQuiz.answers.map((answer, index) => (
              <div
                className="flex items-center"
                key={index}
              >
                <button
                  onClick={() => updateCorrectAnswer(index, setNewMultipleChoiceQuiz)}
                  className="shrink-0 rounded-full border w-6 h-6 flex items-center justify-center me-2 cursor-pointer"
                  disabled={answer.correct}>
                  <FontAwesomeIcon className={answer.correct ? "text-green-700" : "text-gray-200"} icon={faCheck} /> 
                </button>

                <TextArea
                  key={index}
                  id={"new-answer" + index}
                  label={"Antwort " + (index + 1)}
                  changeHandler={(newText) => updateAnswer(index, newText, setNewMultipleChoiceQuiz)}
                />
              </div>
            ))
          }

          {
            newMultipleChoiceQuiz.answers.length < 4 &&
            <button onClick={addNewAnswer} className="border border-black p-1 rounded mt-3 ms-7">
              <FontAwesomeIcon icon={faCirclePlus} className="me-2" />
              {newMultipleChoiceQuiz.answers.length + 1}. Antwort hinzufügen
            </button>
          }
          
        </Modal>
      )}
    </>
  );
}

export default SingleTopicView;