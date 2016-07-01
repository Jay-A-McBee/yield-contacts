import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import contactsAPI from '../Actions/API';

//generators--yield call in asyncMETHOD returns promise object
//subsequent asyncMETHOD.text() resolves the promise and unwraps value


function* fetchContacts(action){
	try {
	  const asyncGET = yield call(contactsAPI.getContacts);
	  const contacts = yield asyncGET.text();
	  yield put({type: 'CONTACTS_SUCCESS', contacts: contacts})
	} catch(e) {
		yield put({type: 'CONTACTS_FAILURE', error: e})
	}
}

function* createContacts(action){
	try {
	  const asyncPOST = yield call(contactsAPI.createContact, action.body);
	  const updatedContacts = yield asyncPOST.text();
	  yield put({type: 'CREATE_SUCCESS', contacts: updatedContacts});
	} catch(e) {
		yield put({type: 'CREATE_FAILURE', error: e});
	}
}

function* deleteContact(action){
	try {
		const asyncDEL = yield call(contactsAPI.deleteContact, action.contactID);
		const updatedContacts = yield asyncDEL.text();
		yield put({type: 'DELETE_SUCCESS', contacts: updatedContacts})
	} catch(e) {
		yield put({type: 'DELETE_FAILURE', error: e});
	}
}

function* editContact(action){
	try{
		const asyncPUT = yield call(contactsAPI.editContact, action.body);
		const updatedContacts = yield asyncPUT.text();
		yield put({type: 'EDIT_SUCCESS', contacts: updatedContacts})
	} catch(e) {
		yield put({type: 'EDIT_FAILURE', error:e})
	}
}

function* contactSaga(){
	yield[
	  takeEvery('CONTACTS_INIT', fetchContacts),
    takeEvery('CREATE_CONTACT', createContacts),
    takeEvery('DELETE_CONTACT', deleteContact),
    takeEvery('EDIT_CONTACT', editContact)
  ]
}

export default contactSaga;