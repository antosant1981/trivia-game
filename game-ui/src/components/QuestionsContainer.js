import React, { Component } from 'react';
import axios from 'axios';
import QuestionForm from './QuestionForm';
import shuffleArray from '../utils/shuffleArray';
import SavingGamePlayerModal from './SavingGamePlayerModal';
import LeaderboardModal from './LeaderboardModal';

import player from '../services/player';

class QuestionsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: [], 
      index: 0, 
      numOfAnswers: 0, 
      score: 0, 
      isGameOver: false, 
      showSavingModal: false,
      username : null,
      password: null,
      isGameSaved: false,
      showLeaderboardModal: false,
      playersRanking: { data: []}
    };
    
    // question radio button
    this.handleRadioChange = this.handleRadioChange.bind(this);
    // previous button
    this.handlePreviousChange = this.handlePreviousChange.bind(this);
    // next button
    this.handleNextChange = this.handleNextChange.bind(this);

    // save modal
    this.handleOpenSavingPlayerModal = this.handleOpenSavingPlayerModal.bind(this);
    this.handleCloseSavingPlayerModal = this.handleCloseSavingPlayerModal.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmitPlayer = this.handleSubmitPlayer.bind(this);

    // play again (page reloading)
    this.handlePlayAgain = this.handlePlayAgain.bind(this);

    // leaderboard modal
    this.handleOpenLeaderboardModal = this.handleOpenLeaderboardModal.bind(this);
    this.handleCloseLeaderboardModal = this.handleCloseLeaderboardModal.bind(this);    
  }

  async componentDidMount() {
    const { data } = await axios.get("https://opentdb.com/api.php?amount=10");

    data.results.map((it) => {
      
      let option = [];
      
      Array.prototype.push.apply(option, it.incorrect_answers);
      option.push(it.correct_answer);
      // shuffle options randomly
      it.options = shuffleArray(option);

      it.isCorrectAnswer = false;

      it.checkedOption = null;

      return it;
    });

    this.setState({ items: data.results });
  }

  render() {
    let { items, index, numOfAnswers, score, isGameOver, showSavingModal, isGameSaved, showLeaderboardModal, playersRanking } = this.state;

    if (items && items.length > 0) {
      let question = items[index];

      return (
        <div>
          <QuestionForm
          question={question}
          numOfAnswers={numOfAnswers}
          score={score}
          numOfQuestions={items.length}
          currentQuestionPosix={index}
          isGameOver={isGameOver}
          handleRadioChange={this.handleRadioChange}
          handlePreviousChange={this.handlePreviousChange}
          handleNextChange={this.handleNextChange}
          handleOpenSavingPlayerModal={this.handleOpenSavingPlayerModal}
          handleOpenLeaderboardModal={this.handleOpenLeaderboardModal}
          handlePlayAgain={this.handlePlayAgain}
          isGameSaved={isGameSaved}
        />
        <SavingGamePlayerModal 
        showSavingModal={showSavingModal} 
        handleCloseSavingPlayerModal={this.handleCloseSavingPlayerModal} 
        handleUsernameChange={this.handleUsernameChange}
        handlePasswordChange={this.handlePasswordChange}
        handleSubmitPlayer={this.handleSubmitPlayer}
        />
        <LeaderboardModal
        showLeaderboardModal={showLeaderboardModal}
        handleCloseLeaderboardModal={this.handleCloseLeaderboardModal}
        playersRanking={playersRanking}  
        />
        </div>
      );
    } else {
      return (
        <div>
          <h3>Loading questions...</h3>
        </div>
      );
    }
  }

  handleRadioChange(e) {
    let { items, index, numOfAnswers, score, isGameOver } = this.state;

    items[index].checkedOption = e.target.value;

    numOfAnswers++;

    if(numOfAnswers === items.length) {

      isGameOver = true;
    }

    if (items[index].correct_answer === e.target.value) {
      
      items[index].isCorrectAnswer = true;

      score = score + this.getAnswerScore(items[index]);

    } else {

      items[index].isCorrectAnswer = false;

    }

    this.setState({
      items: items,
      index: index,
      numOfAnswers: numOfAnswers,
      score: score,
      isGameOver: isGameOver
    });
  }

  getAnswerScore(item) {

    switch(item.difficulty) {
      case 'easy': {
        return 1;
      }
      case 'medium': {
        return 2;
      }
      case 'hard': {
        return 3;
      }
      default: {
        return 0;
      }
    }
  }

  handlePreviousChange(e) {

    let { index } = this.state;

    if(index > 0) {
      this.setState({
        index: index - 1,
      });
    }
  }

  handleNextChange(e) {

    let { items, index } = this.state;

    if(index < items.length) {
      this.setState({
        index: index + 1,
      });
    }
  }

  handleOpenSavingPlayerModal () {
    this.setState({ showSavingModal: true });
  }
  
  handleCloseSavingPlayerModal () {
    this.setState({ showSavingModal: false });
  }

  async handleOpenLeaderboardModal () {
    
    let res;

    try {

      res = await player.findAll();

      this.setState({ showLeaderboardModal: true, playersRanking: res });
    
    } catch(error) {

    }
  }
  
  handleCloseLeaderboardModal () {
    this.setState({ showLeaderboardModal: false });
  }

  handlePlayAgain() {
    this.setState({ items: [], 
      index: 0, 
      numOfAnswers: 0, 
      score: 0, 
      isGameOver: false, 
      showSavingModal: false,
      isGameSaved: false 
    });
 
    this.componentDidMount();
  }

  async handleSubmitPlayer(e) {
    let {username, password, score } = this.state;

    try {

      await player.save({username, password, score});

      this.setState({ isGameSaved: true});

      this.handleCloseSavingPlayerModal();


    } catch(error) {

    }
}

  handleUsernameChange (e) {

    if(e) {
      this.setState({username: e.target.value});
    }
  }

  handlePasswordChange (e) {

    if(e) {
    this.setState({password: e.target.value});
    }
  }
}

export default QuestionsContainer;
