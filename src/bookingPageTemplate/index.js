import React, { useState } from "react";
import { AuthContext } from "../App";
import Card from "../components/Card";
import Nav from "../navBar/index";
import MatCard from "../components/MatCard";

const BookingPageTamplate = ({table, timeSlot}) =>    {

    return (
        <>
        <Nav  />
        <MatCard  key={table.id.toString} table={table}/>
        </>
    );
};
export default BookingPageTamplate;

