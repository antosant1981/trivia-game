import React, { Component } from "react";
import ResponsFeedbackViewer from "./ResponseFeedbackViewer";
import AnswerInfoPanel from "./AnswerInfoPanel";

class QuestionForm extends Component {
  render() {
    var question = this.props.question;
    var numOfAnswers = this.props.numOfAnswers;
    var score = this.props.score;
    var numOfQuestions = this.props.numOfQuestions;
    var currentQuestionNumber = this.props.currentQuestionPosix + 1;

    var isNextButtonDisabled = question.checkedOption == null || currentQuestionNumber === numOfQuestions; 
    var isPreviousButtonDisabled = this.props.currentQuestionPosix === 0;

    var isGameOver = this.props.isGameOver;

    var isGameSaved = this.props.isGameSaved;

    if(isGameOver) {
      var saveButton = <button disabled={isGameSaved} onClick={this.props.handleOpenSavingPlayerModal}>Save</button>;
      var showLeaderboard = <button onClick={this.props.handleOpenLeaderboardModal}>Leaderboard</button>;
      var playAgain = <button onClick={this.props.handlePlayAgain}>Play Again</button>;
    }


    return (
      <div>
        <h3>Question number: {currentQuestionNumber}</h3>
        <fieldset disabled={question.checkedOption != null}>
          <p>
            Category: {question.category} &nbsp;&#9679;&nbsp;Difficulty:{" "}
            {question.difficulty}
          </p>
          <p>{question.question}</p>
          {question.options.map((option) => (
            <div key={option}>
              <input
                type="radio"
                name="dynamic-radio"
                value={option}
                checked={question.checkedOption === option}
                onChange={this.props.handleRadioChange}
              />
              <label>{option}</label>
            </div>
          ))}
          <div>
            <ResponsFeedbackViewer
              feedback={question.isCorrectAnswer}
              isCheckedOption={question.checkedOption !== null}
              numOfAnswers={numOfAnswers}
              score={score}
              numOfQuestions={numOfQuestions}
            />
          </div>
          <div>
            <AnswerInfoPanel numOfAnswers={numOfAnswers} numOfQuestions={numOfQuestions} score={score} isGameOver={isGameOver}/>
          </div>
        </fieldset>
        <p>
          <button onClick={this.props.handlePreviousChange} disabled={isPreviousButtonDisabled}>Previous</button>
          &nbsp;&nbsp;&nbsp;
          <button onClick={this.props.handleNextChange} disabled={isNextButtonDisabled}>Next</button>
          &nbsp;&nbsp;&nbsp;
          {saveButton}
          &nbsp;&nbsp;&nbsp;
          {showLeaderboard}
          &nbsp;&nbsp;&nbsp;
          {playAgain}
        </p>
      </div>
    );
  }
}

export default QuestionForm;