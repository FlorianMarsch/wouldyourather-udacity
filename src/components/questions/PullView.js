import React, { Component } from 'react';
import { connect } from 'react-redux';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';


import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

import Question from './Question'
class PullView extends Component {




  render() {
    let question = this.props.questions[this.props.match.params.id];

    if (!question) {

      return <div>Your Question is not available (404)</div>;
    }

    let author = this.props.users[question.author];
    if (!(question.optionOne.votes.includes(this.props.user.id) || question.optionTwo.votes.includes(this.props.user.id))) {
      return <Question question={question} author={author} />
    }


    let all = question.optionOne.votes.length + question.optionTwo.votes.length;
    question.optionOne.percent = 100 / all * question.optionOne.votes.length;
    question.optionTwo.percent = 100 / all * question.optionTwo.votes.length;

    return (
      <div>
        <Card style={{ display: 'flex' }}>
          <CardMedia
            style={{ width: 150, height: 150, }}
            image={author.avatarURL}
            title={author.name}
          />
          <CardContent>
            <Typography variant="headline">Added by {author.name} </Typography>
            <Typography>{question.optionOne.text}</Typography>
            <Typography>{question.optionOne.votes.length} votes {question.optionOne.votes.includes(this.props.user.id) && (" including your choice")}</Typography>
            <Typography>{question.optionOne.percent}%</Typography>
            <LinearProgress variant="determinate" value={question.optionOne.percent} />

            <Typography>{question.optionTwo.text}</Typography>
            <Typography>{question.optionTwo.votes.length} votes {question.optionTwo.votes.includes(this.props.user.id) && (" including your choice")}</Typography>
            <Typography>{question.optionTwo.percent}%</Typography>
            <LinearProgress variant="determinate" value={question.optionTwo.percent} />
          </CardContent>

        </Card>


      </div>
    );
  }


}

const mapStateToProps = state => {
  return {
    questions: state.app.questions,
    users: state.app.users,
    user: state.app.user
  };
};

const mapDispatchToProps = dispatch => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PullView);
