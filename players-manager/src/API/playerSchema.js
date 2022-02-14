module.exports = {
    schema : {
        body : {
            type : 'object',
            required: [
                'username',
                'password',
                'score'
              ],
            properties : {
                username : {
                    type : 'string'
                },
                password : {
                    type : 'string'
                },
                score : {
                    type: 'integer'
                }
            }
        },
        response: {
            201: {
                type: 'object',
                properties: {
                    username: { 
                        type: 'string' 
                    },
                    password: { 
                        type: 'string' 
                    },
                    score: { 
                        type: 'integer' 
                    }
                }
            }
        }
    }
}
