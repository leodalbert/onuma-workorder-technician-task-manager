import { makeStyles } from '@material-ui/core/styles';
export const headerStyles = makeStyles((theme) => ({
  toolbar: {
    justifyContent: 'space-between',
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    height: 65,
    widht: 65,
  },
  title: {
    textAlign: 'left',
    margin: 'auto',
    paddingLeft: theme.spacing(3),
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
}));
