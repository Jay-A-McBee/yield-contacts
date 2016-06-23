import React from 'react';

export default function ContactMaker(contactObj, actionA, actionB){


	return(
	  <div className='fiveMargin border pad depth' key={contactObj.id}>
	    <div>
	      <i 
	        className = 'glyphicon glyphicon-remove-circle pull-right alertIcon point' 
	        onClick = {() => actionA(contactObj.id)}>
	      </i>
	      <small>Name: {contactObj.name}</small>
	    </div>
	    <div>
	      <i 
	        className = 'glyphicon glyphicon-pencil pull-right point' 
	        onClick = {() => actionB(contactObj.id)}>
	      </i>
	      <small>Email: {contactObj.email}</small>
	    </div>
	  </div>
	)
}