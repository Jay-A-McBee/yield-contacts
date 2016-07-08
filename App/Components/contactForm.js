import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import {createContact} from '../Actions/genericActions.js'


export default class ContactForm extends Component{
  
  getVal(){
    return{ 
    	name: document.getElementById('name').value,
  	  email: document.getElementById('email').value
  	}
  }

  clearVal(){
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
  }
  
  handleSubmit(contactObj){
    this.clearVal();
    this.props.create({body: JSON.stringify(contactObj)});
  }
  
  render(){
    return (
      <div className='text-center fiveMargin'>
        <input 
          id='name' 
          className='mdl-textfield__input'
          type='text' 
          placeholder='name'/>
        <br />
        <input 
          id='email' 
          className='mdl-textfield__input'
          type='text' 
          placeholder='email'/>
        <br />
        <button 
          className='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent fiveMargin' 
          onClick={()=>this.handleSubmit(this.getVal())}>
          Save Contact
        </button>
      </div>
    )
  }
};


ContactForm.PropTypes = {
  newContact: PropTypes.object.isRequired,
  create: PropTypes.func.isRequired
}