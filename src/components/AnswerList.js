import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadQuestions, loadUsers } from '../actions';
import Question from './Question';
import Spinner from './Spinner';
import ChooseUser from './ChooseUser';

class Answers extends Component {
  state = {
    loading: true,
    questions: [],
    users: {},
    currentUser: null
  };

  componentDidMount() {
    const { getQuestions, getUsers } = this.props;

    getQuestions()
      .then(getUsers())
      .then(() => this.setState({ loading: false }));

  }

  render() {
    const { questions, users, currentUser } = this.props;
    const { loading } = this.state;

    if (loading) {
      return <Spinner />;
    }

    if (!currentUser) {
      return <ChooseUser />;
    }

    return (
      <ul>
        {Object.keys(users).length > 0 && questions.length > 0 ? (
          questions.filter(question => {
            return (question.optionOne.votes.includes(currentUser.id) || question.optionTwo.votes.includes(currentUser.id))
          }).map(question => (<li key={question.id}>
            <Question
              user={currentUser}
              question={question}
              author={users[question.author]}
            /></li>
          ))
        ) : (
            <div>
              No Answers are available. <br />
            </div>
          )}
      </ul>
    );
  }
}

const mapStateToProps = state => {
  return {
    questions: state.questions,
    users: state.users,
    currentUser: state.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getQuestions: () => dispatch(loadQuestions()),
    getUsers: () => dispatch(loadUsers())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Answers);
