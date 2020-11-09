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
    },
    [theme.breakpoints.up('sm')]: {
      textAlign: 'right',
    },
    color: theme.palette.text.primary,
  },
  selectLable: {
    textAlign: 'left',
    color: theme.palette.text.primary,
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },

    '& .MuiFilledInput-input': {
      padding: '8.5px 14px',
      backgroundColor: theme.palette.primary.main,
      boxShadow:
        '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
    },
    '& .MuiSelect-select': {
      borderRadius: '4px',
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
      padding: theme.spacing(1),
    },
    textAlign: 'left',
    paddingTop: theme.spacing(2),
    color: theme.palette.text.primary,
  },
  selectDetail: {
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(1),
    },
    textAlign: 'left',
    color: theme.palette.text.primary,
  },
  buttonGroup: {
    // marginLeft: theme.spacing(2),
    pading: '5px',
    marginBottom: theme.spacing(2),
    color: theme.palette.text.primary,
  },
  textBtn: {
    justifyContent: 'left',
  },
  closeBtn: {
    width: '36px',
  },
  redDetail: {
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1),
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
    padding: '12px 0px',
    [theme.breakpoints.up('sm')]: {
      // padding: '15px 0px 21px 15%',
      textAlign: 'right',
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
  marginBottom: {
    marginBottom: theme.spacing(2),
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
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightMedium,
  },
  header: {
    backgroundColor: theme.palette.primary.main,
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    height: '30px',
  },
  expanded: {
    margin: 0,
    // border around accordion
    // boxShadow: 'none',
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
  commentButton: {
    // padding: '12px 0px',
    [theme.breakpoints.up('sm')]: {
      // padding: '15px 0px 21px 15%',
      textAlign: 'right',
    },
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
    textAlign: 'left',
    paddingTop: '7px',
    color: theme.palette.text.primary,
  },
  lableGrid: {
    [theme.breakpoints.down('xs')]: {
      paddingBottom: '0px !important',
    },
  },

  buttonDetailGrid: {
    textAlign: 'right',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
      paddingTop: '0px !important',
    },
  },
  detailGrid: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: '0px !important',
    },
  },
  formControl: {
    margin: theme.spacing(1),
    // minWidth: 330,
  },
  btnBreak: {
    textAlign: 'right',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
  selectLable: {
    // padding: theme.spacing(1),
    fontWeight: 'bolder',
    backgroundColor: theme.palette.primary.main,
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
  hourSelectLable: {
    padding: theme.spacing(1),
    fontWeight: 'bolder',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'left',
      padding: '6px',
    },
    [theme.breakpoints.up('sm')]: {
      textAlign: 'right',
      paddingTop: 20,
    },
    color: theme.palette.text.primary,
  },
  saveTextBreak: {
    textAlign: 'center',
    [theme.breakpoints.up('lg')]: {
      textAlign: 'right',
    },
  },
  tableCell: {
    '& .MuiTableCell-root': {
      paddingLeft: '10px',
    },
  },
  costBtn: {
    width: '190px',
    [theme.breakpoints.up('lg')]: {
      padding: '7px 15px',
    },
  },
  costHead: {
    backgroundColor: theme.palette.primary.main,
  },
  saveBtn: {
    backgroundColor: theme.palette.secondary.main,
    width: '190px',
    padding: '6px 24px',
  },
}));
