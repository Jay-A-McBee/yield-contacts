import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import contactSaga from '../Middleware/saga.js';

export default function configureStore(initialState) {
const sagaMiddleware = createSagaMiddleware();
  
let baseStore = createStore(
	initialState,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run( contactSaga );

return baseStore;

}


