import {
  _getQuestions,
  _getUsers,
  _saveQuestionAnswer,
  _saveQuestion
} from './_data.js';

export const GET_USER = 'GETUSER';
export const GET_QUESTIONS = 'GETQUESTIONS';
export const GET_USERS = 'GETUSERS';

export const SET_USER = 'SETUSER';



export const setUser = (authedUser) => {
  return {
    type: SET_USER,
    authedUser
  };
};

export const saveAnswer = (authedUser, qid, answer) => {
  return dispatch => {
    return _saveQuestionAnswer({ authedUser: authedUser.id, qid: qid, answer: answer });
  };
};


export const saveQuestion = (question) => {
  return dispatch => {
    return _saveQuestion(question);
  };
};

// load questions
const getQuestions = questions => {
  return {
    type: GET_QUESTIONS,
    questions
  };
};

export const loadQuestions = () => {
  return dispatch => {
    return _getQuestions().then(response => {
      // convert questions to array
      const qIndices = Object.keys(response);
      const questions = qIndices.map(index => response[index]);
      dispatch(getQuestions(questions));
    });
  };
};

// load users
const getUsers = users => {
  return {
    type: GET_USERS,
    users
  };
};

export const loadUsers = () => {
  return dispatch => {
    return _getUsers().then(response => dispatch(getUsers(response)));
  };
};
