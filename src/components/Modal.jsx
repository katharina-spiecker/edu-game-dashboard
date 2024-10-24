import PrimaryButton from "./PrimaryButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ReactNode } from 'react'; // used in jsdoc

/**
 * 
 * Diese Komponente stellt ein Modal und
 * seine grundlegenden Funktionen (öffnen, schließen) bereit.
 * Es gibt einen PrimaryButton für konfigurierbare Aktionen
 * (wie callback Funktion zum Speichern aufrufen).
 * Der weitere Inhalt des Modals wird durch das children prop geliefert
 * und kann somit an Aufrufstelle befüllt werden.
 * 
 * @component Modal
 * @param {boolean} isOpen Modal geöffnet oder geschlossen
 * @param {Function} closeModal Funktion, welche zum Schließen aufgerufen wird
 * @param {string} saveText Text welcher in dem PrimaryButton erscheint
 * @param {ReactNode} children Inhalt des Modals
 * @param {Function} saveHandler Funktion, welche beim Klick auf den PrimaryButton aufgerufen wird
 * @returns {JSX.Element} Modal Komponente
 */
function Modal({ isOpen, closeModal, saveText, children, saveHandler }) {
  return (
    <>
      {isOpen && (
        <>
          <div
            className="opacity-50 bg-slate-900 fixed top-0 bottom-0 left-0 right-0"
            onClick={closeModal}></div>

          <div className="bg-white shadow shadow-slate-300 rounded-2xl p-4 z-1 min-w-80 min-h-80 fixed top-0 mx-4 mx-auto left-1/2 -translate-x-1/2 md:w-96 pb-20">
            <FontAwesomeIcon
              icon={faXmark}
              className="absolute top-4 right-4 hover:cursor-pointer"
              onClick={closeModal}
            />

            {children}

            <div className="absolute left-0 bottom-5 text-center w-full">
              <PrimaryButton text={saveText} clickHandler={saveHandler} />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Modal;