import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveAnswer } from '../../actions';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class Question extends Component {




  answer = (answer) => {
    const { user } = this.props;
    this.props.dispatchSaveAnswer(user, this.props.question.id, answer);
    this.setState({
      ...this.state,
      question: {
        ...this.props.question,
        [answer]: {
          ...this.props.question[answer],
          votes: this.props.question[answer].votes.concat(user.id)
        }
      }
    });
  }


  render() {

    const { question } = this.props;




    return (
      <div >


        <Card style={{ display: 'flex' }}>

          <CardContent>
            <Typography variant="headline">Would you rather</Typography>
            <div >

              <Button variant="outlined" color="primary" onClick={() => this.answer('optionOne')}>
                {question.optionOne.text}
              </Button>

              or

                <Button variant="outlined" color="primary" onClick={() => this.answer('optionTwo')}>
                {question.optionTwo.text}
              </Button>

            </div>
          </CardContent>

        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.app.user
  };
};

const mapDispatchToProps = dispatch => {
  return {

    dispatchSaveAnswer: (user, qid, answer) => dispatch(saveAnswer(user, qid, answer))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);