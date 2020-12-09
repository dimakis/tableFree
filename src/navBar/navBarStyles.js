import { makeStyles } from '@material-ui/core/styles';
import sizes from '../helpers/sizes';


export default makeStyles({
    header: {
        textAlign: 'center',
        '& h1': {
          color: 'white',
          margin: '5vh 0 0 0',
    
          fontSize: '3rem',
          fontWeight: '300',
          '& span': {
            fontWeight: '700'
          }, [sizes.down('xs')]: {
            fontSize: '4.5rem'
          }
          }
        },
        '& h2': {
          color: 'white',
          fontSize: '1rem',
          fontWeight: '300',
          [sizes.down('xs')]: {
            fontSize: '0.6rem'
          } 
      },
      '& ul': {
          color: 'white',
          fontSize: '1rem',
          fontWeight: '300',
          [sizes.down('xs')]: {
            fontSize: '0.6rem'
      }
    }
})