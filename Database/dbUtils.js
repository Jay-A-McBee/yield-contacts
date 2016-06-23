'use strict'

const cassandra = require('cassandra-driver');
var client = require('./db.js');
var Promise = require('bluebird');


//This turns client.execute into a promise-->each here returns promise object
var execute = Promise.promisify(client.execute, {context: client});

var contacts = module.exports;


contacts.create = function(reqObj){
  let id = cassandra.types.Uuid.random();
	let name = reqObj.name;
	let email = reqObj.email;
	let query = 'INSERT INTO contacts.contact (id, name, email) VALUES(?,?,?)';
  return execute(query,[id, name, email],{ prepare: true});
}

contacts.getAll = function(){
	return execute('SELECT * FROM contacts.contact');
	  
}

contacts.edit = function(reqObj){
	let name = reqObj.name;
	let email = reqObj.email;
	let origID = reqObj.id;
	let query = 'INSERT INTO contacts.contact (id, name, email) VALUES(?,?,?)';
  return execute(query,[origID, name, email],{ prepare: true});
}

contacts.delete = function(id){
	let origID = id;
	let query = 'DELETE FROM contacts.contact WHERE id = ' + origID ;
	return execute(query,{ prepare: true})
}