import uuid from 'node-uuid';

export function getContacts(){
	let id = uuid.v4();
	return {
	  id: id,
	  type: "CONTACTS_INIT"
	}
}

export function createContact(dbEntry){
	let id = uuid.v4();
	return {
	  id: id,
	  body: JSON.stringify(dbEntry),
	  type: "CREATE_CONTACT"
	}
}

export function editContact(dbEntry){
	let id = uuid.v4();
	return {
	  id: id,
	  body: JSON.stringify(dbEntry),
	  type: "EDIT_CONTACT"
	}
}

export function deleteContact(dbID){
	let id = uuid.v4();
	return {
	  id: id,
	  contactID: dbID,
	  type: "DELETE_CONTACT"
	}
}

export function openEdit(objID){
  let id = uuid.v4();
	return {
	  id: id,
	  payload: objID,
	  type: "EDIT"
	}
}

export function searchContacts(name){
  let id = uuid.v4();
	return {
	  id: id,
	  payload: name,
	  type: "SEARCH"
	}
}

export function closeSearch(){
  let id = uuid.v4();
	return {
	  id: id,
	  type: "CLOSE_SEARCH"
	}
}


