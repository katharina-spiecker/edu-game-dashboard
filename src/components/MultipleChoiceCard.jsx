export default function MultipleChoiceCard({ content }) {
    console.log(content)
    return (
        <div className="bg-white shadow shadow-slate-300 p-4 relative rounded-2xl mb-7">
            <div>{content.question}</div>
            {
                content.answers.map((answer, index) => 
                    <div 
                        className={answer.correct ? "correct-answer" : "answer"}
                        key={index}>
                        {answer.text}
                    </div>
                )
            }
            
        </div>
    )
}