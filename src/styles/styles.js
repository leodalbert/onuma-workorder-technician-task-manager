import { makeStyles } from '@material-ui/core/styles';

export const layoutStyles = makeStyles(
  (theme) => ({
    root: {
      flexGrow: 1,
    },
    accordionHeader: {
      backgroundColor: theme.palette.primary.main,
      borderBottom: '1px solid rgba(0, 0, 0, .125)',
      height: '30px',
    },
    accordionHeading: {
      fontSize: theme.typography.pxToRem(20),
      fontWeight: theme.typography.fontWeightMedium,
    },
    accordionRoot: {
      margin: '20px 10%',
      [theme.breakpoints.down('xs')]: {
        margin: 0,
      },
    },
    backgroundColorMain: {
      backgroundColor: theme.palette.primary.main,
    },
    commentField: {
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
    commentFieldHelperText: {
      fontWeight: 'bolder',
      fontSize: '1rem',
    },
    dashboardTable: {
      minWidth: 500,
    },
    detailCtr: {
      [theme.breakpoints.down('xs')]: {
        paddingTop: '0px !important',
      },
    },
    detailSelectCtr: {
      [theme.breakpoints.down('xs')]: {
        paddingBottom: theme.spacing(1),
      },
      textAlign: 'left',
      color: theme.palette.text.primary,
    },
    detailRed: {
      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(1),
      },
      padding: theme.spacing(1),
      textAlign: 'left',
      color: theme.palette.info.main,
    },
    detailStyle: {
      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(1),
      },
      textAlign: 'left',
      paddingTop: theme.spacing(2),
      color: theme.palette.text.primary,
    },
    dialogContentDivider: {
      [theme.breakpoints.down('xs')]: {
        padding: '16px 6px',
      },
      floorPlan: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
      },
      formControl: {
        [theme.breakpoints.down('md')]: {
          minWidth: 280,
        },
        [theme.breakpoints.up('lg')]: {
          minWidth: 350,
        },
      },
    },
    labelStyle: {
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
    labelStyleSelect: {
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
    lableStyleHourSelect: {
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
    labelCtr: {
      [theme.breakpoints.down('xs')]: {
        paddingBottom: '0px !important',
      },
    },
    navbarContainer: {
      justifyContent: 'space-between',
      display: 'flex',
      alignItems: 'center',
    },
    navbarLogo: {
      height: 65,
      widht: 65,
    },
    navbarTitleContainer: {
      display: 'flex',
      justifyContent: 'center',
    },
    navbarTitle: {
      textAlign: 'left',
      margin: 'auto',
      paddingLeft: theme.spacing(3),
    },
    searchDialogTextFieldCtr: {
      margin: theme.spacing(2),
      [theme.breakpoints.down('xs')]: {
        padding: 0,
        margin: 0,
      },
    },
    searchDialogTextFieldtitle: {
      color: theme.palette.grey[800],
      margin: theme.spacing(1.5),
    },
    searchDialogTextField: {
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
    statusCtrSpacing: {
      margin: '20px 10%',
      [theme.breakpoints.down('xs')]: {
        margin: 0,
      },
    },
    statusHeader: {
      padding: theme.spacing(2),
      backgroundColor: theme.palette.primary.main,
      textAlign: 'left',
      [theme.breakpoints.down('xs')]: {
        textAlign: 'center',
      },
    },
    tableCell: {
      '& .MuiTableCell-root': {
        paddingLeft: '10px',
      },
    },
    taskHead: {
      fontWeight: 'bolder',
    },
    taskRoot: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
    urgentFont: {
      color: theme.palette.info.main,
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
  }),
  { index: 1 }
);

export const componentStyles = makeStyles(
  (theme) => ({
    arrowUp: {
      color: theme.palette.common.black,
    },
    attachmentContent: {
      padding: '6px 16px',
      justifyContent: 'space-between',
      display: 'flex',
      alignItems: 'center',
      '&:last-child': {
        paddingBottom: '6px',
      },
    },
    attachmentIcon: {
      verticalAlign: 'middle',
      display: 'inline-flex',
      marginRight: '0px 12px 0px 6px',
    },
    attachmentMedia: {
      height: 'auto',
      width: '100%',
    },
    commentBtnCtr: {
      padding: '12px 0px',
      [theme.breakpoints.up('sm')]: {
        textAlign: 'right',
      },
      [theme.breakpoints.down('xs')]: {
        textAlign: 'center',
        paddingBottom: '15px',
      },
    },
    btnBreak: {
      textAlign: 'right',
      [theme.breakpoints.down('xs')]: {
        textAlign: 'center',
      },
    },
    btnClose: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    btnGroup: {
      marginBottom: theme.spacing(2),
      color: theme.palette.text.primary,
    },
    btnGroupComponentSearch: {
      marginLeft: theme.spacing(2),
      marginBottom: 15,
      color: theme.palette.text.primary,
    },
    btnRight: {
      [theme.breakpoints.up('sm')]: {
        textAlign: 'right',
      },
    },
    btnWidth: {
      width: '190px',
    },
    saveTextBreak: {
      textAlign: 'center',
      [theme.breakpoints.up('lg')]: {
        textAlign: 'right',
      },
    },
    spinnerDiv: {
      position: 'relative',
      top: '45%',
      left: '45%',
    },
    spinner: {
      color: theme.palette.secondary.main,
    },
  }),
  { index: 1 }
);

export const spacingStyles = makeStyles(
  (theme) => ({
    paddingS: {
      padding: theme.spacing(2),
    },
    paddingM: {
      padding: theme.spacing(3),
    },
    paddingL: {
      padding: theme.spacing(5),
    },
    paddingTopS: {
      paddingTop: theme.spacing(2),
    },
    paddingTopM: {
      paddingTop: theme.spacing(3),
    },
    paddingTopL: {
      paddingTop: theme.spacing(5),
    },
    paddingBottomS: {
      paddingBottom: theme.spacing(2),
    },
    paddingBottomM: {
      paddingBottom: theme.spacing(3),
    },
    paddingBottomL: {
      paddingBottom: theme.spacing(5),
    },
    marginS: {
      margin: theme.spacing(2),
    },
    marginTopS: {
      marginTop: theme.spacing(2),
    },
    marginTopM: {
      marginTop: theme.spacing(3),
    },
    marginTopL: {
      marginTop: theme.spacing(5),
    },
    marginBottomS: {
      marginBottom: theme.spacing(2),
    },
    marginBottomM: {
      marginBottom: theme.spacing(3),
    },
    marginBottomL: {
      marginBottom: theme.spacing(5),
    },
    noPadding: {
      padding: 0,
    },
  }),
  { index: 1 }
);
