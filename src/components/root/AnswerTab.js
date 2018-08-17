import React, { Component } from 'react';
import PullListElement from './PullListElement';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

class AnswersTab extends Component {
  state = {
    answered: []
  };

  componentDidMount() {

    if (this.props.questions) {


      let user = this.props.user;

      let answered = Object.keys(this.props.questions).map(key => { return this.props.questions[key] }).filter(question => {
        return (question.optionOne.votes.includes(user.id) || question.optionTwo.votes.includes(user.id))
      }).sort((a, b) => {
        return a.timestamp < b.timestamp;
      });

      this.setState({ answered: answered });
    }
  }


  render() {


    return (
      <List>

        {this.state.answered.map(question => (<ListItem key={question.id}>
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


export default AnswersTab
