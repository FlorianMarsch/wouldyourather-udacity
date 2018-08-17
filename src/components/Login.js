import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class Login extends Component {
  state = {
    selectedUser: ''
  };



  selectUser = (user) => {
    this.setState({ selectedUser: user });
  };

  render() {
    const { users } = this.props;

    return (
      <div>
        <Card >


          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              Welcome to Would you rather App!
          </Typography>
            <Typography component="p">
              Please Sign in to continue
          </Typography>

            <Select
              value={this.state.selectedUser ? this.state.selectedUser.id : ''}
              onChange={e => this.selectUser(users[e.target.value])}
              inputProps={{
                name: 'sign-in',
                id: 'sign-in',
              }}
            >
              <MenuItem value="">
                <em>select user</em>
              </MenuItem>
              {Object.keys(users).map(key => {
                let user = users[key];
                return (


                  <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
                )
              })}


            </Select>

          </CardContent>
          <CardActions>

            <Button variant="outlined" color="primary" onClick={() => {
              this.props.dispatchLogin(this.state.selectedUser);
            }}>
              Sign in
            </Button>

          </CardActions>
        </Card>
      </div>
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
    dispatchLogin: (user) => dispatch(login(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
