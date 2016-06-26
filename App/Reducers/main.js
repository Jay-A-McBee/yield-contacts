'use strict'

import * as ActionTypes from '../Actions/genericActions';
import  update  from 'react-addons-update';

//searches _store.contacts for contact with matching name
const findContact = function(state, name){
  var person = state.contacts.filter( conObj => conObj.name === name || conObj.name.toLowerCase() === name)[0];
  return person ? person : {name:'Contact is not registered'}
}

//searches _store.contacts for contact with matching id
const findEdit = function(state, id){
  return state.contacts.filter( conObj => conObj.id === id)[0];
}

export function contacts(
  state = {
    contacts: [], 
    fetching: false, 
    error: null,
    search: null,
    editing: false,
    contactToEdit: null
  }, action){
  switch (action.type){
    case ActionTypes.CONTACTS_INIT:
      return update(state, {
        fetching:{$set:true}
      });
    case ActionTypes.CONTACTS_SUCCESS:
      return update(state,{
        fetching:{$set:false}, 
        contacts:{$set:JSON.parse(action.response)}
      });
    case ActionTypes.CONTACTS_FAILURE:
      return update(state, {
      	fetching: {$set: !state.fetching}, 
      	error: action.response.error
      });
    case ActionTypes.CREATE_CONTACT: 
      return update(state, {
        fetching: {$set:true}
      });
    case ActionTypes.CREATE_SUCCESS:
	    return update(state, {
		  	fetching: {$set: !state.fetching}, 
		  	contacts: {$set:JSON.parse(action.response)}
    });
	  case ActionTypes.CREATE_FAILURE:
	    return update(state, {
		  	fetching: {$set:false}, 
		  	error: {$set:action.response.error}
    });
    case ActionTypes.SEARCH: 
      return update(state, {
        search:{$set:findContact(state, action.payload)}
      });
    case ActionTypes.CLOSE_SEARCH: 
      return update(state, {
        search: {$set: null}
      });
    case ActionTypes.EDIT: 
      return update(state, {
        editing: {$set:!state.editing}, 
        contactToEdit: {$set: findEdit(state, action.payload)}
      });
    case ActionTypes.EDIT_CONTACT: 
      return update(state, {
        fetching: {$set:true}
      });
    case ActionTypes.EDIT_SUCCESS:
      return update(state,{
        fetching: {$set: !state.fetching},
        editing: {$set: !state.editing},
        contactToEdit: {$set: null}, 
        contacts: {$set: JSON.parse(action.response)}
      });
    case ActionTypes.EDIT_FAILURE:
      return update(state, {
        fetching: {$set:false}, 
        error: {$set:action.response.error}
      });
    case ActionTypes.DELETE_CONTACT: 
      return update(state, {
        fetching:{$set:true}
      });
    case ActionTypes.DELETE_SUCCESS:
      return update(state, {
        fetching: {$set: false}, 
        contacts: {$set: JSON.parse(action.response)}
      });
    case ActionTypes.DELETE_FAILURE:
      return update(state, {
        fetching:{$set:false}, 
        error: {$set: action.response.error}
      });
	  default:
	   return state;
	}
}