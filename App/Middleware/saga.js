import { take, put, call, fork} from 'redux-saga/effects'

import contactsAPI from '../Actions/API';
import * as actions from '../Actions/genericActions';

//generators--yield call in asyncMETHOD returns promise object
//subsequent asyncMETHOD.text() resolves the promise and unwraps value

const {get, create, edit, remove, search} = actions;

function* fetchEntity(entity, apiFn, id) {
  yield put( entity.request(id) )
  
  const response = yield call(apiFn,id)
  
  if(response)
    yield put( entity.success(response) )
  else
    yield put( entity.failure(id, error) )
}

const getContacts = fetchEntity.bind(null, get, contactsAPI.getContacts);
const makeContact = fetchEntity.bind(null, create, contactsAPI.createContact);
const removeContact = fetchEntity.bind(null, remove, contactsAPI.deleteContact);
const alterContact = fetchEntity.bind(null, edit, contactsAPI.editContact);
const findContact = fetchEntity.bind(null, search, contactsAPI.searchContact);


function* fetchContacts(action){
	yield call(getContacts);
}

function* createContact(contact){
	yield call(makeContact,contact)
}

function* deleteContact(action){
  yield call(removeContact, action)
}

function* editContact(contact){
  yield call(alterContact, contact)
}

function* seekContact(name){
  yield call(findContact, name)
}

function* watchFetch() {
  while(true) {
    yield take(actions.CONTACTS_INIT)
    yield fork(fetchContacts)
  }
}
function* watchCreate() {
  while(true){
    const {contact} = yield take(actions.CREATE_CONTACT);
    yield fork(createContact,contact)
  }
}

function* watchDelete() {
  while(true) {
    const {contactID} = yield take(actions.DELETE_CONTACT)
    yield fork(deleteContact, contactID)
  }
}

function* watchEdit() {
  while(true) {
    const {editedContact} = yield take(actions.EDIT_CONTACT)
    yield fork(editContact, editedContact)
  }
}

function* watchSearch() {
  while(true) {
    const {name} = yield take(actions.SEARCH_CONTACT)
    yield fork(seekContact, name)
  }
}

function* contactSaga(){
	yield*[
	  fork(watchFetch),
    fork(watchCreate),
    fork(watchDelete),
    fork(watchEdit), 
    fork(watchSearch)
  ]
}

export default contactSaga;