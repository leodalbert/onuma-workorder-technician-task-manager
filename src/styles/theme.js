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
  spacing: 5,
  overrides: {
    MuiSelect: {
      select: {
        '&:focus': {
          backgroundColor: '$labelcolor',
        },
      },
    },
    MuiTooltip: {
      tooltip: {
        fontSize: '14px',
      },
    },

    MuiTableCell: {
      root: {
        padding: '12px 0px',
      },
    },
  },
});

export default theme;
