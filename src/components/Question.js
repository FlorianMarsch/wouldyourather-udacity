import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveAnswer } from '../actions';
import Spinner from './Spinner';

class Question extends Component {

  state = {
    question: null
  };

  componentDidMount() {
    const { question } = this.props;
    this.setState({ question: question });
  }

  answer = (answer) => {
    const { user } = this.props;
    this.props.saveAnswer(user, this.state.question.id, answer);
    this.setState({
      ...this.state,
      question: {
        ...this.state.question,
        [answer]: {
          ...this.state.question[answer],
          votes: this.state.question[answer].votes.concat(user.id)
        }
      }
    });
  }


  render() {
    const { question } = this.state;
    const { user, author } = this.props;

    if (!question) {
      return <Spinner />;
    }

    if (question.optionOne.votes.includes(user.id)) {
      return (<div >Yo would {question.optionOne.text}</div>);
    }
    if (question.optionTwo.votes.includes(user.id)) {
      return (<div >You would {question.optionTwo.text}</div>);
    }


    return (
      <div >
        <h2 >Would you rather</h2>
        <div >
          <button onClick={() => this.answer('optionOne')}>{question.optionOne.text}</button>
          or
          <button onClick={() => this.answer('optionTwo')}>{question.optionTwo.text}</button>
        </div>
        <div>
          <p>
            {author.name} asked this
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {

  };
};

const mapDispatchToProps = dispatch => {
  return {

    saveAnswer: (authedUser, qid, answer) => dispatch(saveAnswer(authedUser, qid, answer))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);