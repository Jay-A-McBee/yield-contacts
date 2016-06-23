import { createStore, applyMiddleware } from 'redux';
import customThunk from '../Middleware/asyncMiddleware.js';

export default function configureStore(initialState) {
  return createStore(
  	initialState,
    applyMiddleware( customThunk )
  );
}