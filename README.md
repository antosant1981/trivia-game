# Trivia game

# Table of Contents
1. [Introduction](#Introduction)
2. [User interface and rules](#user-interface-and-rules)
3. [Architecture and technical aspects](#architecture-and-technical-aspects)
4. [Install](#Install)

## Introduction
Amazing game based on trivia questions where each player can measure his/her ability against other players (and against himself/herself) and demonstrate his/her knowledge level. There is the possibility for each player to record the best score achieved at the end of each game. A single game consists of a fixed number of 10 questions.  

## User interface and rules
Once the user interface is displayed, it is possible for the player to start answering. Each question has a score according to its level of difficulty: 
- 1 easy;
- 2 medium;
- 3 hard.
Once answered a question, if the answer is correct, the corresponding score is added up to the total game score which appears along with the number of answers provided until that moment.
Be careful! Once answered a question, it is not possible to change your answer.
Previuos and Next buttons are available in order to navigate a player's game panel: Next allows a player to go head with the next available question; Previous allows a player to come back and check the previous already answered questions.
While navigating the Previous button, the current score and the current number of answers provided don't change.      
At the end of the game, when a player answers the question number 10, three buttons are displayed: 
- Save ;
- Leaderboard;
- Play again.  

Save provides the ability to save a player into a permanent storage. A simple mask is displayed asking for a username and password. Once submitted the form:
- the system checks if a user with the typed username already esists into the storage;
- if it exists but the password provided is different from the existing one, for simplicity of design, the old password value is overwritten with the new one;
- if the score achieved at the end of the current game is greater than the stored one (best score achieved until that moment), the user best score is updated accordingly. 

Leaderboard provides a ranking with the top ten players ordered by score, from the greater to the lower one.

Play again provides the ability to start a new game, in this case a new set of 10 questions will be automatically reloaded. 

## Architecture and technical aspects
Trivia game has been designed as a microservice based architecture with:
- a front-end component written in *React*, called **game-ui**, responsible to define the user interface and manage the interactive behaviour of the game.
- a back-end microservice written in *Node.js*, called **players-manager**, responsible to manage all the backend-aspects related to the players world. It is designed to isolate the logic related to the players management into its boundend context and it is designed with the **API first** approach in mind. Indeed, it exposes a complete set of REST APIs wich make simple the intergation with third party systems and applications.      
- a data storage component which is a **pouchdb** instance, a NO-SQL lightweight database. Since we don't need a relational data model and players related information can easily be represented and retained in a JSON-like format, this is a really good choise.     

## Install
The only requirement for running application is having Docker installed on your host machine.
Microservices will be instantiated as Docker containers and maaged by Docker compose. 

After cloning the project workspace, open a console, navigate the project root and just launch: 

```sh
docker-compose up
```

Have a look at the console's log in order to check if containers are correctly set-up.