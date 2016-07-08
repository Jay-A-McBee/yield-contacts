import uuid from 'node-uuid';

const [REQUEST, SUCCESS, FAILURE] = ['REQUEST', 'SUCCESS', 'FAILURE'];

const createActionTypes = (base) => {
	return [REQUEST, SUCCESS, FAILURE].reduce( (acc,type) => {
		acc[type] = `${base}_${type}`;
		return acc;
	},{})
}

export const CONTACT = createActionTypes('CONTACT');
export const CREATE = createActionTypes('CREATE');
export const EDIT = createActionTypes('EDIT');
export const DELETE = createActionTypes('DELETE');
export const SEARCH = createActionTypes('SEARCH');

export const CREATE_CONTACT = 'CREATE_CONTACT';
export const CONTACTS_INIT = 'CONTACTS_INIT';
export const EDIT_CONTACT = 'EDIT_CONTACT';
export const DELETE_CONTACT = 'DELETE_CONTACT';
export const SEARCH_CONTACT = 'SEARCH_CONTACT';

function createAction(type, payload = {}){
	return {type, ...payload};
}

export const get = {
	request: () => createAction(CONTACT.REQUEST),
	success: (response) => createAction(CONTACT.SUCCESS, {response}),
	failure: (error) => createAction(CONTACT.FAILURE, {error})
}

export const create = {
	request: (contactObj) => createAction(CREATE.REQUEST, {contactObj}),
	success: (response) => createAction(CREATE.SUCCESS, {response}),
	failure: (error) => createAction(CREATE.FAILURE, {error})
}

export const edit = {
	request: (contactObj) => createAction(EDIT.REQUEST, {contactObj}),
	success: (response) => createAction(EDIT.SUCCESS, {response}),
	failure: (error) => createAction(EDIT.FAILURE, {error})
}

export const remove = {
	request: (id) => createAction(DELETE.REQUEST, {id}),
	success: (response) => createAction(DELETE.SUCCESS, {response}),
	failure: (error) => createAction(DELETE.FAILURE, {error})
}

export const search = {
	request: (id) => createAction(SEARCH.REQUEST, {id}),
	success: (response) => createAction(SEARCH.SUCCESS, {response}),
	failure: (error) => createAction(SEARCh.FAILURE, {error})
}

//actions ln.59-94 all pass through saga middleware
export function getContacts(){
	let id = uuid.v4();
	return {
	  id: id,
	  type: CONTACTS_INIT
	}
}

export function searchContacts(name){
  let id = uuid.v4();
	return {
	  id: id,
	  name: name,
	  type: "SEARCH_CONTACT"
	}
}

export function createContact(dbEntry){
	let id = uuid.v4();
	return {
	  id: id,
	  contact: dbEntry,
	  type: CREATE_CONTACT
	}
}

export function editContact(dbEntry){
	let id = uuid.v4();
	return {
	  id: id,
	  editedContact: dbEntry,
	  type: EDIT_CONTACT
	}
}

export function deleteContact(dbID){
	let id = uuid.v4();
	return {
	  id: id,
	  contactID: dbID,
	  type: DELETE_CONTACT
	}
}

//These last two actions do not pass through saga middleware

export function openEdit(objID){
  let id = uuid.v4();
	return {
	  id: id,
	  payload: objID,
	  type: "EDIT"
	}
}


export function closeSearch(){
  let id = uuid.v4();
	return {
	  id: id,
	  type: "CLOSE_SEARCH"
	}
}


