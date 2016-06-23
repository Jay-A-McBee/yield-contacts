import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';




export default class SearchResult extends Component{

	render(){
    
    let { name, email, close } = this.props
		
    return(
      <ReactCSSTransitionGroup 
        transitionName={'contact'} 
        transitionAppear={true}  
        transitionAppearTimeout={500} 
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}>
  		  <div className='border pad depth'>
          <i 
            className = 'pull-right alertIcon point' 
            onClick = { () => close()}>
            &#10006;
          </i>
          <small>Name: {name}<br />Email: {email}</small>
        </div>
      </ReactCSSTransitionGroup>  		
    )
	}
}

SearchResult.PropTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired
}