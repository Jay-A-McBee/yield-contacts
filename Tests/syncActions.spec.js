import * as actions from '../App/Actions/genericActions';
import * as types from '../App/Actions/genericActions';
import { expect } from 'chai';


describe('openEdit action', () => {
  it('should create an action to open edit inputs', () => {
    let payload = 5;
    const expectedAction = {
    	payload,
      type: types.EDIT,
    }
    expect(actions.openEdit(payload)).to.deep.equal(expectedAction);
  })
})

describe('searchContacts action', () => {
  it('should create an action with search name', () => {
    let payload = 'Austin McBee';
    const expectedAction = {
    	payload,
      type: types.SEARCH,
    }
    expect(actions.searchContacts(payload)).to.deep.equal(expectedAction);
  })
})

describe('close action', () => {
	it('should create an action of correct type', () => {
		const expectedAction = {
			type: types.CLOSE_SEARCH
		}
		expect(actions.closeSearch()).to.deep.equal(expectedAction);
	})
})


