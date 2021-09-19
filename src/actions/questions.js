import { saveQuestion, saveQuestionAnswer } from '../Utils/FetchApi'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const SAVE_QUESTION = 'SAVE_QUESTION'
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER'

function addQuestion ({ id, authedUser }) {
  return {
    type: SAVE_QUESTION,
    id,
    authedUser,
  }
}
function addQuestionAnswer ({ id, authedUser }) {
  return {
    type: SAVE_QUESTION_ANSWER,
    id,
    authedUser,
  }
}


export function handleAddQuestion (text) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(showLoading())

    return saveQuestion({
      text,
      author: authedUser,
    })
      .then((question) => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()))
  }
}
export function handleAddQuestionAnswer (text) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(showLoading())

    return saveQuestionAnswer({
      text,
      author: authedUser,
    })
      .then((questionAnswer) => dispatch(addQuestionAnswer(questionAnswer)))
      .then(() => dispatch(hideLoading()))
  }
}
export function receiveQuestions (tweets) {
  return {
    type:RECEIVE_QUESTIONS,
    tweets,
  }
}


// export function handleToggleTweet (info) {
//   return (dispatch) => {
//     dispatch(toggleTweet(info))

//     return saveLikeToggle(info)
//       .catch((e) => {
//         console.warn('Error in handleToggleTweet: ', e)
//         dispatch(toggleTweet(info))
//         alert('The was an error liking the tweet. Try again.')
//       })
//   }
// }