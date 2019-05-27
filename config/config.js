const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    root: rootPath,
    app: {
      name: 'apiresttransportecarga'
    },
    SECRET_TOKEN:'transportadora-dkrga182',
    port: process.env.PORT || 3000,
    db: 'mongodb://SeminarioDesarrollo:AFDFuke182@seminariodesarrollo-shard-00-00-kxofb.mongodb.net:27017,seminariodesarrollo-shard-00-01-kxofb.mongodb.net:27017,seminariodesarrollo-shard-00-02-kxofb.mongodb.net:27017/tallerSeminario?ssl=true&replicaSet=SeminarioDesarrollo-shard-0&authSource=admin&retryWrites=true'
  },

  test: {
    root: rootPath,
    app: {
      name: 'apiresttransportecarga'
    },
    SECRET_TOKEN:'transportadora-dkrga182',
    port: process.env.PORT || 3000,
    db: 'mongodb://SeminarioDesarrollo:AFDFuke182@seminariodesarrollo-shard-00-00-kxofb.mongodb.net:27017,seminariodesarrollo-shard-00-01-kxofb.mongodb.net:27017,seminariodesarrollo-shard-00-02-kxofb.mongodb.net:27017/tallerSeminario?ssl=true&replicaSet=SeminarioDesarrollo-shard-0&authSource=admin&retryWrites=true'
  },

  production: {
    root: rootPath,
    app: {
      name: 'apiresttransportecarga'
    },
    SECRET_TOKEN:'transportadora-dkrga182',
    port: process.env.PORT || 3000,
    db: 'mongodb://SeminarioDesarrollo:AFDFuke182@seminariodesarrollo-shard-00-00-kxofb.mongodb.net:27017,seminariodesarrollo-shard-00-01-kxofb.mongodb.net:27017,seminariodesarrollo-shard-00-02-kxofb.mongodb.net:27017/tallerSeminario?ssl=true&replicaSet=SeminarioDesarrollo-shard-0&authSource=admin&retryWrites=true'
  }
};

module.exports = config[env];
