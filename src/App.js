import React, { Component } from 'react';
import { connect } from 'react-redux';

import Login from './components/Login';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';

import Button from '@material-ui/core/Button';

import { initQuestions, initUsers, logout } from './actions';


class App extends Component {

  componentDidMount() {

    this.props.dispatchInitQuestions();

    this.props.dispatchInitUsers();


  }

  render() {

    let user = this.props.user;

    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <NavLink exact to="/" >
              <MenuItem>

                <Typography variant="title" color="inherit">
                  Home
                </Typography>

              </MenuItem>
            </NavLink>
            <NavLink to="/add" >
              <MenuItem>
                <Typography variant="title" color="inherit">
                  New Question
                </Typography>
              </MenuItem>
            </NavLink>
            <NavLink to="/leaderboard">
              <MenuItem>
                <Typography variant="title" color="inherit">
                  Leaderboard
                </Typography>
              </MenuItem >
            </NavLink>

            {
              user ? (
                <MenuItem>
                  <Typography variant="title" color="inherit">Hello {user.name}</Typography>
                  <Avatar>
                    <img style={{ width: '50px' }} src={user.avatarURL} alt={user.name} />
                  </Avatar>
                  <Button variant="outlined" color="primary" onClick={this.props.dispatchLogout}>logout</Button>
                </MenuItem>
              ) : (<div />)
            }

          </Toolbar >
        </AppBar >

        {
          user ?
            <div>
              {this.props.children}
            </div>
            : <Login />
        }

      </div >
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
    dispatchInitQuestions: () => { dispatch(initQuestions()) },
    dispatchInitUsers: () => { dispatch(initUsers()) },
    dispatchLogout: () => dispatch(logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
