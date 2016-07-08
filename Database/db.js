'use strict'

const cassandra = require('cassandra-driver');

var client = new cassandra.Client({ contactPoints: ['127.0.0.1:9042']});

var Promise = require('bluebird');

//This makes connect and execute return a promise-->makes the functions 'thennable'
var connect = Promise.promisify(client.connect, {context: client});
var execute = Promise.promisify(client.execute, {context: client});

var db = "CREATE KEYSPACE IF NOT EXISTS contacts WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '1' }";
var table = "CREATE TABLE IF NOT EXISTS contacts.contact (id uuid, name text, email text, PRIMARY KEY(id))";

//wrap generator function to handle promises
//Promise.coroutine extends functionality to yield promises
//returns a normal route function that passes req, res, next to promise handling coroutine
//all errors will be passed to next

const wrap = (fn) => {
  var coRout = Promise.coroutine(fn);
  return function(req,res,next){
    coRout(req,res,next).catch(next)
  }
}

(wrap(function* dbInit(){
  yield*[
    connect(),
    execute(db),
    execute(table)
  ]
}))()

module.exports  = client;