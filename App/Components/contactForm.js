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
    this.props.create(contactObj);
  }
  
  render(){
    return (
      <div className='text-center fiveMargin'>
        Add Contact
        <br />
        <input 
          id='name' 
          className='depth'
          type='text' 
          placeholder='name'/>
        <br />
        <input 
          id='email' 
          className='depth'
          type='text' 
          placeholder='email'/>
        <br />
        <button 
          className='btn btn-primary btn-block fiveMargin depth' 
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