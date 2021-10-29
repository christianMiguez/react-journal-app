import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
// thunk es un middleware que nos permite ejecutar funciones asincronas
import thunk from 'redux-thunk'
import { authReducer } from "../reducers/authReducer";
import { uiReducer } from '../reducers/uiReducer';
import { notesReducer } from '../reducers/notesReducer';

// aqui se crea el store de redux y se le pasan los reducers que se van a utilizar en el store y el compose sirve para que se pueda utilizar el redux devtools en el navegador
// los reducers sirven para que el store sepa que estado va a tener y que reducer va a utilizar para cada estado. 
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
	auth: authReducer,
	ui: uiReducer,
	notes: notesReducer
});

export const store = createStore(
	reducers, composeEnhancers(applyMiddleware(thunk))
);
