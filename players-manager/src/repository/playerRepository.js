var PouchDB = require('pouchdb');
var db = new PouchDB('http://pouchdbserver:5984/player');

const playerRepository = {

  create: async function create(payload) {

    const doc = Object.assign(payload, {
      _id: payload.username
    });

    let result;

    try {

      result = await db.put(doc);

      result = Object.assign(result, { code: 201, body: payload} );

    } catch (error) {

      result = {};

      result = Object.assign(result, { code: error.status, msg: error.message });
    }

    return result;
  },

  findByKey: async function findByKey(key) {

    let doc;

    try {

      doc = await db.get(key);

    } catch(error) {

    }

    return doc;
  },

  findAll: async function findAll() {

    var result = {};

    try {
    
      let docs = await db.allDocs({
        include_docs: true
      });

      if(docs && docs.rows) {

        let trasnform = docs.rows.map(item => {
          
          let {doc} = item;

          delete doc._id;
          delete doc._rev;

          return doc;
          
        });

        result = Object.assign(result, { body: trasnform, code: 200 });
      
      } else {

        result = Object.assign(result, { body : [], code: 404 });
      }

    } catch (err) {

      console.log(err);
      result = Object.assign(result, { code: error.status, msg: error.message });
    }

    return result;
  },

  update: async function update(doc) {

    let result;

    try {

      result = await db.put(doc);

      const {username, password, score} = doc; 

      result = Object.assign(result, { code: 200, body: {username, password, score}} );

    } catch(error) {

      result = {};

      result = Object.assign(result, { code: error.status, msg: error.message });
    }

    return result;
  }
}

module.exports = playerRepository;