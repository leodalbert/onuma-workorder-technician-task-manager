import { makeStyles } from '@material-ui/core/styles';
export const headerStyles = makeStyles((theme) => ({
  toolbar: {
    justifyContent: 'space-between',
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    maxHeight: '70%',
    maxWidth: 65,
  },
  title: {
    textAlign: 'left',
  },
  btn: {
    marginLeft: '140px',
  },
}));
