import {
    _getUsers,
    _getQuestions,
    _saveQuestion,
    _saveQuestionAnswer,
} from '../_Data'

export function getInitialData() {
    return Promise.all([
        _getUsers(),
        _getQuestions(),
    ]).then(([users, questions]) => ({
        users,
        questions,
    })).catch((e)  =>
{
    console.log(e)
}
    )
}

export function saveQuestion(data) {
    return _saveQuestion(data)
}

export function saveQuestionAnswer(data) {
    return _saveQuestionAnswer(data)
}