import { getInitialData } from '../Utils/FetchApi'
import { receiveUsers } from '../actions/users'
import { setAuthedUser } from '../actions/authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'
import { receiveQuestions } from './questions'

// const AUTHED_ID = 'tylermcginnis'

export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData()
      .then(({ users, questions }) => {
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
        dispatch(hideLoading())
      })
  }
}
export function handleLogin (id) {
  return (dispatch) => {
    dispatch(showLoading())

dispatch(setAuthedUser(id))
      }
  }
