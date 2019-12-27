import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const breakpoints = createBreakpoints({});

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto", sans-serif',
    h1: {
      fontFamily: '"Roboto", sans-serif',
      fontSize: '2.4em',
      fontWeight: 600,
      color: '#fff',
      [breakpoints.down('sm')]: {
        fontSize: '1.8em'
      }
    },
    h2: {
      fontFamily: '"Open Sans", sans-serif',
      fontSize: '1.6em',
      fontWeight: 400,
      color: '#fff',
      [breakpoints.down('sm')]: {
        fontSize: '1.3em'
      }
    },
    h3: {
      fontFamily: '"Open Sans", sans-serif',
      fontSize: '1.2em',
      fontWeight: 800,
      [breakpoints.down('sm')]: {
        fontSize: '1em'
      }
    },
    h4: {
      fontFamily: '"Open Sans", sans-serif',
      fontSize: '1em',
      fontWeight: 600,
      [breakpoints.down('sm')]: {
        fontSize: '0.8em'
      }
    },
    body1: {
      fontFamily: '"Open Sans", sans-serif',
      fontSize: '1em',
      fontWeight: 500,
      lineHeight: 1.5,
      marginTop: '1rem',
      [breakpoints.down('sm')]: {
        fontSize: '0.8em'
      }
    },
    button: {
      fontFamily: '"Open Sans", sans-serif',
      fontSize: '1em',
      [breakpoints.down('sm')]: {
        fontSize: '0.8em'
      }
    }
  },
  shape: {
    borderRadius: 5
  }
});

export default theme;
