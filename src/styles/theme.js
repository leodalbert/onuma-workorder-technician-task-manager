import { createMuiTheme } from '@material-ui/core/styles';

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

export default theme;
