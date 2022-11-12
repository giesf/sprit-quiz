import axios from "axios";
import React, { useState } from "react"
import { useStatePersist } from "use-state-persist";
import he from 'he'
import { IMultipleChoiceQuestion, IQuestionSets, QuizContext } from '../context/Quiz.context'

export const QuizRoot: React.FC<React.PropsWithChildren> = ({ children }) => {

    const [questionSets, setQuestionSets] = useStatePersist<IQuestionSets>("@questionSets", { "Set 1": [], "Set 2": [], "Set 3": [] })
    const [currentQuestion, setCurrentQuestion] = useStatePersist<number>("@currentQuestion", 0)


    const [selectedQuestionSetKey, setSelectedQuestionSetKey] = useStatePersist<string | undefined>("@selectedQuestionSet", "Set 1")
    const selectedQuestionSet = selectedQuestionSetKey ? questionSets[selectedQuestionSetKey] || [] : []

    const [isSecondWindowEnabled, setIsSecondWindowEnabled] = useStatePersist("@secondWindow", false);
    const [isPaused, setIsPaused] = useStatePersist("@isPaused", false)
    const [isAnswerDisplayed, setIsAnswerDisplayed] = useStatePersist<boolean>("@isAnswerDisplayed", false)



    const clearQuestionSet = (key: string) => setQuestionSets(qsets => ({ ...qsets, ...{ [key]: [] } }))

    const updateQuestion = (questionSetKey: string, questionIndex: number, content: IMultipleChoiceQuestion) => {
        if (typeof questionSets[questionSetKey] == 'undefined') questionSets[questionSetKey] = []
        setQuestionSets((prevQuestionSets) => {
            const nextQuestionSets = { ...prevQuestionSets }
            nextQuestionSets[questionSetKey] = nextQuestionSets[questionSetKey].map((c, i) => {
                if (i == questionIndex) return content
                return c
            })

            return nextQuestionSets
        })
    }

    const loadQuestions = async (questionSetKey: string, numberOfQuestions: number = 30) => {

        const apiURL = `https://opentdb.com/api.php?amount=${numberOfQuestions}&difficulty=medium&type=multiple`
        const loadedQuestions = (await axios.get(apiURL)).data.results
        if (typeof questionSets[questionSetKey] == 'undefined') questionSets[questionSetKey] = []

        setQuestionSets((prevQuestionSets) => {
            const nextQuestionSets = { ...prevQuestionSets }
            nextQuestionSets[questionSetKey] = [...nextQuestionSets[questionSetKey], ...loadedQuestions.map((q: any, i: number) => {
                const incorrect_answers = q.incorrect_answers.map((a: string) => he.decode(a))
                const { correct_answer, question } = q
                const answers = [...[he.decode(correct_answer)], ...incorrect_answers].sort(() => Math.random() - 0.5)

                return { question: he.decode(question), correct_answer: he.decode(correct_answer), incorrect_answers: incorrect_answers, answers: answers }
            })]

            return nextQuestionSets
        })

    }

    const addQuestion = (questionSetKey: string, content: IMultipleChoiceQuestion) => {
        if (typeof questionSets[questionSetKey] == 'undefined') questionSets[questionSetKey] = []
        setQuestionSets((prevQuestionSets) => {
            const nextQuestionSets = { ...prevQuestionSets }
            nextQuestionSets[questionSetKey].push(content)
            return nextQuestionSets
        })

    }

    const removeQuestion = (questionSetKey: string, questionIndex: number) => {
        if (typeof questionSets[questionSetKey] == 'undefined') questionSets[questionSetKey] = []
        setQuestionSets((prevQuestionSets) => {
            const nextQuestionSets = { ...prevQuestionSets }
            nextQuestionSets[questionSetKey] = nextQuestionSets[questionSetKey].filter((q, i) => i != questionIndex)

            return nextQuestionSets
        })
    }


    return <QuizContext.Provider value={{ isPaused, setIsPaused, isAnswerDisplayed, setIsAnswerDisplayed, isSecondWindowEnabled, setIsSecondWindowEnabled, clearQuestionSet, removeQuestion, questionSets, selectedQuestionSetKey, setSelectedQuestionSetKey, currentQuestion, addQuestion, loadQuestions, selectedQuestionSet, setCurrentQuestion, updateQuestion }}>{children}</QuizContext.Provider>
}


