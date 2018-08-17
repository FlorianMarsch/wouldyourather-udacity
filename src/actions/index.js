import {
  _getQuestions,
  _getUsers,
  _saveQuestionAnswer,
  _saveQuestion
} from '../api/_data.js';

import { createAction } from 'redux-actions';

export const loginEvent = createAction('LOGIN');
export const initQuestionsEvent = createAction('INIT_QUESTIONS');
export const initUsersEvent = createAction('INIT_USERS');

export const login = (user) => {
  return dispatch => {
    return dispatch(loginEvent(user));
  };
};

export const logout = (user) => {
  return dispatch => {
    return dispatch(loginEvent(null));
  };
};

export const initQuestions = () => {
  return dispatch => {
    return _getQuestions().then(questions => {
      dispatch(initQuestionsEvent(questions));
    });
  };
};

export const initUsers = () => {
  return dispatch => {
    return _getUsers().then(users => dispatch(initUsersEvent(users)));
  };
};



export const saveAnswer = (user, qid, answer) => {
  return dispatch => {
    _saveQuestionAnswer({ authedUser: user.id, qid: qid, answer: answer }).then(response => {
      dispatch(initQuestions(response.questions));
      dispatch(initUsers(response.users));
    });
  };
};


export const saveQuestion = (question) => {
  return dispatch => {
    _saveQuestion(question).then(response => {
      dispatch(initQuestions(response.questions));
      dispatch(initUsers(response.users));
    });

  };
};




