import { useParams } from "react-router-dom";
import data from "../assets/data.js";
import MultipleChoiceCard from "../components/MultipleChoiceCard.jsx";
import PrimaryButton from "../components/PrimaryButton.jsx";
import Modal from "../components/Modal.jsx";
import { useState } from "react";
import TextInput from "../components/TextInput.jsx";

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

  const topic = data.find((topic) => topic.id === id);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [mode, setMode] = useState(null);
  const [quizIndex, setQuizIndex] = useState(null);
  const [editQuizContent, setEditQuizContent] = useState(null);

  function openModal(mode = "", index = null) {
    if (mode === "edit") {
      setQuizIndex(index);
      setEditQuizContent(topic.quiz[index]);
    }
    setMode(mode);
    setModalIsOpen(true);
  }

  function saveEditHandler() {
    // save
    topic.quiz[quizIndex] = editQuizContent;
    // reset
    resetModal();
  }

  function saveNewHandler() {
    // save
    resetModal();
  }

  function resetModal() {
    setModalIsOpen(false);
    setMode(null);
    setQuizIndex(null);
    setEditQuizContent(null);
  }

  function updateQuestion(newText) {
    // update question, copy existing answers
    setEditQuizContent({
      question: newText,
      answers: [...editQuizContent.answers],
    });
  }

  function updateAnswer(index, newText) {
    // save updated answers
    setEditQuizContent((prevState) => {
      // make deep clone of existing answers (deep clone necessary since array of objects)
      const updatedAnswers = structuredClone(prevState.answers);

      // update text
      updatedAnswers[index].text = newText;

      return {
        question: prevState.question,
        answers: updatedAnswers,
      };
    });
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
      {topic.quiz.map((item, index) => (
        <MultipleChoiceCard
          key={index}
          content={item}
          openModal={() => openModal("edit", index)}
        />
      ))}
      {/* new question modal */}
      {mode === "edit" ? (
        <Modal
          isOpen={modalIsOpen}
          closeModal={resetModal}
          saveHandler={saveEditHandler}
          saveText="Änderungen Speichern">
          <h3 className="mb-3 font-semibold">Frage bearbeiten</h3>
          <TextInput
            id="question"
            label="Frage"
            defaultValue={editQuizContent.question}
            changeHandler={(newText) => updateQuestion(newText)}
          />
          {editQuizContent.answers.map((answer, index) => (
            <TextInput
              key={index}
              id={"antwort-" + (index + 1)}
              label={"Antwort " + (index + 1)}
              defaultValue={answer.text}
              changeHandler={(newText) => updateAnswer(index, newText)}
            />
          ))}
        </Modal>
      ) : (
        <Modal
          isOpen={modalIsOpen}
          closeModal={resetModal}
          saveText="Speichern"
          saveHandler={saveNewHandler}>
          <h3>Frage hinzufügen</h3>
          <TextInput id="question" label="Frage" />
        </Modal>
      )}
    </>
  );
}

export default SingleTopicView;