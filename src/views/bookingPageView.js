import React, { useContext } from "react";
import BookingPageTemplate from '../bookingPageTemplate/index'
import { AuthContext } from "../App";

const TableBookingPage = () =>  {
    const context = useContext(AuthContext);
    const table = context.table.filter((tab) => {
            return ( 

            );
    }
    )
    return (
        <BookingPageTemplate />

    );
};
