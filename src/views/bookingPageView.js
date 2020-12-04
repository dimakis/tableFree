import React, { useContext } from "react";
import BookingPageTemplate from '../bookingPageTemplate/index'
import { AuthContext } from "../contexts/adminContext";

const TableBookingPage = () =>  {
    const context = useContext(AuthContext);
    // const table = context.table.filter((tab) => {
    //         return ( 

    //         );
    // }
    // )
    return (
        <BookingPageTemplate />

    );
};
export default TableBookingPage;