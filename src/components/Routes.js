import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import QuestionList from './QuestionList';
import AnswerList from './AnswerList';
import Leaderboard from './Leaderboard';
import AddQuestion from './AddQuestion';



class Routes extends Component {
  render() {


    return (
      <Switch>
        <Route
          exact
          path="/"
          render={props => (
            <div>
              <QuestionList />
            </div>
          )}
        />
        <Route
          path="/answered"
          render={props => (
            <div>
              <h2>Answered</h2>
              <AnswerList />
            </div>
          )}
        />
        <Route
          path="/leaderboard"
          render={props => (
            <div>
              <h2>Leaderboard</h2>
              <Leaderboard />
            </div>
          )}
        />
        <Route
          path="/add"
          render={props => (
            <div>
              <h2>Add Question</h2>
              <AddQuestion />
            </div>
          )}
        />
      </Switch>
    );
  }
}

export default Routes;
