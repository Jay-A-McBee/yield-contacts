import React from 'react';
import { render } from 'react-dom';
import Root from './Containers/index';
import { contacts } from './Reducers/main'
import configureStore from './Store/store.config';

const store = configureStore(contacts);

render(
  <Root store={store} />,
  document.getElementById('app')
)

