import axios from 'axios';

const player = {

    save: async function(player) {

      try {

        let response = await axios.post('http://localhost:8080/players-manager/players/', {
                username: player.username,
                password: player.password,
                score: player.score
              });

              return {code: response.status, body: response.data}

            } catch(error) {

              return {code: error.response.status, body: null};
            }
    },

    findAll: async function findAll() {
      
      let res;

      try {

        res = await axios.get('http://localhost:8080/players-manager/players/');
      
      } catch(error) {
  
      }
      return res;
    }
  }

export default player;