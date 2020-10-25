import { makeStyles } from '@material-ui/core/styles';

export const previousTaskStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  head: {
    fontWeight: 'bolder',
  },
  arrowUp: {
    color: theme.palette.common.black,
  },
  table: {
    minWidth: 375,
  },
}));
