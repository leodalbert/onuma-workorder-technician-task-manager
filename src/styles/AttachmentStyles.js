import { makeStyles } from '@material-ui/core/styles';

export const attachmentPageStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  media: {
    height: 'auto',
    width: '100%',
  },
  content: {
    padding: '6px 16px',
    justifyContent: 'space-between',
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    verticalAlign: 'middle',
    display: 'inline-flex',
  },
}));

export const dropzoneStyles = makeStyles((theme) => ({
  item: {
    marginTop: theme.spacing(2),
  },
  btn: {
    margin: theme.spacing(1),
  },
  btns: {
    [theme.breakpoints.up('sm')]: {
      textAlign: 'right',
    },
  },
}));
