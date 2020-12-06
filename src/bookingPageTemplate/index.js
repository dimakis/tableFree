import React, { useState, useContext } from "react";
import { AuthContext } from "../App";
import Card from "../components/Card";
import Nav from "../navBar/index";
import MatCard from "../components/MatCard";

const BookingPageTamplate = (table) =>    {
    const context = useContext(AuthContext)
    const tableToBook = context.table;
    const tableId = table.ud;


    return (
        <>
        <Nav  />
        {console.log("table in bookingPageTemplate: " + table)}
        <MatCard  key={tableId} table={table}/>
        {/* {console.log('table: ' + table)} */}
        </>
    );
};
export default BookingPageTamplate;

