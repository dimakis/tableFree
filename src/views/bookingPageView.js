import React, { useContext } from "react";
import BookingPageTemplate from '../bookingPageTemplate/index'
import { AuthContext } from "../App";

const TableBookingPage = props =>  {
    // const {id} = props.id
    // const table = props.table
    console.log('props: ' + props) //+ '\ntable: ' + table)
    // const context = useContext(AuthContext);
    // const table = context.table.filter((tab) => {
    //         return ( 

    //         );
    // }
    // )
    return (
        <BookingPageTemplate
        // table={table} />
/>
    );
};
export default TableBookingPage