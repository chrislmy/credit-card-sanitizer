import { types } from './actions';

const initialState = {
  result: {
    containsCardNumbers: false,
    sanitizationResult: '',
    cardNumberMatches: []
  },
  data: {
    input: 'Hi, my card is 4111*1111*1111*1111 maybe you should not store that in your database!',
    maskingCharacter: 'X',
    exposeFirst: '6',
    exposeLast: '4',
    cardNumberUpperBound: '16',
    cardNumberLowerBound: '15'
  }
};

const reducer = (state = initialState, { type, data }) => {
  switch (type) {
  case types.SUCCESS:
    return {
      ...state,
      result: data
    };
  default:
    return state;
  }
};

export default reducer;