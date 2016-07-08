import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import EditContact from '../Components/editContact';
import ContactMaker from './contactMaker';

export default class Contacts extends Component {  

  fetchContacts(){
    this.props.get()
  }

  render () {

    //contactElements-->results array of JSX elements from mapping over contactObjects
    //ContactMaker func-->contactMaker.js
    //ES6 spread operator expands the array of contact JSX elements in the return call of the render function ln. 26
  	let {contactToEdit, edit, remove, openEdit, editing, contacts} = this.props
    let contactElements = contacts.map( contactObj => ContactMaker(contactObj, remove, openEdit));
    
    return (
      <div>
        <div className='text-center border pad depth'>
          <h3 >Contacts</h3>
          {editing &&
            <EditContact
              contactToEdit = {contactToEdit}
              edit = {edit}
            />}
          {contacts.length ?         
            <div className='text-left'>
              {[...contactElements]}
            </div> :
            <button
             className='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent fiveMargin' 
             onClick = {() => this.fetchContacts()}
             >
              View Contacts 
            </button>}
        </div>
      </div>
    )
  }
}

Contacts.PropTypes = {
	contacts: PropTypes.array.isRequired,
  editing: PropTypes.bool.isRequired,
  contactToEdit: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired,
  openEdit: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired
}
