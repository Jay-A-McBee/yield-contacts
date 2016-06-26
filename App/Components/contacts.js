import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import EditContact from '../Components/editContact';
import ContactMaker from './contactMaker';

export default class Contacts extends Component {  

  render () {

    //contactElements-->results array of JSX elements from mapping over contactObjects
    //ContactMaker func-->contactMaker.js
    //ES6 spread operator expands the array of contact JSX elements in the return call of the render function ln. 26
  	let {contactToEdit, edit, remove, openEdit, editing} = this.props
    let contactElements = this.props.contacts.map( contactObj => ContactMaker(contactObj, remove, openEdit));
    
    return (
      <div>
        <div className='text-center border pad depth'>
          <h2>Contacts</h2>
          {editing &&
            <EditContact
              contactToEdit = {contactToEdit}
              edit = {edit}
            />}          
          <div className='text-left'>
            {[...contactElements]}
          </div>
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
