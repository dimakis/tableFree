import React, { useState, useEffect } from "react";
import { Redirect, Link, BrowserRouter as Router, Route, withRouter, useHistory } from "react-router-dom";
import { TablesContext, TablesDispatchContext } from '../../context/tablesContext'
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core/Button';
import Button from '@material-ui/core/Button';
import { Typography } from "@material-ui/core";
import BookTwoToneIcon from '@material-ui/icons/BookTwoTone';
import useToggleState from '../../hooks/useToggleState'
import TableBookingPage from '../../views/bookingPageView'
import RedirectCom from '../RedirectComponent'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
        icon: {
            minWidth: '30px'
        }
    },
}));


const BookButton = ({ table }) => {
    const [redirectState, setRedirectState] = useState(false)
    const context = React.useContext(TablesContext)
    const dispatchContext = React.useContext(TablesDispatchContext)

    const classes = useStyles()
    const tabId = table.id
    const state = context.state
    const [isBooking, toggle] = useToggleState(false)

    let redirectTo
    const navigate = state => {

    }

    const handleAddToBooking = e => {
        // e => isBooking.toggle()a
        console.log("@bookButton, handleAddTooBooking, table: " + table)
        e.preventDefault();
        dispatchContext({ type: "BOOK_TABLE", payload: table })
        context.addBookingToTable(table.id)
        let path = `/bookingPage/${table.id}`
        setRedirectState(true)
        // <RedirectCom path={path}   />
    }
    return (
        <div className={classes.root}>
            <Router>
                <Link to={{
                    pathname: `/bookingPage/${table.id}`,
                    table: { table },
                    state: { ...state },
                }}>
                    <Button onClick={handleAddToBooking} table={table} size={"large"} color="primary"  >
                        <h2>Table {tabId}-></h2>
                        <BookTwoToneIcon className={classes.root} />
                    </Button>
                    {state.isBooking ? <Redirect to={{
                        pathname: `/bookingPage/${table.id}`,
                        table: { table },
                        state: { ...state },
                    }} /> : null}
                    {/* return(<Redirect table={table} to="BookingPage" />) */}

                </Link>
            </Router>
        </div>
    )
};

//     return (
//         <>
//         <Link to=""
//         // <button
//         type="button"
//         className="btn w-100 btn-primary "
//             // onClick={() => }
//      >

//         {/* </button> */}
//         </>
//     )
// };

export default withRouter(BookButton)