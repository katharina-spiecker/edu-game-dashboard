/**
 * PrimaryButton component
 * 
 * Diese Komponente generiert einen Button in der Primärfarbe
 * der Applikation und sollte verwendet werden, wenn die Standard
 * Button Optik gefordert ist.
 * 
 * @component
 * @param {string} text 
 * @param {Function} clickHandler
 */
export default function PrimaryButton({ text, clickHandler }) {
    return (
        <button onClick={clickHandler} className="bg-yellow-300 hover:bg-yellow-400 py-2 px-5 rounded-full">{text}</button>
    )
}