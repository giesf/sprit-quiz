import NewWindow from 'react-new-window'
import { Question } from "./Question"
import { ErrorBoundary } from "./ErrorBoundary"

import {useQuizContext} from '../context/Quiz.context'

export const ExternalWindow: React.FC<{}> = () => {
    const qc = useQuizContext()

    return <>
        {qc.isSecondWindowEnabled && <NewWindow>
            <ErrorBoundary>
                <Question />
            </ErrorBoundary>
        </NewWindow>}
    </>
}