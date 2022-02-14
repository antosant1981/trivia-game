import React, { Component } from 'react';

class AnswerInfoPanel extends Component {
  render() {

    var answerInfoPanel = <div><p>Answered: {this.props.numOfAnswers} / {this.props.numOfQuestions} &nbsp;&#9679;&nbsp;Score: {this.props.score}</p></div>;

    if(this.props.isGameOver) {
    
      var gameOverPanel = <div><p>Game Over</p></div>;

      return(<div>{answerInfoPanel}{gameOverPanel}</div>);
    }

    return (<div>{answerInfoPanel}</div>);
  }
}

export default AnswerInfoPanel;
