import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authUserContext";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MatCard from '../components/MatCard'
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 300,
        flexGrow: 3,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const TablesList = ({ tables, action }) => {
    const context = useContext(AuthContext);
    const classes = useStyles();
    const [tableIdFilter, setTableIdFilter] = useState("")
    let displayedTable = tables
        .filter(tab => {
            if (tab.isBooking)
                return tab.id === (tableIdFilter) !== -1;
        });


    // const tableBooking = tables =>
    //     tables.filter(e => {
    //         if (e.state.isBooked)
    //             tab = e;
    //         return e
    //     });
    // let tab = tableBooking(tables);
    // // let tabId = tab.id;
    // { console.log("table in tablesList: " + tab) }
    // this func needs to be altered at a later date for searching by isBooked
    // const handleChange = (type, value) => {
    //     if (type === "name") setNameFilter(value);
    //     else setGenreFilter(value);
    //   };
    //     tables.map(table => (
    console.log("tableList: " + tables)
    return (

        <>
            {/* {state.tables.length > 0 && */}
            {tables.map(table => (
                <div className={classes.root}>
                    <MatCard key={table.id.toString()} table={table} />
                </div>
            ))}
        </>
    )
};
export default TablesList