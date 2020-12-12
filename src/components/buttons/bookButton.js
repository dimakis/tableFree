import React from "react";
import { Link } from "react-router-dom";
import { TablesContext } from '../../context/tablesContext'
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/Button';
import { Typography } from "@material-ui/core";
import BookTwoToneIcon from '@material-ui/icons/BookTwoTone';
import useToggleState from '../../hooks/useToggleState'

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
    const context = React.useContext(TablesContext)
    const classes = useStyles()
    const tabId = table.id
    const state = context.state
    const [isBooking, toggle] = useToggleState(false)





    const handleAddToBooking = e => {
        // e => isBooking.toggle()a
        console.log("@bookButton, handleAddTooBooking")
        e.preventDefault();
        context.addBookingToTable(table.id)
    }
    return (
        <div className={classes.root}>
            <Link to={{
                pathname: `/bookingPage/${table.id}`,
                table: { table },
                state: { ...state },
            }}>
                <IconButton on click={handleAddToBooking} size={"large"} color="primary" href="#outlined-buttons">
                    <h2>Table {tabId}-></h2>
                    <BookTwoToneIcon className={classes.root} />
                </IconButton>
                {/* <Route 
            exact path="/bookingPage/:id/"
            table= */}
            </Link>
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

export default BookButton;