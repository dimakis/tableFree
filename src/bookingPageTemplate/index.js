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

    const [isBooking, toggle] = useToggleState(false)
    let tableBooking = table.filter(e => {
        if (e.isBooking)
            return e
    })
    let tab = tableBooking(table);
    let tabId = tab.id;
    {console.log("table in bookingPageTemplate: " + tab)}
    // (isBooking) {
    // table.filter((tab) => {
    //     tableId === ta
    //

    {/* {console.log('table: ' + table)} */ }
    return (
        <>
            <Nav />
            {console.log("table in bookingPageTemplate: " + tab)}
            {console.log('bpt tableId through props: ' + tableId + '\n')}

            <MatCard key={tabId} table={tab} />
            {/* {console.log('table: ' + table)} */}
        </>
    );
}
export default BookingPageTamplate;

