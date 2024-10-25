import { useState, useEffect } from "react";
import TopicCard from "./components/TopicCard.jsx";
import PrimaryButton from "../../components/PrimaryButton.jsx";
import Modal from "../../components/Modal.jsx";
import TextArea from "../../components/TextArea.jsx";
import HeadingContainer from "../../components/HeadingContainer.jsx";

/**
 * Die Komponente generiert die Themenübersicht-Seite.
 *
 * @component
 * @returns {JSX.Element} Die OverviewTopicsView Komponente.
 */
function OverviewTopicsView() {
  const [topics, setTopics] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newTopicName, setNewTopicName] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/topics")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch topics");
        }
      })
      .then((data) => {
        setTopics(data);
      })
      .catch((error) => console.error(error.message));
  }, []);

  /**
   * Fügt dem topics array ein neues topic Objekt hinzu.
   * Setzt leeren Array als Standardwert der quiz Eigenschaft.
   */
  function saveNewTopic() {
    const newTopic = {
      topicName: newTopicName,
      quiz: [],
    };

    fetch("http://localhost:3000/api/topics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTopic),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }
        return res.json();
      })
      .then((data) => {
        // speichere die id von mongodb
        newTopic._id = data.insertedId;
        setTopics((prevTopics) => {
          return [...prevTopics, newTopic];
        });
      })
      .finally(() => {
        resetModal(); // if worked or not: reset the modal
      });
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
    setTopics((prevState) => {
      const updatedState = [...prevState];
      updatedState.splice(index, 1);
      return updatedState;
    });

    const id = topics[index]._id;

    fetch(`http://localhost:3000/api/topics/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  return (
    <>
      <HeadingContainer>
        <span className="inline-block md:w-1/3">
          {topics.length} {topics.length === 1 ? "Thema" : "Themen"}
        </span>
        <h1 className="md:text-center text-2xl">Alle Themen</h1>
        <div className="mt-2 md:mt-0 md:w-1/3 md:text-end">
          <PrimaryButton
            text="Neues Thema"
            clickHandler={() => setModalIsOpen(true)}
          />
        </div>
      </HeadingContainer>

      <div className="grid grid-cold-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
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
