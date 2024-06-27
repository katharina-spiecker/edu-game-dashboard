import { useParams } from 'react-router-dom';
import data from "../assets/data.js";
import MultipleChoiceCard from "../components/MultipleChoiceCard.jsx";
import PrimaryButton from "../components/PrimaryButton.jsx";
import Modal from "../components/Modal.jsx";
import { useState } from "react";
import TextInput from '../components/TextInput.jsx';

export default function SingleTopicView() {
    const { id } = useParams();

    const topic = data.find((topic) => topic.id === id);

    const [modalIsOpen, setModalIsOpen] = useState(false);

    // const [answers, setAnswers] = useState([]);
    const [question, setQuestion] = useState("");
    const [mode, setMode] = useState(null);
    const [editContent, setEditContent] = useState(null);

    function openModal(mode = "", index = null ) {
        if (mode === "edit") {
            // set correct object to editModal
            setEditContent(topic.quiz[index]);
        }
        setMode(mode);
        setModalIsOpen(true);
    }

    function closeModal() {
        setModalIsOpen(false);
        setMode(null);
        setEditContent(null);
    }

    return (
        <>
            <div className="flex items-center justify-between mx-auto mb-7">
                <span className="inline-block w-1/3">
                {topic.quiz.length} {topic.quiz.length === 1 ? "Frage" : "Fragen"}
                </span>
                <h1 className="text-center text-2xl">Thema {topic.topicName}</h1>
                <div className="w-1/3 text-end">
                    <PrimaryButton text="Neue Frage" clickHandler={() => openModal("create")} />
                </div>
            </div>
            {
                topic.quiz.map((item, index) =>
                    <MultipleChoiceCard key={index} content={item} openModal={() => openModal("edit", index)} />
                )
            }
            {/* new question modal */}
            {
                mode === "edit" && editContent ? (
                    <Modal isOpen={modalIsOpen} closeModal={closeModal} saveText="Änderungen Speichern">
                        <h3>Frage bearbeiten</h3>
                        <TextInput id="question" label="Frage" value={editContent.question} />
                        {
                            editContent.answers.map((answer, index) => 
                                <TextInput key={index} id={"antwort-" + (index + 1)} label={"Antwort " + (index + 1)} value={answer.text} />
                            )
                        }
                    </Modal>
                ) : (
                    <Modal isOpen={modalIsOpen} closeModal={closeModal} saveText="Speichern">
                        <h3>Frage hinzufügen</h3>
                        <TextInput id="question" label="Frage" value={question} />
                    </Modal>
                )
            }
        </>
    )
}