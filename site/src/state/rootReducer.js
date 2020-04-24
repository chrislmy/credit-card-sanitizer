import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import tryItYourselfForm from './tryItYourselfForm/reducer';
import requests from '../state/request/reducers';

export const rootReducer = combineReducers({
  requests,
  tryItYourselfForm,
  form: formReducer,
});

