import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';

import ContactForm from '../App/Components/contactForm';

describe('<ContactForm/>', function () {
  it('should have two inputs' , function () {
    const wrapper = shallow(<ContactForm/>);
    expect(wrapper.find('input')).to.have.length(2);
  });

  it('should have props for newContact and create', function () {
    const wrapper = mount(<ContactForm/>);
    console.log(wrapper.state());
    expect(wrapper.props().newContact).to.be.defined;
    expect(wrapper.props().create).to.be.defined;
  });
});