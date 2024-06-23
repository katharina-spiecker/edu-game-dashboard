import { useParams } from 'react-router-dom';
import data from "../assets/data.js";
import MultipleChoiceCard from "../components/MultipleChoiceCard.jsx";
import PrimaryButton from "../components/PrimaryButton.jsx";
import Modal from "../components/Modal.jsx";
import { useState } from "react";

export default function SingleTopicView() {
    const { id } = useParams();

    const topic = data.find((topic) => topic.id === id);

    const [modalIsOpen, setModalIsOpen] = useState(false);

    function toggleModal() {
        setModalIsOpen(!modalIsOpen);
    }

    return (
        <>
            <div className="flex items-center justify-between mx-auto mb-7">
                <span className="inline-block w-1/3">
                {topic.quiz.length} {topic.quiz.length === 1 ? "Frage" : "Fragen"}
                </span>
                <h1 className="text-center text-2xl">Thema {topic.topicName}</h1>
                <div className="w-1/3 text-end">
                    <PrimaryButton text="Neue Frage" clickHandler={toggleModal} />
                </div>
            </div>
            {
                topic.quiz.map((item, index) =>
                    <MultipleChoiceCard key={index} content={item} toggleModal={toggleModal} />
                )
            }
            <Modal isOpen={modalIsOpen} toggleModal={toggleModal} saveText="Änderungen speichern" />
        </>
    )
}