'use strict'

var db = require('../Database/db.js');
var contacts = require('../Database/dbUtils.js');
var Path    = require('path');
var Promise = require('bluebird');


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


module.exports = function(app){


	//sort and send contacts
	var alphabetize = (res,arr) => {
		var sorted = arr.sort((a,b) => a.name.toLowerCase().charCodeAt(0) - b.name.toLowerCase().charCodeAt(0));
		res.send(sorted);
	}

  //initial request to app
	app.get('/', function(req,res){
		res.sendFile(Path.resolve(__dirname,'../App/dist/index.html'));
	});
    
    //gets all contacts
	app.get('/contacts', wrap(function*(req,res){
  	let data = yield contacts.getAll()
  	alphabetize(res, data.rows)
	}));
    
    //creates new contact and returns all contacts
	app.post('/contacts', wrap(function*(req,res){
		yield contacts.create(req.body)
		let data = yield contacts.getAll()
		alphabetize(res,data.rows)
	}));
    
    //edits existing contact and returns all contacts
	app.put('/contacts', wrap(function*(req,res){
		yield contacts.edit(req.body)
		let data = yield contacts.getAll()
		alphabetize(res,data.rows)
	}));
    
    //deletes existing contact and returns all contacts
	app.delete('/contacts', wrap(function*(req,res){
		yield contacts.delete(req.query.id)
		let data = yield contacts.getAll()
		alphabetize(res,data.rows)
	}));
}
