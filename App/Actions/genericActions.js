import uuid from 'node-uuid';
import { CALL_API } from '../Middleware/asyncMiddleware';

export const CONTACTS_INIT    = 'CONTACTS_INIT';
export const CONTACTS_SUCCESS = 'CONTACTS_SUCCESS';
export const CONTACTS_FAILURE = 'CONTACTS_FAILURE';

export function getContacts(){
	let id = uuid.v4();
	return {
		[CALL_API]:{
		  method: 'GET',
		  endpoint: 'contacts',
		  id: id,
		  types: [CONTACTS_INIT, CONTACTS_SUCCESS, CONTACTS_FAILURE]
	  }
	}
}

export const CREATE_CONTACT    = 'CREATE_CONTACT';
export const CREATE_SUCCESS = 'CREATE_SUCCESS';
export const CREATE_FAILURE   = 'CREATE_FAILURE';

export function createContact(dbEntry){
	let id = uuid.v4();
	return {
		[CALL_API]:{
		  method: 'POST',
		  endpoint: 'contacts',
		  id: id,
		  body: JSON.stringify(dbEntry),
		  types: [CREATE_CONTACT, CREATE_SUCCESS, CREATE_FAILURE]
		}
	}
}

export const EDIT_CONTACT    = 'EDIT_CONTACT';
export const EDIT_SUCCESS = 'EDIT_SUCCESS';
export const EDIT_FAILURE   = 'EDIT_FAILURE';

export function editContact(dbEntry){
	let id = uuid.v4();
	return {
		[CALL_API]:{
		  method: 'PUT',
		  endpoint: 'contacts',
		  id: id,
		  body: JSON.stringify(dbEntry),
		  types: [EDIT_CONTACT, EDIT_SUCCESS, EDIT_FAILURE]
		}
	}
}

export const DELETE_CONTACT    = 'DELETE_CONTACT';
export const DELETE_SUCCESS = 'DELETE_SUCCESS';
export const DELETE_FAILURE   = 'DELETE_FAILURE';

export function deleteContact(dbID){
	let id = uuid.v4();
	return {
		[CALL_API]:{
		  method: 'DELETE',
		  endpoint: 'contacts?id='+dbID,
		  id: id,
		  types: [DELETE_CONTACT, DELETE_SUCCESS, DELETE_FAILURE]
		}
	}
}

export const SEARCH = 'SEARCH';
export const CLOSE_SEARCH = 'CLOSE_SEARCH';
export const EDIT = 'EDIT';

export function openEdit(objID){
  let id = uuid.v4();
	return {
	  id: id,
	  payload: objID,
	  type: EDIT
	}
}

export function searchContacts(name){
  let id = uuid.v4();
	return {
	  id: id,
	  payload: name,
	  type: SEARCH
	}
}

export function closeSearch(){
  let id = uuid.v4();
	return {
	  id: id,
	  type: CLOSE_SEARCH
	}
}


