import React, { useContext, useEffect } from "react";
import BookingPageTemplate from '../bookingPageTemplate/index'
import { AuthContext } from "../App";
import { TablesContext, TablesDispatchContext } from "../context/tablesContext";
import BookButton from "../components/buttons/bookButton";
import useToggleState from '../hooks/useToggleState'

const TableBookingPage = (props) => {
    const table = props.table
    const tablesContext = useContext(TablesContext)
    const tablesDispatchContext = useContext(TablesDispatchContext)
    useEffect(() =>
        tablesDispatchContext({ type: "BOOK_TABLE", payload: table }), ([])
    )
    // const tableT = tablesContext.tableForBooking
    // const [isBooking, toggle] = useToggleState(true)
    // const {id} = props.id
    // const table = props.table
    // const context = useContext(AuthContext);
    // const table = context.table.filter((tab) => {
    //         return ( 

    //         );
    // }
    // )
    let singleTabArr = []
    singleTabArr.push(table)
    tablesDispatchContext({ type: "BOOK_TABLE", payload: table })
    // console.log("@tableBP, bookingID: " + booking.id)
    // console.log("@tableBP, isBooking: " + isBooking)
    // console.log("@tableBP, table.isBooking: " + table.isBooking)
    console.log("@tableBP, tablesContext.state.isBooking: " + tablesContext.state.isBooking)

    console.log("@tableBP, tableToBook: " + tablesContext.state.tableToBook)
    console.log("@tableBP, table: " + table)
    return (
        <BookingPageTemplate
            isBooking={tablesContext.state.isBooking}
            table={singleTabArr}
            action={(table) => {
                return <BookButton table={table} />
            }}
        // table={table} />
        />
    );
};
export default TableBookingPage