import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadQuestions, loadUsers } from '../actions';
import Spinner from './Spinner';
import ChooseUser from './ChooseUser';

class Details extends Component {
  state = {
    loading: true,
    question: null
  };

  componentDidMount() {
    const { getQuestions } = this.props;


    console.log(this.props);
    getQuestions()
      .then(() => this.setState({ loading: false, question: this.props.questions.filter(q => { return q.id === this.props.id })[0] }));

  }

  render() {
    const { currentUser } = this.props;
    const { loading, question } = this.state;

    console.log(question);

    if (loading) {
      return <Spinner />;
    }

    if (!currentUser) {
      return <ChooseUser />;
    }

    if (!question) {
      return <div>404</div>;
    }

    let all = question.optionOne.votes.length + question.optionTwo.votes.length;
    question.optionOne.percent = 100 / all * question.optionOne.votes.length;
    question.optionTwo.percent = 100 / all * question.optionTwo.votes.length;

    return (
      <div>
        <div>{question.id}</div>
        <br />
        <div>Would you rather</div><br />
        <div>{question.optionOne.text} - {question.optionOne.votes.length} votes - {question.optionOne.percent} %</div><br />
        <div>{question.optionTwo.text} - {question.optionTwo.votes.length} votes - {question.optionTwo.percent} %</div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Details);
