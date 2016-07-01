'use strict'

import  update  from 'react-addons-update';

//searches state.contacts for contact with matching name
const findContact = function(state, name){
  var person = state.contacts.filter( conObj => conObj.name === name || conObj.name.toLowerCase() === name)[0];
  return person ? person : {name:'Contact is not registered'}
}

//searches state.contacts for contact with matching id
const findEdit = function(state, id){
  return state.contacts.filter( conObj => conObj.id === id)[0];
}

const initialState = {
  contacts: [], 
  fetching: false, 
  error: null,
  search: null,
  editing: false,
  contactToEdit: null
}

export function contacts( state = initialState , action){
  switch (action.type){
    case "CONTACTS_INIT":
      return update(state, {
        fetching:{$set:true}
      });
    case "CONTACTS_SUCCESS":
      return update(state,{
        fetching:{$set:false}, 
        contacts:{$set:JSON.parse(action.contacts)}
      });
    case "CONTACTS_FAILURE":
      return update(state, {
      	fetching: {$set: !state.fetching}, 
      	error: action.error
      });
    case "CREATE_CONTACT": 
      return update(state, {
        fetching: {$set:true}
      });
    case "CREATE_SUCCESS":
	    return update(state, {
		  	fetching: {$set: !state.fetching}, 
		  	contacts: {$set:JSON.parse(action.contacts)}
    });
	  case "CREATE_FAILURE":
	    return update(state, {
		  	fetching: {$set:false}, 
		  	error: {$set:action.error}
    });
    case "SEARCH": 
      return update(state, {
        search:{$set:findContact(state, action.payload)}
      });
    case "CLOSE_SEARCH": 
      return update(state, {
        search: {$set: null}
      });
    case "EDIT": 
      return update(state, {
        editing: {$set:!state.editing}, 
        contactToEdit: {$set: findEdit(state, action.payload)}
      });
    case "EDIT_CONTACT": 
      return update(state, {
        fetching: {$set:true}
      });
    case "EDIT_SUCCESS":
      return update(state,{
        fetching: {$set: !state.fetching},
        editing: {$set: !state.editing},
        contactToEdit: {$set: null}, 
        contacts: {$set: JSON.parse(action.contacts)}
      });
    case "EDIT_FAILURE":
      return update(state, {
        fetching: {$set:false}, 
        error: {$set:action.error}
      });
    case "DELETE_CONTACT": 
      return update(state, {
        fetching:{$set:true}
      });
    case "DELETE_SUCCESS":
      return update(state, {
        fetching: {$set: false}, 
        contacts: {$set: JSON.parse(action.contacts)}
      });
    case "DELETE_FAILURE":
      return update(state, {
        fetching:{$set:false}, 
        error: {$set: action.error}
      });
	  default:
	   return state;
	}
}