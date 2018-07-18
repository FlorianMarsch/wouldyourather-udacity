import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadQuestions, loadUsers, saveQuestion } from '../actions';
import ChooseUser from './ChooseUser';

class AddQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
    author: null,
    currentUser: null
  };



  render() {
    const { currentUser } = this.props;

    if (!currentUser) {
      return <ChooseUser />;
    }

    return (
      <div>
        <h3>Would you rather ..?</h3>

        Option One*
        <input type="text" value={this.state.optionOne} onChange={e => this.setState({ ...this.state, optionOne: e.target.value })} /><br />

        Option Two*
        <input type="text" value={this.state.optionTwo} onChange={e => this.setState({ ...this.state, optionTwo: e.target.value })} /><br />
        <button
          disabled={!(this.state.optionOne && this.state.optionTwo)}
          onClick={() => {

            let question = { optionOneText: this.state.optionOne, optionTwoText: this.state.optionTwo, author: currentUser.id };
            this.props.saveQuestion(question);
            this.setState({ ...this.state, optionOne: '', optionTwo: '' })
          }}>save</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getQuestions: () => dispatch(loadQuestions()),
    getUsers: () => dispatch(loadUsers()),
    saveQuestion: (question) => dispatch(saveQuestion(question))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddQuestion);