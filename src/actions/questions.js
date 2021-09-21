import { saveQuestion, saveQuestionAnswer } from '../Utils/FetchApi'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const SAVE_QUESTION = 'SAVE_QUESTION'
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER'

export function addQuestion ( question ) {
  return {
    type: SAVE_QUESTION,
    question
  }
}
export function addQuestionAnswer ( authedUser,
  qid,
  answer) {
  return {
    type: SAVE_QUESTION_ANSWER,
      authedUser, 
      qid,
      answer
 
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
export function handleAddQuestionAnswer ( authedUser,
  qid,
  answer) {
  return (dispatch, getState) => {

    dispatch(showLoading())

    return saveQuestionAnswer( authedUser,
      qid,
      answer)
      .then(() => dispatch(addQuestionAnswer(authedUser,
        qid,
        answer)))
      .then(() => dispatch(hideLoading()))
  }
}
export function receiveQuestions (questions) {
  return {
    type:RECEIVE_QUESTIONS,
    questions,
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