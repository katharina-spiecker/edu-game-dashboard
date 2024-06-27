import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function MultipleChoiceCard({ content, openModal }) {
  
    return (
        <div className="bg-white shadow shadow-slate-300 p-4 relative rounded-2xl mb-7">
            <div className="font-bold mb-2 ms-5">{content.question}</div>
            {
                content.answers.map((answer, index) =>
                    <div className="flex mb-1" key={index}>
                        <span className="question-checkmark w-5">
                            {
                                answer.correct && <FontAwesomeIcon className="text-green-700" icon={faCheck} />
                            }
                        </span>
                        <span>
                            {answer.text}
                        </span>
                    </div>
                )
            }
            <FontAwesomeIcon
                icon={faPenToSquare}
                className="card__edit-icon absolute hover:cursor-pointer"
                onClick={openModal}
            />
            
        </div>
    )
}