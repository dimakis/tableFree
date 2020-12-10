import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/authUserContext'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const BookButton = ({ table }) => {
    const context = React.userContext(AuthContext)
    const classes = useStyles()
    let tabId = table.id
    const handleAddToBooking = e => {
        e.preventDefault();
        context.addBookingToTable(table.id)
    }
    return (
        <div className={classes.root}>
            <Button on click={handleAddToBooking} variant="outlined" color="primary" href="#outlined-buttons">
                    Table {tabId}
            </Button>
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