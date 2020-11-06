import { makeStyles } from '@material-ui/core/styles';

export const requestDetailsGridStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  lable: {
    padding: theme.spacing(1),
    fontWeight: 'bolder',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'left',
      padding: '6px',
    },
    [theme.breakpoints.up('sm')]: {
      textAlign: 'right',
    },
    color: theme.palette.text.primary,
  },
  selectLable: {
    textAlign: 'left',
    color: theme.palette.text.secondary,
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(1),
    },
    [theme.breakpoints.up('lg')]: {
      paddingLeft: theme.spacing(2),
    },
  },
  searchButton: {
    color: theme.palette.text.secondary,
    textTransform: 'none',
    height: '56px',
    marginTop: theme.spacing(2),
  },
  detail: {
    [theme.breakpoints.down('xs')]: {
      padding: '6px',
    },
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.primary,
  },
  buttonGroup: {
    marginLeft: theme.spacing(2),
    marginBottom: 15,
    color: theme.palette.text.primary,
  },
  redDetail: {
    [theme.breakpoints.down('xs')]: {
      padding: '6px',
    },
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.info.main,
  },
  floorPlan: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  lableGrid: {
    [theme.breakpoints.down('xs')]: {
      paddingBottom: '0px !important',
    },
  },
  detailGrid: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: '0px !important',
    },
  },
  commentField: {
    paddingTop: '50px',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '15%',
      paddingRight: '15%',
    },
    textAlign: 'left',
  },
  commentButton: {
    paddingTop: '30px',
    [theme.breakpoints.up('sm')]: {
      padding: '30px 0px 25px 15%',
      textAlign: 'left',
    },
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
      paddingBottom: '15px',
    },
  },
  helperText: {
    fontWeight: 'bolder',
    fontSize: '1rem',
  },
  commentFieldStyle: {
    maxWidth: '700px',
    '& label.Mui-focused': {
      color: theme.palette.common.black,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: theme.palette.secondary.main,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'black',
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.secondary.main,
      },
    },
  },
  formControl: {
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      minWidth: 280,
    },
    [theme.breakpoints.up('lg')]: {
      minWidth: 350,
    },
  },
  marginTop: {
    marginTop: theme.spacing(2),
  },
  spinnerDiv: {
    position: 'relative',
    top: '50%',
    left: '50%',
  },
  spinner: {
    color: theme.palette.secondary.main,
  },
}));

export const workOrderStyles = makeStyles((theme) => ({
  root: {
    margin: '20px 10%',
    [theme.breakpoints.down('xs')]: {
      margin: 0,
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  header: {
    backgroundColor: theme.palette.primary.main,
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    height: '30px',
  },
  expanded: {
    margin: 0,
    boxShadow: 'none',
  },
}));

export const summaryTableStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 500,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  urgent: {
    color: theme.palette.info.main,
  },
}));

export const taskDetailsGridStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  lable: {
    padding: theme.spacing(1),
    fontWeight: 'bolder',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'left',
      padding: '6px',
    },
    [theme.breakpoints.up('sm')]: {
      textAlign: 'right',
    },
    color: theme.palette.text.primary,
  },
  detail: {
    [theme.breakpoints.down('xs')]: {
      padding: '6px',
    },
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.primary,
  },
  lableGrid: {
    [theme.breakpoints.down('xs')]: {
      paddingBottom: '0px !important',
    },
  },
  detailGrid: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: '0px !important',
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 330,
  },
  forwardBtn: {
    float: 'right',
    [theme.breakpoints.down('xs')]: {
      float: 'left',
    },
  },
  selectLable: {
    padding: theme.spacing(1),
    fontWeight: 'bolder',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'left',
      padding: '6px',
    },
    [theme.breakpoints.up('sm')]: {
      textAlign: 'right',
      paddingTop: 30,
    },
    color: theme.palette.text.primary,
  },
  costHead: {
    backgroundColor: theme.palette.primary.main,
  },
  saveBtn: {
    backgroundColor: theme.palette.secondary.main,
    padding: '6px 24px',
  },
}));
