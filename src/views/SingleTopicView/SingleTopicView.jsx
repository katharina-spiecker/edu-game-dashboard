import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import MultipleChoiceCard from "./components/MultipleChoiceCard.jsx";
import EditMultipleChoiceModal from "./components/EditMultipleChoiceModal.jsx";
import CreateMultipleChoiceModal from "./components/CreateMultipleChoiceModal.jsx";
import PrimaryButton from "../../components/PrimaryButton.jsx";
import HeadingContainer from "../../components/HeadingContainer.jsx";

/**
 * Die Komponente generiert eine Seite, welche alle Fragen und Antworten zu einem bestimmten Thema anzeigt.
 * 
 * @component
 * @returns {JSX.Element} Die SingleTopicView Komponente.
 */
function SingleTopicView() {
  const { id } = useParams();

  const [topic, setTopic] = useState(null);
  const [quizArr, setQuizArr] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [mode, setMode] = useState(null);
  const [quizIndex, setQuizIndex] = useState(null);
  const [editNameActive, setEditNameActive] = useState(false);

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

    resetModal();

    fetch(`http://localhost:3000/api/topics/${id}/quizzes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: newMultipleChoiceQuiz.question,
        answers: newMultipleChoiceQuiz.answers
      })
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error();
        }
        return res.json();
    })
    .then(data => {
        // API returns new quiz: add to state
        setQuizArr((prevState) => {
            return [...prevState, data];
        });
    })
    .catch((err) => console.error(err));
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

    fetch(`http://localhost:3000/api/topics/${id}/quizzes/${quizId}`, { method: "DELETE" })
    .then((res) => {
    if (!res.ok) {
        throw new Error();
    }
    })
    .catch((error) => console.error(error.message));
  }

  /**
   * Saves edited quiz item.
   */
  function saveEditHandler(editQuizContent) {
    fetch(`http://localhost:3000/api/topics/${id}/quizzes/${editQuizContent.quizId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: editQuizContent.question,
        answers: editQuizContent.answers
      })
    })
    .then((res) => {
        if (res.ok) {
            // success: aktualisiere Frontend
            setQuizArr((prevState) => {
                const updatedQuizArr = [...prevState];
                updatedQuizArr[quizIndex] = editQuizContent;
                return updatedQuizArr;
            });
            resetModal();
        } else {
            throw new Error();
        }
    })
    .catch((error) => {
        console.error(error.message);
    });
  }

  function editNameHandler(event) {
    const newName = event.target.value;

    fetch(`http://localhost:3000/api/topics/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topicName: newName
      })
    })
    .then((res) => {
        if (res.ok) {
            setTopic(prev => {
                return {...prev, topicName: newName}
            })
            setEditNameActive(false);
        } else {
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
          {quizArr.length} {quizArr.length === 1 ? "Frage" : "Fragen"}
        </span>
        <div className="relative">
            {
                editNameActive ? (
                  <input type="text" onBlur={editNameHandler} />
                ) : (
                   <h1 className="md:text-center text-2xl">
                    {topic ? topic.topicName : "Thema"}
                   </h1>
                )
            }
            <FontAwesomeIcon
                icon={faPenToSquare}
                className="topic-name-edit__icon absolute hover:cursor-pointer"
                onClick={() => setEditNameActive(true)}
            />
        </div>

        <div className="mt-2 md:mt-0 md:w-1/3 md:text-end">
          <PrimaryButton
            text="Neue Frage"
            clickHandler={() => openModal("create")}
          />
        </div>
       </HeadingContainer>

      <section>
        {
            quizArr.map((item, index) => (
                <MultipleChoiceCard
                key={index}
                content={item}
                openModal={() => openModal("edit", index)}
                deleteQuizHandler={() => deleteQuizHandler(index)}
                />
            ))
        }
      </section>

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
