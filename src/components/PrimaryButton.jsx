export default function PrimaryButton({ text, clickHandler }) {
    return (
        <button onClick={clickHandler} className="bg-yellow-300 hover:bg-yellow-400 py-2 px-5 rounded-full">{text}</button>
    )
}