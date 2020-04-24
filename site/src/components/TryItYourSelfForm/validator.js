const validate = values => {
  const errors = {};
  const requiredFields = [
    'input',
    'maskingCharacter',
    'exposeFirst',
    'exposeLast',
    'cardNumberUpperBound',
    'cardNumberLowerBound'
  ];

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });

  if (values.maskingCharacter && values.maskingCharacter.length > 1) {
    errors.maskingCharacter = 'Must be a singular character';
  }

  if (isNaN(Number(values.exposeFirst))) {
    errors.exposeFirst = 'Must be a number';
  }

  if (isNaN(Number(values.exposeLast))) {
    errors.exposeLast = 'Must be a number';
  }

  if (isNaN(Number(values.cardNumberUpperBound))) {
    errors.cardNumberUpperBound = 'Must be a number';
  } else if (values.cardNumberUpperBound < 13 || values.cardNumberUpperBound > 19) {
    errors.cardNumberUpperBound = 'Upper bound must be between 13 and 19';
  }

  if (isNaN(Number(values.cardNumberLowerBound))) {
    errors.cardNumberLowerBound = 'Must be a number';
  } else if (values.cardNumberLowerBound < 13 || values.cardNumberLowerBound > 19) {
    errors.cardNumberLowerBound = 'Lower bound must be between 13 and 19';
  }

  if (values.cardNumberLowerBound > values.cardNumberUpperBound) {
    errors.cardNumberUpperBound = 'Upper bound must be greater than lower bound';
    errors.cardNumberLowerBound = 'Lower bond must be smaller than upper bound';
  }

  return errors;
};

export {
  validate
};