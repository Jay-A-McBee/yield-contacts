import React from 'react';

export default function ContactMaker({email,id,name,remove,openEdit}){

	let emailAddress = `mailto:${email}`;

	return(
	  <div className='fiveMargin greenBorder pad ' key={id}>
	    <div>
	      <i 
	        className = 'glyphicon glyphicon-remove-circle pull-right alertIcon point' 
	        onClick = {() => 
	        	remove(id)}>
	      </i>
	      <small>Name: {name}</small>
	    </div>
	    <div>
	      <i 
	        className = 'glyphicon glyphicon-pencil pull-right point' 
	        onClick = {() => 
	        	openEdit(id)}>
	      </i>
	      <small>Email: <a className='anchor' href={emailAddress}>{email}</a></small>
	    </div>
	  </div>
	)
}