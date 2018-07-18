import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUser, loadUsers } from '../actions';
import Spinner from './Spinner';

class ChooseUser extends Component {
  state = {
    loading: true,
    users: {},
    currentUser: null
  };

  componentDidMount() {
    this.props.getUsers().then(response => {
      this.setState({ users: response.users, loading: false });
    });
  }

  saveUser = (key, e) => {
    let matched = this.state.users[key];
    this.props.setCurrentUser(matched);
    this.setState({ loading: true });
  };

  render() {
    const { users, loading } = this.state;
    if (this.props.isOpen === false) return null;

    return (
      <div>


        <h1>Login</h1>


        {loading ? (
          <Spinner />
        ) : (
            <select onChange={e => this.saveUser(e.target.value, e)}>
              <option selected>choose</option>
              {Object.keys(users).map(key => {
                let user = users[key];
                return (

                  <option
                    key={user.id}
                    value={user.id}
                  >

                    {user.name}
                  </option>
                )
              })}
            </select>
          )}

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users,
    currentUser: state.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentUser: user => dispatch(setUser(user)),
    getUsers: () => dispatch(loadUsers())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChooseUser);
