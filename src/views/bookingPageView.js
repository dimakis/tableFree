import React, { useContext } from "react";
import BookingPageTemplate from '../bookingPageTemplate/index'
import { AuthContext } from "../App";
import { TablesContext } from "../context/tablesContext";
import BookButton from "../components/buttons/bookButton";
import useToggleState from '../hooks/useToggleState'

const TableBookingPage = (table) =>  {
    const tablesContext = useContext(TablesContext)
    // const tableT = tablesContext.tableForBooking
    const [isBooking, toggle] = useToggleState(false)
    // const {id} = props.id
    // const table = props.table
    // const context = useContext(AuthContext);
    // const table = context.table.filter((tab) => {
    //         return ( 

    //         );
    // }
    // )

    console.log("@tableBP, tableToBook: " + tablesContext.tableToBook)
    console.log("@tableBP, tables: " + tablesContext.tables)
    console.log("@tableBP, isBooking: " + isBooking)
    console.log("@tableBP, table: " + table)
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