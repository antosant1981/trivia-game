var playerRepository = require('../repository/playerRepository');

const playerService = {

    create : async function create(payload) {
        
        const { username, password, score } = payload;

        const user = await playerRepository.findByKey(username);

        let result;

        var currentDate = this.getCurrentDate();

        if(!user) {

            payload.highestScoreDate = currentDate;

            result = await playerRepository.create(payload);

        } else {

            // if a user already exists, just update password and check if higher score
            if(score >= user.score) {

                user.score = score;

                user.highestScoreDate = currentDate;
            }

            user.password = password;

            result = await playerRepository.update(user);
        }

        return result;
    },

    findAll : async function findAll() {

        const result = await playerRepository.findAll();


        if(result && result.body) {
        
            result.body.sort((a,b) => {
                
                return b.score - a.score;
            });
        }

        return result;
    },

    getCurrentDate: function getCurrentDate() {
        
        let currentDate = new Date();

        let date = ("0" + currentDate.getDate()).slice(-2);

        let month = ("0" + (currentDate.getMonth() + 1)).slice(-2);

        let year = currentDate.getFullYear();

        let hours = currentDate.getHours();

        let minutes = currentDate.getMinutes();

        // pattern YYYY-mm-DD HH:mm
        return year + "-" + month + "-" + date + " " + hours + ":" + minutes;
    }
}

module.exports = playerService;