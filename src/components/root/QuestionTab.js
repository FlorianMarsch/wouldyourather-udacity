import React, { Component } from 'react';
import PullListElement from './PullListElement';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

class QuestionTab extends Component {
  state = {
    questions: []
  };

  componentWillUpdate() {
    /*
    prevent from permanently re render this component thru setState
    */
    this.setState((state, props) => {
      state.questions = this.initData();
      return null;
    });
  }

  componentDidMount() {
    this.setState({ questions: this.initData() })
  }



  initData = () => {
    if (this.props.questions) {


      let user = this.props.user;


      let filteredQuestions = Object.keys(this.props.questions).map(key => { return this.props.questions[key] }).filter(question => {
        return !(question.optionOne.votes.includes(user.id) || question.optionTwo.votes.includes(user.id))
      }).sort((a, b) => {
        return a.timestamp < b.timestamp;
      });
      return filteredQuestions;

    }
  }

  render() {
    return (
      <List>
        {
          this.state.questions.map(question => (<ListItem key={question.id}>
            <PullListElement
              question={question}
              author={this.props.users[question.author]}
            /></ListItem>
          ))
        }
      </List>
    );
  }
}

export default QuestionTab;
