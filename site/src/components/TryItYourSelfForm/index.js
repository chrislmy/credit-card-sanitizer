import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { validate } from './validator';
import { submitSanitizerValues } from '../../state/tryItYourselfForm/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormLabel-root': {
      marginTop: 0,
    }
  },
  textFieldWrapper: {
    marginTop: theme.spacing(1.5),
  },
  buttons: {
    marginTop: theme.spacing(1.5),
  },
  undoButton: {
    marginLeft: theme.spacing(1),
  },
  textFieldGrid: {
    marginRight: theme.spacing(1),
    width: '49%'
  }
}));

const renderTextField = ({
  label,
  placeholder,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    label={label}
    placeholder={placeholder}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
    rowsMax={4}
  />
);

const TryItYourselfFormView = (props) => {
  const { handleSubmit, reset, submitting, invalid } = props;
  const classes = useStyles();

  return (
    <form className={classes.root}>
      <div className={classes.textFieldWrapper}>
        <Field
          label="Input"
          name="input"
          multiline
          component={renderTextField}
          placeholder="Enter the input you want to sanitize"
          fullWidth
        />
      </div>
      <div className={classes.textFieldWrapper}>
        <Field
          label="Masking Character"
          name="maskingCharacter"
          component={renderTextField}
          placeholder="Character used to mask digits of the credit number"
          fullWidth
        />
      </div>
      <div className={classes.textFieldWrapper}>
        <Field
          className={classes.textFieldGrid}
          label="Expose First"
          name="exposeFirst"
          component={renderTextField}
          placeholder="Number of leading digits of the credit card number to leave unmasked"
        />
        <Field
          className={classes.textFieldGrid}
          label="Expose Last"
          name="exposeLast"
          component={renderTextField}
          placeholder="Number of trailing digits of the credit card number to leave unmasked"
        />
      </div>
      <div className={classes.textFieldWrapper}>
        <Field
          className={classes.textFieldGrid}
          label="Card Number Upper Bound"
          name="cardNumberUpperBound"
          component={renderTextField}
          placeholder="Upper boundary of card number digits when the sanitizer searches for card numbers"
        />
        <Field
          className={classes.textFieldGrid}
          label="Card Number Upper Bound"
          name="cardNumberLowerBound"
          component={renderTextField}
          placeholder="Lower boundary of card number digits when the sanitizer searches for card numbers"
        />
      </div>
      <div className={classes.buttons}>
        <Button
          variant="outlined"
          color="primary"
          disabled={submitting || invalid}
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <Button
          className={classes.undoButton}
          variant="outlined"
          color="primary"
          disabled={submitting}
          onClick={reset}
        >
          Undo Changes
        </Button>
      </div>
    </form>
  );
};

const mapStateToProps = (state) => ({
  initialValues: state.tryItYourselfForm.data,
});

const mapDispatchToProps = (dispatch) => ({
  handleSubmit: () => {
    dispatch(submitSanitizerValues());
  },
});

const TryItYourselfReduxForm = reduxForm({
  form: 'tryItYourselfForm',
  validate,
  destroyOnUnmount: false
})(TryItYourselfFormView);

const TryItYourselfForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(TryItYourselfReduxForm);

export default TryItYourselfForm;
