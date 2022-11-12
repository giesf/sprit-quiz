import { useContext } from "react"
import { useQuizContext } from '../context/Quiz.context'


export const PlayControls: React.FC<{}> = () => {
    const qc = useQuizContext()


    const nextQuestion = () => {
        qc.setIsAnswerDisplayed(false)
        qc.setCurrentQuestion(qc.currentQuestion + 1)
    }
    const lastQuestion = () => {
        qc.setCurrentQuestion(qc.currentQuestion - 1)
        qc.setIsAnswerDisplayed(!qc.isAnswerDisplayed)
    }
    return <div style={{ backgroundColor: '#fff', padding: 16 }}>
        {qc.isPaused ? <button onClick={() => qc.setIsPaused(false)}>Unpause</button> : <button onClick={() => qc.setIsPaused(true)}>Pause</button>}
        <span> | </span>

        <button onClick={() => qc.setIsSecondWindowEnabled(!qc.isSecondWindowEnabled)}>Toggle external window (Currently: {qc.isSecondWindowEnabled ? 'ON' : 'OFF'})</button>

        <span> | </span>
        <button onClick={() => qc.setCurrentQuestion(parseInt(prompt("Go to...", "0") || "0"))} >Go to...</button>
        <span> | </span>


        {<button onClick={() => lastQuestion()} disabled={qc.currentQuestion <= 0}>Last question</button>}
        {qc.isAnswerDisplayed ?

            (qc.currentQuestion < qc.selectedQuestionSet.length - 1) && <button onClick={() => nextQuestion()}>Next question</button>
            : <button onClick={() => qc.setIsAnswerDisplayed(true)}>Show answer</button>

        }
        {qc.isAnswerDisplayed && <button onClick={() => qc.setIsAnswerDisplayed(false)}>Hide answer</button>}

    </div>
}