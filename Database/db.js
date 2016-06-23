'use strict'

const cassandra = require('cassandra-driver');

var client = new cassandra.Client({ contactPoints: ['127.0.0.1:9042']});

var Promise = require('bluebird');

//This makes connect and execute return a promise-->makes the functions 'thennable'
var connect = Promise.promisify(client.connect, {context: client});
var execute = Promise.promisify(client.execute, {context: client});

var db = "CREATE KEYSPACE IF NOT EXISTS contacts WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '1' }";
var table = "CREATE TABLE IF NOT EXISTS contacts.contact (id uuid, name text, email text, PRIMARY KEY(id))";

connect()
  .then( () => {
    execute(db)
      .then( () => {
        execute(table)
          .then( () => console.log('keyspace contacts and table contact created successfully'))
          .catch( err => console.error(err))
      }) 
      .catch( err => console.error('There was an error when creating table', err) )
  })
  .catch( err => console.error('There was an error when creating keyspace', err) )


module.exports  = client;