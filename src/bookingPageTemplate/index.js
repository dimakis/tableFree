import React, { useState, useContext } from "react";
import {TablesContext} from "../context/tablesContext";
import Card from "../components/Card";
import Nav from "../navBar/index";
import MatCard from "../components/MatCard";
import useToggleState from '../hooks/useToggleState'
import TablesList from "../tablesList/tablesList";

const BookingPageTamplate = ({ table, tableId, action}) => {
    
    const TablesContext = useContext(TablesContext)
    // const  = context.tableForBooking;
    // const tableId = table.id;
    // const table = props.params.table

    console.log("bpt first param table: " + table)
    console.log("bpt second param tableid: " + tableId)
    // const tableToBook = tablesContext.tables.filter((tab) => {
    //     return (tab.id === tableId ? tab : console.log('No ID match: Errort in bpt'));
    // }
    // );



    const [isBooking, toggle] = useToggleState(false)
    // let tableBooking = table.filter(e => {
    //     if (e.isBooking)
    //         return e
    // })
    // let tab = getTable(tableId);
    // let tabId = tab.id;
    // { console.log("table in bookingPageTemplate: " + tab) }
    // const getTableById = tableId => {
    //     context.state.tables.filter((tab) => {
    //         return (tab.id === tableId ? tab : console.log("Error, No table match"))
    //     }
    //     )

    // }
    // let tabToRend = getTableById(tableId)
    // let tabToRender = tabToRend[0]


    {/* {console.log('table: ' + table)} */ }
    return (
        <>
            <Nav />
            {/* {console.log("table in bookingPageTemplate: " + tabToRender)} */}
            {/* {console.log('bpt tableId through props: ' + tableId + '\n')} */}

            <TablesList 
            isBooking={isBooking}
            action={action} 
            table={table} />
            {/* {console.log('table: ' + table)} */}
        </>
    );
}
export default BookingPageTamplate;

