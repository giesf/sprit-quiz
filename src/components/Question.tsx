import { useContext, useMemo } from "react"
import { Logo } from "./Logo"
import {useQuizContext} from '../context/Quiz.context'
export const Question: React.FC<{}> = () => {
    const qc = useQuizContext()

    const { correct_answer, answers, question } = qc.selectedQuestionSet[qc.currentQuestion]
    const characters = "ABCDEFGH"

    return <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <Logo />
        <p style={{ marginTop: '8vh', color: '#fff', fontWeight: 'bold', padding: '1vh', border: '0.4vh #fff solid', borderRadius: '100%', fontSize: '2vh' }}>{qc.currentQuestion + "/" + (qc.selectedQuestionSet.length - 1)}</p>
        <b style={{ fontSize: '6vh', color: '#fff', maxWidth: '60%', textAlign: 'center', marginBottom: '5vh' }}> {qc.isPaused ? "We'll be right back..." : question}</b>

        {!qc.isPaused && <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gridTemplateRows: "repeat(2, 1fr)",
            gridColumnGap: 16,
            gridRowGap: 16,
            maxWidth: '70%',
        }}>
            {answers.map((a, index) => <div style={{
                background: qc.isAnswerDisplayed ? a == correct_answer ? 'white' : '#BC2025' : 'white',
                color: qc.isAnswerDisplayed ? a == correct_answer ? '#108342' : 'white' : '#108342',
                fontSize: '4vh',
                padding: '1vh 1.5vh',
                borderRadius: '1vh',
                fontWeight: (qc.isAnswerDisplayed && a == correct_answer) ? 'bold' : 'normal',
            }}>{characters[index] + ')'} {a}</div>)}
        </div>}
    </div>
}