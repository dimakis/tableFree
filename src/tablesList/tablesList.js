import React, { useContext, useState } from "react";
import { AuthContext } from "../App";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MatCard from '../components/MatCard'
import { Box } from "@material-ui/core";
import {TablesContext,  TabContextProvider } from '../context/tablesContext'

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

const TablesList = ({ isBooking, tableForBooking, tables, action }) => {
    const context = useContext(TablesContext);
    const classes = useStyles();
    const [tableIdFilter, setTableIdFilter] = useState("")
    const tab4book = context.tableForBooking;
    console.log("@tablesList, tab4Book through context grab: " + tab4book +"\ntab4Book typeof:" + typeof tab4book)
    // let displayedTable = tables
    //     .filter(tab => {
    //         if (tab.isBooking)
    //             return tab.id === (tableIdFilter) !== -1;
    //     });


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
    console.log("@tableList, isBooking?: "+ isBooking)
    return (
               <>
            {/* {state.tables.length > 0 && */}
            {isBooking ?

                // console.log("@tableList, table isBooking: true\ntypeof" + typeof table) &&
                <div className={classes.root}>
                    <MatCard key={tableForBooking.id.toString()} table={tableForBooking} />
                </div>
                : tables.map(table => (
                    <div className={classes.root}>
                        <MatCard key={table.id.toString()} table={table} />
                    </div>
                ))
                // &&
                // console.log("@tableList, table isBooking: false\ntypof" + typeof table)
            }
        </>

    )
};
export default TablesList