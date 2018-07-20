import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadQuestions, loadUsers } from '../actions';
import Question from './Question';
import Spinner from './Spinner';
import ChooseUser from './ChooseUser';

class Questions extends Component {
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
    let openQuestions = questions.filter(question => {
      return !(question.optionOne.votes.includes(currentUser.id) || question.optionTwo.votes.includes(currentUser.id))
    }).sort((a, b) => {
      return a.timestamp < b.timestamp;
    });

    return (
      <ul>
        {Object.keys(users).length > 0 && openQuestions.length > 0 ? (
          openQuestions.map(question => (<li key={question.id}>
            <Question
              user={currentUser}
              question={question}
              author={users[question.author]}
            /></li>
          ))
        ) : (
            <div>
              No questions are available. <br />
              <em>Please ask a new question.</em>
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

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
