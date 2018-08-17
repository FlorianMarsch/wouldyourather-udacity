import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class PullListElement extends Component {





  render() {
    const { author, question } = this.props;
    return (

      <div >


        <Card style={{ display: 'flex' }}>


          <CardMedia
            style={{ width: 150, height: 150, }}
            image={author.avatarURL}
            title={author.name}
          />

          <CardContent>
            <Typography variant="headline">{author.name} asked</Typography>
            <Typography variant="subheading" color="textSecondary">
              Would You Rather
            </Typography>
            <Typography variant="subheading" color="textSecondary" >
              ... {question.optionOne.text} ...
            </Typography>
            <Link to={"/questions/" + question.id}>
              <Button variant="outlined" color="primary">
                view pull
                </Button>
            </Link>
          </CardContent>



        </Card>
      </div >
    );
  }
}


export default PullListElement;