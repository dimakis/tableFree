import React, { useState, useContext } from "react";
import { AuthContext } from "../App";
import Card from "../components/Card";
import Nav from "../navBar/index";
import MatCard from "../components/MatCard";

const BookingPageTamplate = ({table, timeSlot}) =>    {
    const context = useContext(AuthContext)


    return (
        <>
        <Nav  />
        <MatCard  key={table.id.toString} table={table}/>
        {console.log('table: ' + table)}
        </>
    );
};
export default BookingPageTamplate;

