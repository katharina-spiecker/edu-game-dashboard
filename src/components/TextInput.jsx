
/**
 * TextInput component
 * 
 * Diese Komponente stellt ein Text Inputfeld bereit.
 * 
 * @component
 * @param {string} label 
 * @param {number} id
 * @param {string} defaultValue
 * @param {Function} changeHandler
 */
export default function TextInput({ label, id, defaultValue, changeHandler }) {
    return (
        <>
            <label htmlFor={id} className="block pb-2">{label}</label>
            <input
                type="text"
                defaultValue={defaultValue}
                id={id} 
                onChange={(event) => changeHandler(event.target.value)}
                className="block w-full rounded-md border-0 py-1 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 mb-4"/>
        </>
    )
}