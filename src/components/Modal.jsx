import PrimaryButton from "./PrimaryButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Modal({ isOpen, toggleModal, saveText }) {
  return (
    <>
      {isOpen && (
        <>
          <div
            className="opacity-50 bg-slate-900 fixed top-0 bottom-0 left-0 right-0"
            onClick={toggleModal}></div>

          <div className="bg-white shadow shadow-slate-300 rounded-2xl p-4 z-1 w-80 min-h-80 fixed top-40 left-1/2 -translate-x-1/2">

            <FontAwesomeIcon
              icon={faXmark}
              className="absolute top-4 right-4 hover:cursor-pointer"
              onClick={toggleModal}
            />

            <div className="absolute left-0 bottom-5 text-center w-full">
              <PrimaryButton text={saveText} clickHandler={toggleModal} />
            </div>
          </div>
        </>
      )}
    </>
  );
}
