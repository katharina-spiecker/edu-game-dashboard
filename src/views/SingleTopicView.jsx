import { useParams } from "react-router-dom";
import MultipleChoiceCard from "../components/MultipleChoiceCard.jsx";
import PrimaryButton from "../components/PrimaryButton.jsx";
import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import EditMultipleChoiceModal from "../components/EditMultipleChoiceModal.jsx";
import CreateMultipleChoiceModal from "../components/CreateMultipleChoiceModal.jsx";

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

  const [topic, setTopic] = useState(null);
  const [quizArr, setQuizArr] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [mode, setMode] = useState(null);
  const [quizIndex, setQuizIndex] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/topics/${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch topics");
        }
      })
      .then((data) => {
        setTopic(data);
        setQuizArr(data.quiz);
      })
      .catch((error) => console.error(error.message));
  }, []);

  function openModal(mode = "", index) {
    if (mode === "edit") {
      setQuizIndex(index);
    }
    setMode(mode);
    setModalIsOpen(true);
  }

  function resetModal() {
    setModalIsOpen(false);
    setMode(null);
    setQuizIndex(null);
  }

  function saveNewHandler(newMultipleChoiceQuiz) {
    // create unique ID
    const newQuiz = {
      question: newMultipleChoiceQuiz.question,
      answers: newMultipleChoiceQuiz.answers,
      quizId: uuid(),
    };

    // add quiz to state
    setQuizArr((prevState) => {
      return [...prevState, newQuiz];
    });

    resetModal();

    fetch("http://localhost:3000/api/quizzes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topicId: id,
        ...newQuiz,
      })
    })
    .then((res) => {
    console.log(res);
    if (!res.ok) {
        throw new Error();
    }
    })
    .catch((err) => console.error(err));
  }

  /**
   * Saves edited quiz item.
   */
  function saveEditHandler(editQuizContent) {
    setQuizArr((prevState) => {
      const updatedQuizArr = [...prevState];
      updatedQuizArr[quizIndex] = editQuizContent;
      return updatedQuizArr;
    });

    saveUpdatedQuizToDB(editQuizContent);
    resetModal();
  }

  /**
   * Delete quiz object from quizArr state
   * @param {string} index
   */
  function deleteQuizHandler(index) {
    const quizId = quizArr[index].quizId;

    setQuizArr((prevState) => {
      // clone arr and remove object
      const updatedQuizArr = [...prevState];
      updatedQuizArr.splice(index, 1);

      return updatedQuizArr;
    });

    fetch("http://localhost:3000/api/quizzes", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topicId: id,
        quizId: quizId,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  function saveUpdatedQuizToDB(newQuiz) {
    fetch("http://localhost:3000/api/quizzes", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topicId: id,
        ...newQuiz,
      }),
    })
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
      <div className="flex items-center justify-between mx-auto mb-7">
        <span className="inline-block w-1/3">
          {quizArr.length} {quizArr.length === 1 ? "Frage" : "Fragen"}
        </span>
        <h1 className="text-center text-2xl">
          Thema {topic ? topic.topicName : ""}
        </h1>
        <div className="w-1/3 text-end">
          <PrimaryButton
            text="Neue Frage"
            clickHandler={() => openModal("create")}
          />
        </div>
      </div>

      {quizArr.map((item, index) => (
        <MultipleChoiceCard
          key={index}
          content={item}
          openModal={() => openModal("edit", index)}
          deleteQuizHandler={() => deleteQuizHandler(index)}
        />
      ))}

      {mode === "edit" ? (
        <EditMultipleChoiceModal
          initialContent={quizArr[quizIndex]}
          isOpen={modalIsOpen}
          closeModal={resetModal}
          saveEditHandler={saveEditHandler}
        />
      ) : (
        <CreateMultipleChoiceModal
          isOpen={modalIsOpen}
          closeModal={resetModal}
          saveNewHandler={saveNewHandler}
        />
      )}

    </>
  );
}

export default SingleTopicView;
