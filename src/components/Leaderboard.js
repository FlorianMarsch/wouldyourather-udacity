import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadQuestions, loadUsers } from '../actions';
import Spinner from './Spinner';
import ChooseUser from './ChooseUser';

class Leaderboard extends Component {
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
    const { users, currentUser } = this.props;
    const { loading } = this.state;

    if (loading) {
      return <Spinner />;
    }

    if (!currentUser) {
      return <ChooseUser />;
    }

    let leaderboard = Object.keys(users).map(key => {
      let user = users[key];
      return { name: user.name, answers: Object.keys(user.answers).length, questions: user.questions.length }
    }).sort((a, b) => {
      return a.answers === b.answers ? a.questions < b.questions : a.answers < b.answers;
    });

    return (
      <ol>
        {leaderboard.length > 0 ? (
          leaderboard.map(user => {
            return (<li key={user.name}>
              {user.name} - Answers :{user.answers} - Questions :{user.questions}</li>
            )
          })
        ) : (
            <div>
              No Players are available. <br />
            </div>
          )}
      </ol>
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

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);
