import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import editContact from '../Actions/genericActions.js'


export default class EditContact extends Component{

  getVal(){
  	return {
      name: document.getElementById('editName').value.trim(),
  	  email: document.getElementById('editEmail').value.trim()
  	}
  }

  clearVal(){
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
  }
  
  handleSubmit(contactObj){
    this.clearVal();
    contactObj.id = this.props.contactToEdit.id;
  	this.props.edit(contactObj);
  }
  
  render() {
    
    let{ name, email } = this.props.contactToEdit;

    return (
      <ReactCSSTransitionGroup 
        transitionName={'contact'} 
        transitionAppear={true}  
        transitionAppearTimeout={500} 
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}>
        <div className='text-center pad'>
        <br />
          <input 
            id='editName'
            className="mdl-textfield__input"
            type='text' 
            defaultValue = {name}/>
        <br />
          <input 
            id='editEmail'
            className="mdl-textfield__input"
            type='text' 
            defaultValue = {email}/> 
        <br />
          <button 
            className='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent fiveMargin'
            onClick={() => this.handleSubmit(this.getVal())}> 
            Edit Contact
          </button>
        </div>
      </ReactCSSTransitionGroup>
    )
  }
};

EditContact.PropTypes = {
  contactToEdit : PropTypes.object.isRequired,
  edit: PropTypes.func.isRequired
}