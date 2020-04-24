import React from 'react';
import { connect } from 'react-redux';
import { Typography, makeStyles } from '@material-ui/core';
import Divider from '../../components/Divider';
import CodeBlock from '../../components/CodeBlock';
import PropTypes from 'prop-types';
import LoadingSpinner from '../LoadingSpinner';
import { TRY_IT_YOURSELF } from '../../state/request/requestNames';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative'
  },
  panel: {
    marginTop: theme.spacing(1.5),
    border: '1px #b2aeae solid',
    borderRadius: '0.5rem 0.5rem 0 0',
    padding: theme.spacing(1.5)
  }
}));

const SanitizerCodeBlock = ({ input, maskingCharacter, exposeFirst, exposeLast, cardNumberUpperBound, cardNumberLowerBound }) => {
  const classes = useStyles();
  const codeSnippet = `
  String input = "${input}";
  
  SanitizerConfig config = SanitizerConfig.builder()
        .exposeFirst(${exposeFirst})
        .exposeLast(${exposeLast})
        .maskingCharacter('${maskingCharacter}')
        .cardNumberUpperBound(${cardNumberUpperBound})
        .cardNumberLowerBound(${cardNumberLowerBound})
        .invalidSeparators(new char[]{'*', ' ', '-'})
        .build();

  CardNumberSanitizer sanitizer = new CardNumberSanitizer(config);
  SanitizationResult sanitizationResult = defaultSanitizer.deepSanitize(input);

  System.out.println(sanitizer.sanitize(input));
  System.out.println("Masked card numbers");
  for (CardNumberMatch match : sanitizationResult.cardNumberMatches()) {
    System.out.println(match.maskedPayload());
  }
  `;

  return (
    <div className={classes.root}>
      <LoadingSpinner loadingRequestName={TRY_IT_YOURSELF}/>
      <div className={classes.panel}>
        <Typography variant="h4">Code</Typography>
        <Divider />
        <CodeBlock codeSnippet={codeSnippet} language="java" />
      </div>
    </div>
  );
};

SanitizerCodeBlock.propTypes = {
  input: PropTypes.string,
  exposeFirst: PropTypes.string,
  maskingCharacter: PropTypes.string,
  exposeLast: PropTypes.string,
  cardNumberUpperBound: PropTypes.string,
  cardNumberLowerBound: PropTypes.string
};

const mapStateToProps = ({ 
  form : { 
    tryItYourselfForm: { 
      values: {
        input,
        maskingCharacter,
        exposeFirst,
        exposeLast,
        cardNumberLowerBound,
        cardNumberUpperBound
      } 
    } 
  } 
}) => ({ input, maskingCharacter, exposeFirst, exposeLast, cardNumberLowerBound, cardNumberUpperBound });

export default connect(mapStateToProps)(SanitizerCodeBlock);