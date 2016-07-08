'use strict'

import  update  from 'react-addons-update';

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
    case "CONTACT_REQUEST":
      return state;
    case "CONTACT_SUCCESS":
      return update(state,{
        fetching:{$set:false}, 
        contacts:{$set:JSON.parse(action.response)}
      });
    case "CONTACT_FAILURE":
      return update(state, {
      	fetching: {$set: !state.fetching}, 
      	error: action.error
      });
    case "CREATE_CONTACT": 
      return update(state, {
        fetching: {$set:true}
      });
    case "CREATE_REQUEST":
      return state;
    case "CREATE_SUCCESS":
	    return update(state, {
		  	fetching: {$set: !state.fetching}, 
		  	contacts: {$set:JSON.parse(action.response)}
    });
	  case "CREATE_FAILURE":
	    return update(state, {
		  	fetching: {$set:false}, 
		  	error: {$set:action.error}
    });
    case "SEARCH_CONTACT": 
      return state;
    case "SEARCH_REQUEST":
      return update(state, {
        fetching: {$set:!state.fetching}
      })
    case "SEARCH_SUCCESS":
      return update(state,{
        fetching: {$set: !state.fetching},
        search: {$set: JSON.parse(action.response)}
      })
    case "SEARCH_FAILURE":
      return update(state, {
        fetching: {$set: !state.fetching},
        error: {$set: JSON.parse(action.error)}
      })
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
    case "EDIT REQUEST":
      return state;
    case "EDIT_SUCCESS":
      return update(state,{
        fetching: {$set: !state.fetching},
        editing: {$set: !state.editing},
        contactToEdit: {$set: null}, 
        contacts: {$set: JSON.parse(action.response)}
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
    case "DELETE_REQUEST":
      return state;
    case "DELETE_SUCCESS":
      return update(state, {
        fetching: {$set: false}, 
        contacts: {$set: JSON.parse(action.response)}
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