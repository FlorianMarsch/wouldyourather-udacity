import React, { Component } from 'react';
import { connect } from 'react-redux';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import QuestionTab from './QuestionTab';
import AnswerTab from './AnswerTab';
class RootView extends Component {

    state = {
        tab: 0
    }

    handleChange = (event, value) => {
        this.setState({ tab: value });
    };

    render() {
        return (
            <div>
                <Tabs value={this.state.tab} onChange={this.handleChange}>
                    <Tab label="unanswered Questions" /> {/* tab :0 */}
                    <Tab label="answered Questions" /> {/* tab : 1 */}
                </Tabs>
                {this.state.tab === 0 && <QuestionTab user={this.props.user} users={this.props.users} questions={this.props.questions} />}
                {this.state.tab === 1 && <AnswerTab user={this.props.user} users={this.props.users} questions={this.props.questions} />}
            </div>
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
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(RootView);
