var db = require('../Database/db.js');
var contacts = require('../Database/dbUtils.js');
var Path    = require('path');

module.exports = function(app){

	
	var alphabetize = (res,arr) => {
		var sorted = arr.sort((a,b) => a.name.toLowerCase().charCodeAt(0) - b.name.toLowerCase().charCodeAt(0));
		res.send(sorted);
	}


	app.get('/', function(req,res){
		res.sendFile(Path.resolve(__dirname,'../App/dist/index.html'));
	});
    
    //gets all contacts
	app.get('/contacts', function(req,res){
  	contacts.getAll()
  	  .then( data => alphabetize(res,data.rows))
  	  .catch( err => res.status(400).send(err))
	});
    
    //creates new contact and returns all contacts
	app.post('/contacts', function(req,res){
		contacts.create(req.body)
		  .then( () => 
		    contacts.getAll()
		  	  .then( data => alphabetize(res,data.rows))
		  	  .catch( err => res.status(400).send(err))
	    )
	    .catch(err => res.status(400).send(err))
	});
    
    //edits existing contact and returns all contacts
	app.put('/contacts', function(req,res){
		contacts.edit(req.body)
		  .then( () => 
		  	contacts.getAll()
		  	  .then( data => alphabetize(res,data.rows))
		  	  .catch( err => res.status(400).send(err))
	    )
	    .catch(err => res.status(400).send(err))
	});
    
    //deletes existing contact and returns all contacts
	app.delete('/contacts', function(req,res){
		contacts.delete(req.query.id)
		  .then( () => 
		  	contacts.getAll()
		  	  .then( data => alphabetize(res,data.rows))
		  	  .catch( err => res.status(400).send(err))
	    )
	    .catch(err => res.status(400).send(err))
	});
}
