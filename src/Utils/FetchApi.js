import {
    _getUsers,
    _getQuestions,
    _formatQuestion,
    _saveQuestion,
    _saveQuestionAnswer,
} from './_DATA.js'

export function getInitialData() {
    return Promise.all([
        _getUsers(),
        _getQuestions(),
    ]).then(([users, questions]) => ({
        users,
        questions,
    }))
}

export function formQuestion(data) {
    return _formatQuestion(data)
}

export function saveQuestion(data) {
    return _saveQuestion(data)
}

export function saveQuestionAnswer(data) {
    return _saveQuestionAnswer(data)
}