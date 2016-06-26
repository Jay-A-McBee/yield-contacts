import React, { Component, PropTypes} from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import Contacts from '../Components/contacts';
import ContactForm from '../Components/contactForm';
import SearchBar from '../Components/searchBar';
import '../Styles/styles.css';
import * as actions from '../Actions/genericActions';

export default class App extends Component {

	componentWillMount(){
    this.props.get();
  }

  render () {
    return(
      <div className='container pad'>
        <div className = 'row'>
          <div className='col-md-3'></div>
            <div className='col-md-6 border pad depth'>
          	  <div className='col-md-6'>
                <SearchBar
                  search = {this.props.search}
                  find = {this.props.find}
                  close = {this.props.close}
                />
                <ContactForm 
                  create = {this.props.create}
                />
              </div>
              <div className='col-md-6'>
                <Contacts
                  contacts = {this.props.contacts}
                  editing = {this.props.editing}
                  contactToEdit = {this.props.contactToEdit}
                  openEdit = {this.props.openEdit}
                  edit = {this.props.edit}
                  remove = {this.props.remove}
                />
              </div>
            </div>
          <div className='col-md-3'></div>
        </div>
      </div>
    )
  }
}

App.PropTypes = {
  search : PropTypes.object.isRequired,
  contacts: PropTypes.array.isRequired,
  editing: PropTypes.bool.isRequired,
  contactToEdit: PropTypes.object.isRequired,
  create: PropTypes.func.isRequired,
  get: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired
}

function mapDispatchToProps(dispatch){
	return{
		create: (obj) => dispatch(actions.createContact(obj)),
		get: () => dispatch(actions.getContacts()),
    openEdit: (id) => dispatch(actions.openEdit(id)),
    edit: (obj) => dispatch(actions.editContact(obj)),
    remove: (id) => dispatch(actions.deleteContact(id)),
    find: (name) => dispatch(actions.searchContacts(name)),
    close: () => dispatch(actions.closeSearch())
	}
}

function mapStateToProps(state){
	return{
	  search: state.search,
	  contacts: state.contacts,
	  editing: state.editing,
	  contactToEdit: state.contactToEdit
	}
}

//This is the react/redux lib **magic**. Connect-->higher order component that
//returns component(ex. App) that is 'connected' to store. The App component is subscribed to 
//state now. Any change to state causes mapStateToProps to execute and changes are passed to children.
export default connect(mapStateToProps,
	mapDispatchToProps)(App);

