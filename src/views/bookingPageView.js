import React, { useContext } from "react";
import BookingPageTemplate from '../bookingPageTemplate/index'
import { AuthContext } from "../App";
import { TablesContext } from "../context/tablesContext";
import BookButton from "../components/buttons/bookButton";
import useToggleState from '../hooks/useToggleState'

const TableBookingPage = () =>  {
    const tablesContext = useContext(TablesContext)
    const table = tablesContext.tableForBooking
    const [isBooking, toggle] = useToggleState(true)
    // const {id} = props.id
    // const table = props.table
    // const context = useContext(AuthContext);
    // const table = context.table.filter((tab) => {
    //         return ( 

    //         );
    // }
    // )
    return (
        <BookingPageTemplate
        isBooking = {isBooking}
        table = {table}
        action = {(table) =>     {
            return <BookButton table={table} />
        }}
        // table={table} />
/>
    );
};
export default TableBookingPage