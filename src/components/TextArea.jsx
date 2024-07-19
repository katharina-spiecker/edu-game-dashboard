
/**
 * TextArea component
 * 
 * Diese Komponente stellt ein Text Eingabe Feld bereit.
 * 
 * @component
 * @param {string} label Kurzbeschreibung des erwarteten Inputs
 * @param {number} id id für Zuordnung zu Label
 * @param {string} defaultValue Text Standardwert
 * @param {Function} changeHandler wird beim change Event aufgerufen
 */
function TextArea({ label, id, defaultValue, changeHandler }) {
    return (
        <div className="w-full">
            <label htmlFor={id} className="block pb-1">{label}</label>
            <textarea
                defaultValue={defaultValue}
                id={id} 
                onChange={(event) => changeHandler(event.target.value)}
                className="block w-full rounded-md border-0 py-1 text-gray-900 mb-2"/>
        </div>
    )
}

export default TextArea;