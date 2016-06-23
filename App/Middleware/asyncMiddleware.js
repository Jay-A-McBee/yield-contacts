'use strict'

import fetch from 'isomorphic-fetch';

const config = {
	credentials: 'include',
	method: null,
	headers: {
	  'Accept': 'application/json',
	  'Content-Type': 'application/json'      
	}
}

const BASE_URL = 'http://localhost:3000/';

let callApi = (method,endpoint,id,body) => {
	
	config.method = method;
    
  if(method === 'POST' || method === 'PUT') config.body = body;
  
	return fetch(BASE_URL + endpoint, config)
	  .then( response => 
	  	response.text()
	      .then( text => ({ text, response }))
	  )
	  .then(({ text, response }) => {
	  	if(!response.ok){
	  		return Promise.reject(text);
	  	}else{
	  		return text;
	  	}
	  })
}

export const CALL_API = Symbol('Call API');

export default store => next => action => {
  
	if(!action[CALL_API]) return next(action);

	let { method,endpoint,id,body,types } = action[CALL_API];
	let [ intial, success, failure ] = types;

	return callApi(method, endpoint, id, body)
	  .then( response => 
	  	next({
	  		response,
	  		type: success,
	  		id: id
	  	})
	  )
	  .catch( err => 
	  	next({
	  		err,
	  		type: failure,
	  		id: id
	  	})
	  )
}


