import React, { Component } from 'react';
import { connect } from 'react-redux';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
class LeaderboardView extends Component {
  state = {
    leaderboard: []
  };

  componentDidMount() {
    let leaderboard = Object.keys(this.props.users).map(key => {
      let user = this.props.users[key];
      let entry = { id: user.id, avatarURL: user.avatarURL, name: user.name, answers: Object.keys(user.answers).length, questions: user.questions.length };
      entry.score = entry.answers + entry.questions;
      return entry;
    }).sort((a, b) => {
      return a.answers === b.answers ? a.questions < b.questions : a.answers < b.answers;
    });
    this.setState({ leaderboard: leaderboard });
  }

  render() {
    return (
      <List>
        {
          this.state.leaderboard.map(user => {
            return (<ListItem key={user.id}>

              <Card style={{ display: 'flex' }}>
                <CardMedia
                  style={{ width: 150, height: 150, }}
                  image={user.avatarURL}
                  title={user.name}
                />
                <CardContent>
                  <Typography variant="headline">
                    {user.name}
                  </Typography>
                  <Typography variant="subheading" color="textSecondary">
                    Answers :{user.answers}
                  </Typography>
                  <Typography variant="subheading" color="textSecondary" >
                    Questions :{user.questions}
                  </Typography>
                </CardContent>
                <CardContent>
                  <Typography variant="headline">
                    Score:
                  </Typography>
                  <Avatar>
                    {user.score}
                  </Avatar>
                </CardContent>
              </Card>
            </ListItem>
            )
          })
        }
      </List>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.app.users
  };
};

const mapDispatchToProps = dispatch => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeaderboardView);
