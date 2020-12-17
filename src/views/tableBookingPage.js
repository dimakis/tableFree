import React, { useContext, useEffect } from "react";
import BookingPageTemplate from '../bookingPageTemplate/index'
import { AuthContext } from "../App";
import { TablesContext, TablesDispatchContext } from "../context/tablesContext";
import BookButton from "../components/buttons/bookButton";
import useToggleState from '../hooks/useToggleState'
import BookingTable from '../components/BookingTable'
import makeAnimated from 'react-select/animated';
import Select from 'react-select'
import Grid from '@material-ui/core/Grid';





const TableBookingView = props => {
    const tablesContext = useContext(TablesContext)
    const authContext = useContext(AuthContext)
    const animatedComponents = makeAnimated()
    const state = tablesContext.state
    const [data, setData ] = React.useState()
console.log('@tablebookingPage, tablesContext.state.tables' + state.tables )

    const handleDropdownInputChange = selectedOptions => {
        let values = state.tables
        selectedOptions.forEach(selectedOption => {
            if (selectedOption !== null) {
                console.log(`Selected: ${selectedOption.label}`)
                values.push(selectedOption.label)
            }
        },
            values.filter(v =>
                (typeof v === 'string') && !!v
            )
        )
        setData({
            ...data,
            timeSlots: values,
        });
    };
    const handleDropdownInputChangeTimeSlots = selectedOptions => {
        let values = state.tables.timeSlots
        selectedOptions.forEach(selectedOption => {
            if (selectedOption !== null) {
                console.log(`Selected: ${selectedOption.label}`)
                values.push(selectedOption.label)
            }
        },
            values.filter(v =>
                (typeof v === 'string') && !!v
            )
        )
        setData({
            ...data,
            timeSlots: values,
        });
    };
    
    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <BookingTable />
                </Grid>
                <Grid item xs={3} >
                    <h1>Select Table</h1>
                    <Select
                        value={tablesContext.state.tables}
                        // default={times[0]}
                        isMulti
                        components={animatedComponents}
                        name='timeSlotsDropdown'
                        options={tablesContext.state.tables}
                        classNamePrefix='select'
                        onChange={handleDropdownInputChange}
                    ></Select>
                </Grid>
                <Grid item xs={3} >
                    <h1>Select Time Slot</h1>
                    <Select
                        value={tablesContext.state.tableForBooking.timeSlots}
                        // default={times[0]}
                        isMulti
                        components={animatedComponents}
                        name='timeSlotsDropdown'
                        options={tablesContext.state.tableForBooking.timeSlots}
                        classNamePrefix='select'
                        onChange={handleDropdownInputChangeTimeSlots}
                    ></Select>
                </Grid>
            </Grid>
        </>

    )
}
export default TableBookingView
