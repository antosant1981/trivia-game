const fastify = require('fastify')({
  logger: true
});

// reouting for players APIs
fastify.register(require('fastify-cors'));
fastify.register(require('../API/playerAPI'));

fastify.listen(8080, '0.0.0.0', function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
});