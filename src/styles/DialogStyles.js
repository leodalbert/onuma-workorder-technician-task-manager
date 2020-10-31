import { makeStyles } from '@material-ui/core/styles';

export const componentDetailGridStyles = makeStyles((theme) => ({
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
      paddingBottom: '0px !important',
    },
  },
  dialogContent: {
    [theme.breakpoints.down('xs')]: {
      padding: '16px 6px',
    },
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

export const componentSearchGridStyles = makeStyles((theme) => ({
  lable: {
    padding: theme.spacing(1),
    fontWeight: 'bolder',
    textAlign: 'right',
    color: theme.palette.text.primary,
  },
  detail: {
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.primary,
  },
  textFieldGrid: {
    margin: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      padding: 0,
      margin: 0,
    },
  },
  textField: {
    minWidth: '90%',
    maxWidth: '90%',
    paddingRight: 0,
    [theme.breakpoints.down('xs')]: {
      minWidth: '100%',
    },
    '& .MuiOutlinedInput-adornedEnd ': {
      paddingRight: 0,
    },
    '& .MuiButton-outlinedSizeLarge ': {
      padding: '14px 16px',
    },
  },
  textFieldTitle: {
    color: theme.palette.grey[800],
    margin: theme.spacing(1.5),
  },
  spaceGrid: {
    padding: theme.spacing(1),
  },
  buttonGroup: {
    marginLeft: theme.spacing(2),
    marginBottom: 15,
    color: theme.palette.text.primary,
  },
}));
