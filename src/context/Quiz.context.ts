import React from 'react'
import { useContext } from 'react'
export interface IMultipleChoiceQuestion {

    question: string,
    correct_answer: string,
    incorrect_answers: string[]
    answers: string[]

}

export interface IQuizContext {
    currentQuestion: number,
    selectedQuestionSet: IMultipleChoiceQuestion[],
    selectedQuestionSetKey: string | undefined,
    questionSets: IQuestionSets,
    setCurrentQuestion: (number: number) => void,
    setSelectedQuestionSetKey: (questionSetKey: string) => void,
    updateQuestion: (questionSetKey: string, questionIndex: number, content: IMultipleChoiceQuestion) => void,
    addQuestion: (questionSetKey: string, content: IMultipleChoiceQuestion) => void,
    loadQuestions: (questionSetKey: string, numberOfQuestions: number) => Promise<void>,
    addQuestionSet?: (key: string) => void,
    clearQuestionSet: (key: string) => void,
    removeQuestion: (questionSetKey: string, questionIndex: number) => void,
    isSecondWindowEnabled: boolean,
    setIsSecondWindowEnabled: (b: boolean) => void,
    isAnswerDisplayed: boolean,
    setIsAnswerDisplayed: (b: boolean) => void,
    isPaused: boolean, setIsPaused: ((b: boolean) => void)
}

export interface IQuestionSets {
    [index: string]: IMultipleChoiceQuestion[]
}
export const QuizContext = React.createContext<IQuizContext>({
    currentQuestion: 0,
    selectedQuestionSet: [],
    selectedQuestionSetKey: undefined,
    questionSets: {},
    isAnswerDisplayed: false,
    setIsAnswerDisplayed: (b: boolean) => { },
    setCurrentQuestion: (number: number) => { },
    setSelectedQuestionSetKey: (questionSetKey: string) => { },
    updateQuestion: (questionSetKey: string, questionIndex: number, content: IMultipleChoiceQuestion) => { },
    loadQuestions: async (questionSetKey: string, numberOfQuestions: number = 30) => { },
    addQuestion: (questionSetKey: string, content: IMultipleChoiceQuestion) => { },
    addQuestionSet: (key: string) => { },
    clearQuestionSet: (key: string) => { },
    removeQuestion: (questionSetKey: string, questionIndex: number) => { },
    isSecondWindowEnabled: false,
    setIsSecondWindowEnabled: (b: boolean) => { },
    isPaused: false, setIsPaused: (b: boolean) => { }
})


export const useQuizContext = () => {
    return useContext(QuizContext)
}
