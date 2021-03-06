import { getInitialData } from '../Utils/FetchApi'
import { receiveUsers } from '../actions/users'
import { showLoading, hideLoading } from 'react-redux-loading'
import { receiveQuestions } from './questions'

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
