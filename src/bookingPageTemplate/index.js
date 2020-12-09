import React, { useState, useContext } from "react";
import { AuthContext } from "../App";
import Card from "../components/Card";
import Nav from "../navBar/index";
import MatCard from "../components/MatCard";
import useToggleState from '../hooks/useToggleState'

const BookingPageTamplate = ({ table, tableId }) => {
    const context = useContext(AuthContext)
    const tableToBook = context.table;
    // const tableId = table.id;
    // const table = props.params.table
    // const tables = context.tables.map(tab =>
    //     tab.isBooking ? tables = tab :tables = tab);

    console.log("bpt second param tableId: " + tableId)
    const [isBooking, toggle] = useToggleState(false)
    // let tableBooking = table.filter(e => {
    //     if (e.isBooking)
    //         return e
    // })
    // let tab = getTable(tableId);
    // let tabId = tab.id;
    // { console.log("table in bookingPageTemplate: " + tab) }
    const getTableById = tableId => {
        context.state.tables.filter((tab) => {
            return (tab.id === tableId ? tab: console.log("Error, No table match"))
        }
        )

    }
    let tabToRend = getTableById(tableId)
    let tabToRender  = tabToRend[0]


    {/* {console.log('table: ' + table)} */ }
    return (
        <>
            <Nav />
            {console.log("table in bookingPageTemplate: " + tabToRender)}
            {console.log('bpt tableId through props: ' + tableId + '\n')}

            <MatCard key={tableId} table={tabToRender} />
            {/* {console.log('table: ' + table)} */}
        </>
    );
}
export default BookingPageTamplate;

