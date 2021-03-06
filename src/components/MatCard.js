import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Link, withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// import { AuthContext } from "../App";
import AuthContext from "../context/loggedInContext";
import { Box } from '@material-ui/core';
import BookingPageTemplate from '../bookingPageTemplate/index'
import useToggleState from '../hooks/useToggleState';
import { Home } from '../components/Home'
import BookButton from '../components/buttons/bookButton'
import {TablesContext, TabContextProvider } from '../context/tablesContext';

const useStyles = makeStyles({
  root: {
    flexgrow: 3,
    minWidth: 340,
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

function MatCard({ table, action, isBooking }) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const authContext = useContext(AuthContext)
  const tablesContext = useContext(TablesContext)
  const [selectedTableState, setSelectTableState] = React.useState([]);
  const state = tablesContext.state;
  let timeSlots = []
  console.log("table in matcard: " + table.id)
  for (var ts of table.timeSlots) {
    timeSlots.push(ts)
    // console.log("timeSlot: " + ts.time)

    // console.log("isBooked: " + ts.isBooked)
  }
  // console.log("timeSlot size: " + timeSlots.length)
  // if (tis.isBooked)   {
  //     return(
  // <
  //     );
  // const bookTable = e => {
  //   e.preventDefault();
  //   context.addToTableBooking(table.id);
  // };
  const tab = ({ match }) => (
    <div>
      {match.params.tableId}
    </div>
  )
  const addTableToBookingList = tableID => {
    const tableToBook = tablesContext.tables.filter((tabl) => {
      return tableID === tabl.id
    }
    )

  }

                {/* <Button table={table} key={table.id} /> */}
  console.log("@matCard, isBooking?: " + isBooking)
  // if (tableToBook === null) {
  // if (isBooking) {

  //   return (
  //     <Router>
  //       <Card className={classes.root} variant="outlined">
  //         <CardContent>
  //           {console.log('table.id: ' + table.id)}
  //           <Typography className={classes.paragraph}>
  //             <Link to={{
  //               pathname: `/bookingPage/${table.id}`,
  //               state: {
  //                 table: table,
  //               },
  //             }}>
  //               <h2 onClick={addTableToBookingList}>Table: {table.id}</h2>
  //             </Link>
  //             {action(table)}
  //             <Route exact path="/bookingPage/:tableId" render={props => <BookingPageTemplate table={table} tableId={table.id} />}
  //             />
  //             <>
  //               {/* // }} onClick={bookTable}> */}
  //               {timeSlots.map(tis =>
  //                 (
  //                   <p key={tis.time.toString()}>  Time: {tis.time}, Is booked: {tis.isBooked.toString()} </p>
  //                 ))
  //               }
  //             </>
  //           </Typography>


  //           {/* {console.log('MatCard tableId through props: ' + table.Id)} */}
  //           <Typography className={classes.title} color="textSecondary" gutterBottom>
  //             Word of the Day
  //       </Typography>
  //           <Typography variant="h5" component="h2">
  //             be{bull}nev{bull}o{bull}lent
  //       </Typography>
  //           <Typography className={classes.pos} color="textSecondary">
  //             adjective
  //       </Typography>
  //           <Typography variant="body2" component="p">
  //             well meaning and kindly.
  //         <br />
  //             {'"a benevolent smile"'}
  //           </Typography>
  //         </CardContent>
  //         <CardActions>
  //           <Button size="small">Learn More</Button>
  //         </CardActions>
  //       </Card>
  //     </Router>
  //   );
  // } else {
    return (
      <TabContextProvider>
        <Card className={classes.root} variant="outlined">
          <CardContent>

            <Typography className={classes.paragraph}>
           
              <BookButton table={table} key={table.id}/> 
              <>
                {/* // }} onClick={bookTable}> */}
                {timeSlots.map(tis =>
                  (
                    <p key={tis.time.toString()}>  Time: {tis.time}, Is booked: {tis.isBooked.toString()} </p>
                  ))
                }
              </>
            </Typography>
          </CardContent>
        </Card>
      </TabContextProvider>

    )
  }
// }
export default withRouter(MatCard)