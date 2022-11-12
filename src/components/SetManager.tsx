import { useContext } from "react"
import { useQuizContext } from '../context/Quiz.context'

export const SetManager: React.FC<{}> = () => {
    const qc = useQuizContext()
    return <div style={{ display: 'flex', gap: 16 }}>
        <select onChange={(e) => qc.setSelectedQuestionSetKey(e.target.value)}>
            {Object.keys(qc.questionSets).map(k => <option selected={k == qc.selectedQuestionSetKey} value={k}>{k}</option>)}
        </select>
        <button onClick={() => qc.selectedQuestionSetKey && qc.loadQuestions(qc.selectedQuestionSetKey, parseInt(prompt("How many question do you want to add?", "30") || "30"))}>Download questions</button>
        <button onClick={() => qc.selectedQuestionSetKey && qc.clearQuestionSet(qc.selectedQuestionSetKey)}>Delete all questions in set</button>

    </div>
}