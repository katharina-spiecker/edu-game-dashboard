import TopicCard from "../components/TopicCard.jsx";
import PrimaryButton from "../components/PrimaryButton.jsx";
import { useState, useEffect } from "react";
import Modal from "../components/Modal.jsx";
import TextArea from "../components/TextArea.jsx";

/**
 * OverviewTopicsView component
 * 
 * Diese View Komponente generiert die Themenübersicht Seite.
 * 
 * @component
 */
function OverviewTopicsView() {
  const [topics, setTopics] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newTopicName, setNewTopicName] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/topics")
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to fetch topics');
      }
    })
    .then(data => {
      setTopics(data);
    })
    .catch(error => console.error(error.message));
  }, []);

  /**
   * Fügt dem topics array ein neues topic Objekt hinzu.
   * Setzt leeren Array als Standardwert der quiz Eigenschaft.
   */
  function saveNewTopic() {

    const newTopic = {
        topicName: newTopicName,
        quiz: []
    };

    fetch("http://localhost:3000/api/topics", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newTopic)
    })
    .then(res => {
        if (!res.ok) {
            throw new Error();
        }
        return res.json();
    })
    .then(data => {
        // speichere die id von mongodb
        newTopic._id = data.insertedId;
        setTopics(prevTopics => {
            return [
              ...prevTopics,
              newTopic
            ]
        })
    })
    .finally(() => {
        resetModal(); // if worked or not: reset the modal
    })
    
  }

  function resetModal() {
    setModalIsOpen(false);
    setNewTopicName("");
  }

  /**
   * Löscht ein topic Objekt vom topic state
   * @param {number} index 
   */
  function deleteHandler(index) {

    // delete in frontend
    setTopics(prevState => {
        const updatedState = [...prevState];
        updatedState.splice(index, 1);
        return updatedState;
    });

    const id = topics[index]._id;

    fetch(`http://localhost:3000/api/topics/${id}`, { method: "DELETE"})
    .then(res => {
        if (!res.ok) {
            throw new Error();
        }
    })
    .catch((error) => {
        console.error(error.message);
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
            key={topic._id}
            topic={topic}
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
          changeHandler={(newText) => setNewTopicName(newText)}
        />
      </Modal>
    </>
  );
}

export default OverviewTopicsView;