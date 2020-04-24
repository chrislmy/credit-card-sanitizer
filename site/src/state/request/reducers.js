import { types } from './actions';

const statuses = {
  LOADING: 'loading',
  SUCCESS: 'ok',
  ERROR: 'error'
};

const initialState = {};

const reducer = (state = initialState, { type, requestName }) => {
  switch (type) {
  case types.LOADING_DATA:
    return {
      ...state,
      [requestName]: {
        isLoading: true,
        status: statuses.LOADING
      }
    };
  case types.DATA_LOADED_SUCCESS:
    return {
      ...state,
      [requestName]: {
        isLoading: false,
        status: statuses.SUCCESS
      }
    };
  case types.DATA_LOADED_FAILURE:
    return {
      ...state,
      [requestName]: {
        isLoading: false,
        status: statuses.ERROR
      }
    };
  default:
    return state;
  }
};

export default reducer;