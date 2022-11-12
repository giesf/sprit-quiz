import { useContext } from "react"
import { useQuizContext } from '../context/Quiz.context'

export const QuestionTable: React.FC<{}> = () => {
    const qc = useQuizContext()
    return <>

        <table>
            <tbody>
                {qc.selectedQuestionSet.map((q, i) => <tr><td>{q.question}</td><td>{q.correct_answer}</td><td>{q.incorrect_answers.join(", ")}</td><td><button onClick={() => qc.selectedQuestionSetKey && qc.removeQuestion(qc.selectedQuestionSetKey, i)}>X</button></td></tr>)}

            </tbody>
        </table>
    </>
}