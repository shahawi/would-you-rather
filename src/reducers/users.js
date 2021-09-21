import { RECEIVE_USERS } from '../actions/users'
import { SAVE_QUESTION, SAVE_QUESTION_ANSWER } from '../actions/questions';

export default function users (state = {}, action) {
  switch(action.type) {
    case RECEIVE_USERS :
      return {
        ...state,
        ...action.users
      }
      case SAVE_QUESTION_ANSWER:
        const authedUser = action.authedUser;
        const qid = action.qid;
        const answer = action.answer;
        return {
          ...state,
          [authedUser]: {
            ...state[authedUser],
            answers: {
              ...state[authedUser].answers,
              [qid]: answer
            }
          }
        };
        case SAVE_QUESTION:
          const { author, id } = action.question;
          return {
            ...state,
            [author]: {
              ...state[author],
              questions: [...state[author].questions, id]
            }
          };
    default :
      return state
  }
}