export default function TextInput({ label, id, value }) {
    return (
        <>
            <label htmlFor={id} className="block pb-2">{label}</label>
            <input
                type="text"
                value={value}
                id={id} 
                className="block w-full rounded-md border-0 py-1 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"/>
        </>
    )
}