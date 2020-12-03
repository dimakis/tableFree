import React, {useContext} from 'react';
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { AuthContext } from "../App";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  paragraph: {
      fontFamily: 'Courier New'
  }
});

export default function MatCard({table}) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const context = useContext(AuthContext)
  let  timeSlots =[]
  for (var ts of table.timeSlots)  {
    timeSlots.push(ts)
    console.log("timeSlot: " + ts.time)

    console.log("isBooked: " + ts.isBooked)
  }
  console.log("timeSlot size: " + timeSlots.length)
// if (tis.isBooked)   {
//     return(
// <
//     );
// }
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
          <Link to={`/bookingPage/${table.id}`} >
          <Typography className={classes.paragraph}>
      <h2>Table: {table.id}</h2>
        <>
        {timeSlots.map( tis => 
        (
          <p key={tis.time.toString()}>  Time: {tis.time} Is booked: {tis.isBooked.toString()} </p>  
        )) 
    }
        </>
     </Typography>     
        </Link>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="h2">
          be{bull}nev{bull}o{bull}lent
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
