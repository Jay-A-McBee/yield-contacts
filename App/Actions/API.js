import  fetch  from 'isomorphic-fetch';

let contactsAPI = {};

const config = {
	credentials: 'include',
	method: null,
	headers: {
	  'Accept': 'application/json',
	  'Content-Type': 'application/json'      
	}
}

let baseURL = 'http://localhost:3000/'

contactsAPI.getContacts = function(){
	config.method = 'GET';
	return fetch(baseURL + 'contacts', config)
}

contactsAPI.createContact = function(contact){
	config.method = 'POST';
	config.body = contact;
	return fetch(baseURL + 'contacts', config)
}

contactsAPI.editContact = function(contact){
	config.method = 'PUT';
	config.body = contact;
	return fetch(baseURL + 'contacts', config)
}

contactsAPI.deleteContact = function(contactID){
	config.method = 'DELETE';
	return fetch(baseURL + 'contacts?id='+ contactID, config)
}

module.exports = contactsAPI;