import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import SearchResult from '../Components/searchResult';
import {closeSearch, searchContacts} from '../Actions/genericActions.js'


export default class SearchBar extends Component{
  
  getVal(){
  	return document.getElementById('search').value;
  }
  
  //obj->value submitted from search bar
  handleSubmit(name){
    //resets input value to empty string
    document.getElementById('search').value = '';
    //sends action to reducer that searches through contacts array for match
    this.props.find(name);
  }
  
  render() {
    
    let { search, close } = this.props
    
    return (
      <div>
        <div className='text-center fiveMargin'>
          <input 
            id='search' 
            className = 'depth'
            placeholder='name' 
            type='text'/>
          <br />
          <button 
            className='btn btn-primary btn-block fiveMargin depth' 
            onClick={ () => this.handleSubmit(this.getVal())}>
            Search
          </button>
        </div>
        <div>
         { search &&
          <SearchResult
            name = {search.name}
            email = {search.email}
            close = {close}
          />}
        </div>
      </div>
    )
  }
};

SearchBar.PropTypes = {
  search: PropTypes.object.isRequired,
  find: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired
}