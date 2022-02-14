var playerService = require('../service/playerService');

const opts = require('./playerSchema');
const baseUri = '/players-manager/players';

async function player (fastify, options) {
 
  fastify.get(baseUri + '/', async (request, reply) => {
    
    const response = await playerService.findAll();

    return reply
    .code(response.code)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(response.body);
  });

  
  fastify.post(baseUri + '/', opts, async (request, reply) => {

    const response = await playerService.create(request.body);
    
    return reply
    .code(response.code)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(response.body);
  });
}

module.exports = player