import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import TextArea from "../../../components/TextArea.jsx";
import PrimaryButton from "../../../components/PrimaryButton.jsx";

/**
 * Diese Komponente ist ein Modal zum Bearbeiten einer 
 * existierenden Quiz Frage und Antworten.
 * 
 * @module SingleTopicView/EditMultipleChoiceModal
 * @param {boolean} isOpen Modal geöffnet oder geschlossen
 * @param {Function} closeModal Funktion, welche zum Schließen aufgerufen wird
 * @param {Function} saveEditHandler Zum Schließen des Modals
 * @param {Objekt} initialContent Enthält Zustand eines Quizzes vor dem Bearbeiten
 * @returns {JSX.Element} EditMultipleChoiceModal Komponente
 */
function EditMultipleChoiceModal({isOpen, closeModal, saveEditHandler, initialContent}) {
    const [editQuizContent, setEditQuizContent] = useState(initialContent);
  
    function handleClose() {
        setEditQuizContent(null);
        closeModal();
    }

    /**
     * Bearbeitet existierende Fragen und Antworten.
     * @param {string} newText neuer Text für die Frage
     */
    function updateQuestion(newText) {
        // update question, copy existing answers
        setEditQuizContent((prevState) => {
        return {
            quizId: prevState.quizId,
            question: newText,
            answers: prevState.answers
        }
        });
    }

    /**
     * Speichert die Auswahl der richtigen Antwort für bearbeitete Quizfragen.
     * @param {number} index 
     */
    function updateCorrectAnswer(index) {
        setEditQuizContent((prevState) => {
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
                quizId: prevState.quizId,
                question: prevState.question,
                answers: updatedAnswers,
            };
        });
    }

    /**
   * Speichert veränderten oder neu erstellten Antworttext
   * @param {number} index Index der Antwort im answers array von quiz ObjeKt
   * @param {string} newText neuer Antworttext
   */
  function updateAnswer(index, newText) {
    setEditQuizContent((prevState) => { // save updated answers
      // make deep clone of existing answers (deep clone necessary since array of objects)
      const updatedAnswers = structuredClone(prevState.answers);
      updatedAnswers[index].text = newText;

      return {
        quizId: prevState.quizId,
        question: prevState.question,
        answers: updatedAnswers,
      };
    });
  }

    return (
    <>
      {isOpen && (
        <>
          <div
            className="opacity-50 bg-slate-900 fixed top-0 bottom-0 left-0 right-0"
            onClick={handleClose}
          ></div>

          <div className="bg-white shadow shadow-slate-300 rounded-2xl p-4 z-1 min-w-80 min-h-80 fixed top-0 mx-4 mx-auto left-1/2 -translate-x-1/2 md:w-96 pb-20">
            <FontAwesomeIcon
              icon={faXmark}
              className="absolute top-4 right-4 hover:cursor-pointer"
              onClick={handleClose}
            />

            <div className="mb-5">
              <TextArea
                id="question"
                label="Frage"
                defaultValue={editQuizContent.question}
                changeHandler={updateQuestion}
              />
            </div>

            {editQuizContent.answers.map((answer, index) => (
              <div className="flex items-center" key={index}>
                <button
                  onClick={() => updateCorrectAnswer(index)}
                  className="shrink-0 rounded-full border w-6 h-6 flex items-center justify-center me-2 cursor-pointer"
                  disabled={answer.correct}
                >
                  <FontAwesomeIcon
                    className={
                      answer.correct ? "text-green-700" : "text-gray-200"
                    }
                    icon={faCheck}
                  />
                </button>
                <TextArea
                  id={"antwort-" + (index + 1)}
                  label={"Antwort " + (index + 1)}
                  defaultValue={answer.text}
                  changeHandler={(newText) =>
                    updateAnswer(index, newText)
                  }
                />
              </div>
            ))}

            <div className="absolute left-0 bottom-5 text-center w-full">
              <PrimaryButton text="Änderungen speichern" clickHandler={() => saveEditHandler(editQuizContent)} />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default EditMultipleChoiceModal;