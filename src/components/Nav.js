import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Nav extends Component {
  render() {
    return (
      <nav >
        <li >
          <NavLink exact to="/" >
            Unanswered Questions
          </NavLink>
        </li>
        <li>
          <NavLink to="/answered" >
            Answered Questions
          </NavLink>
        </li>
        <li>
          <NavLink to="/leaderboard">
            Leaderboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/add" >
            Add Question
          </NavLink>
        </li>
      </nav>
    );
  }
}

export default Nav;
