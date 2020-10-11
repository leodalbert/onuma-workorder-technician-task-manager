import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

//  Material Ui
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './App.css';

import Routes from './components/routing/Routes';

// Material Ui Color Scheme
const theme = createMuiTheme({
  palette: {
    primary: {
      // Light Grey
      main: '#f3f3f4',
      light: '#ffffff',
      dark: '#c0c0c1',
    },
    secondary: {
      // Light Green
      main: '#d3e6df',
      light: '#ffffff',
      dark: '#a2b4ad',
    },
    info: {
      // Maroon
      main: '#ba3320',
      light: '#f3654a',
      dark: '#830000',
    },
  },
});

const App = () => {
  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <Router>
          <Route component={Routes} />
        </Router>
      </ThemeProvider>
    </Fragment>
  );
};

export default App;
