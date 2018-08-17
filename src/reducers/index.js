import { combineReducers } from 'redux';
import { loginEvent, initQuestionsEvent, initUsersEvent } from '../actions';

import { routerReducer } from 'react-router-redux'
import { handleActions } from 'redux-actions';

let reducer = handleActions({
  [loginEvent]: (state, action) => {
    return { ...state, user: action.payload }
  }, [initQuestionsEvent]: (state, action) => {
    return { ...state, questions: action.payload }
  }, [initUsersEvent]: (state, action) => {
    return { ...state, users: action.payload }
  },
}, { user: null, users: [], questions: [] });


export default combineReducers({ app: reducer, routing: routerReducer });
