import  fetch  from 'isomorphic-fetch';

let contactsAPI = {};

const config = {
	credentials: 'include',
	headers: {
	  'Accept': 'application/json',
	  'Content-Type': 'application/json'      
	}
}

let baseURL = 'http://localhost:3000/';

const callApi = (endpoint, verb, body) => {
  
  let finalConfig = Object.assign({}, config, verb, body);
	
	return fetch(baseURL + endpoint, finalConfig)
	  .then( response => 
	  	response.text()
	  	  .then( text => ({text,response}))
	  )
	  .then(({text,response}) => {
	  	if(!response.ok){
	  		return Promise.reject(text);
	  	}
	  	return text;
	  })
}

contactsAPI.getContacts = () => callApi('contacts', {method: 'GET'});

contactsAPI.createContact = (contact) => callApi('contacts', {method: 'POST'}, contact);

contactsAPI.editContact = (contact) => callApi('contacts', {method: 'PUT'}, contact);

contactsAPI.deleteContact = (contactID) => callApi('contacts?id=' + contactID, {method:'DELETE'});

contactsAPI.searchContact = (name) => callApi('contacts/search?name=' + name, {method:'GET'});

module.exports = contactsAPI;