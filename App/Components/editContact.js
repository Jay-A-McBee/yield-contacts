import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import editContact from '../Actions/genericActions.js'


export default class EditContact extends Component{

  getVal(){
  	return {
      name: this.refs.editName.value.trim(),
  	  email: this.refs.editEmail.value.trim()
  	}
  }

  clearVal(){
    this.refs.editName.value = '';
    this.refs.editEmail.value = '';
  }
  
  handleSubmit(contactObj){
    this.clearVal();
    contactObj.id = this.props.contactToEdit.id;
  	this.props.edit({body:JSON.stringify(contactObj)});
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
            ref='editName'
            className="mdl-textfield__input"
            type='text' 
            defaultValue = {name}/>
        <br />
          <input 
            ref='editEmail'
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