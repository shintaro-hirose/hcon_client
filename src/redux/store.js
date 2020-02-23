import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import { getFirestore} from 'redux-firestore';
import { getFirebase } from 'react-redux-firebase';


const initialState = {}

const middleware = [thunk.withExtraArgument({getFirebase, getFirestore})];


const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
);
const store = createStore(rootReducer,initialState, enhancer);

export default store;