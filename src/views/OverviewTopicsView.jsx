import data from "../assets/data.js";
import TopicCard from "../components/TopicCard.jsx";
import PrimaryButton from "../components/PrimaryButton.jsx";
import { useState } from "react";
import Modal from "../components/Modal.jsx";
import TextArea from "../components/TextArea.jsx";
import { v4 as uuid } from "uuid";

/**
 * OverviewTopicsView component
 * 
 * Diese View Komponente generiert die Themenübersicht Seite.
 * 
 * @component
 */
function OverviewTopicsView() {
  const [topics, setTopics] = useState(data);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newTopic, setNewTopic] = useState("");


  /**
   * Fügt dem topics array ein neues topic Objekt hinzu.
   * Setzt leeren Array als Standardwert der quiz Eigenschaft.
   */
  function saveNewTopic() {
    setTopics(prevTopics => {
      return [
        ...prevTopics,
        {
          id: uuid(),
          topicName: newTopic,
          quiz: []
        }
      ]
    })
    resetModal();
  }

  function resetModal() {
    setModalIsOpen(false);
    setNewTopic("");
  }

  /**
   * Löscht ein topic Objekt vom topic state
   * @param {number} index 
   */
  function deleteHandler(index) {
    setTopics(prevState => {
      const updatedState = [...prevState];
      updatedState.splice(index, 1);
      return updatedState;
    })

  }

  return (
    <>
      <div className="flex items-center justify-between mx-auto mb-7">
        <span className="inline-block w-1/3">
          {topics.length} {topics.length === 1 ? "Thema" : "Themen"}
        </span>
        <h1 className="text-center text-2xl">Alle Themen</h1>
        <div className="w-1/3 text-end">
          <PrimaryButton text="Neues Thema" clickHandler={() => setModalIsOpen(true)}/>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto">
        {topics.map((topic, index) => (
          <TopicCard
            key={topic.id}
            topicName={topic.topicName}
            questionCount={topic.quiz.length}
            topicId={topic.id}
            deleteHandler={() => deleteHandler(index)}
          />
        ))}
      </div>
      <Modal
        closeModal={resetModal}
        isOpen={modalIsOpen}
        saveText="Speichern"
        saveHandler={saveNewTopic}
      >
        <TextArea
          label="Neues Thema"
          id="new-topic"
          changeHandler={(newText) => setNewTopic(newText)}
        />
      </Modal>
    </>
  );
}

export default OverviewTopicsView;