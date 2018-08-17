import React, { Component } from 'react';
import { connect } from 'react-redux';

import { saveQuestion } from '../../actions';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';


class AddPullView extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
  };



  render() {



    return (
      <Card>

        <CardContent>
          <Typography variant="headline" color="inherit">Would you rather ..?</Typography>
          <Typography variant="subheading" color="inherit">Option One *</Typography>
          <input type="text" value={this.state.optionOne} onChange={e => this.setState({ ...this.state, optionOne: e.target.value })} />
          <Typography variant="subheading" color="inherit">Option Two *</Typography>
          <input type="text" value={this.state.optionTwo} onChange={e => this.setState({ ...this.state, optionTwo: e.target.value })} />
        </CardContent>
        <CardActions>
          <Link to={"/"}>
            <Button
              variant="outlined" color="primary"
              disabled={!(this.state.optionOne && this.state.optionTwo)}
              onClick={() => {

                let question = { optionOneText: this.state.optionOne, optionTwoText: this.state.optionTwo, author: this.props.user.id };
                this.props.dispatchSaveQuestion(question);
                this.setState({ optionOne: '', optionTwo: '' });

              }}>
              save
          </Button>
          </Link>
        </CardActions>
      </Card>
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
    dispatchSaveQuestion: (question) => dispatch(saveQuestion(question))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPullView);
