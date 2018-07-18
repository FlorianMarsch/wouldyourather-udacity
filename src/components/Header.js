import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUser } from '../actions';
import { Link } from 'react-router-dom';

class Header extends Component {

  render() {
    const { currentUser } = this.props;
    return (
      <header>
        {currentUser && (
          <p >Hi {currentUser.name} - <button onClick={this.props.logout}>logout</button></p>
        )}
        <Link to="/">
          <h1>Would You Rather????</h1>
        </Link>
      </header>
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
    logout: () => dispatch(setUser(null)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
