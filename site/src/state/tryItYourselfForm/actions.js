import axios from 'axios';
import config from '../../appConfig';
import { dataLoading, dataLoadingFailure, dataLoadingSuccess } from '../request/actions';
import { TRY_IT_YOURSELF } from '../request/requestNames';

const types = {
  FAILURE: 'tryItYourself/failure',
  SUCCESS: 'tryItYourself/success'
};

const submitSanitizerValues = () => async(dispatch, getState) => {
  const path = config.endpoints.lambda;
  const { 
    form: { 
      tryItYourselfForm: 
      { values } 
    } 
  } = getState();

  try {
    dispatch(dataLoading(TRY_IT_YOURSELF));
    const response = await axios.post(path, values, { timeout: config.api.timeout });
    const { data } = response;
    dispatch({ type: types.SUCCESS, data });
    dispatch(dataLoadingSuccess(TRY_IT_YOURSELF));
  } catch (error) {
    dispatch(dataLoadingFailure(TRY_IT_YOURSELF));
  }
};

export {
  types,
  submitSanitizerValues
};