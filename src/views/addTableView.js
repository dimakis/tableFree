import React, { useContext, useState } from "react";
import { AuthContext } from "../App";
import { useForm, FormProvider } from "react-hook-form";
// import AuthContext  from "../context/loggedInContext";
import { Card, CardContent } from "@material-ui/core";
import NavBar from "../navBar";
import TimeSlotDropdown from '../components/timeSlotDropdown'
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { TablesContext } from "../context/tablesContext";
import FormInput from "../controls/textField";
import { Multiselect } from 'multiselect-react-dropdown';
import Button from '@material-ui/core/Button';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
// import { Multiselect } from "multiselect-react-dropdown";



const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
            justifyContent: "center"
        },
        submitButton: {
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            border: 0,
            borderRadius: 3,
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            color: 'white',
            height: 48,
            padding: '0 30px',

        }
    },
}));

const animatedComponents = makeAnimated()

const reducer = (state, action) => {
    switch (action.type) {
        case "BOOK_TABLES_REQUEST":
            return {
                state: { ...state },
                isFetching: true,
                hasError: false
            };
        case "BOOK_TABLES_SUCCESS":
            return {
                state: { ...state },
                isFetching: false,
                tableId: action.payload.tableId,
                timeSlots: action.payload.timeSlots
            };
        case "BOOK_TABLES_FAILURE":
            return {
                state: { ...state },
                hasError: true,
                isFetching: false
            };
        default:
            return state;
    }
};
const initialState = {
    tableId: null,
    timeSlots: [],
    bookedBy: "",
    isBooked: false
}
const times = [
    { value: '12-13', label: '12-13' },
    { value: '1-2', label: '1-2' },
    { value: '2-3', label: '2-3' },
    { value: '3-4', label: '3-4' },
    { value: '4-5', label: '4-5' },
    { value: '5-6', label: '5-6' },
    { value: '7-8', label: '7-8' },
];

const AddTablePage = props => {
    const useFormFoos = useForm();
    const { handleSubmit } = useFormFoos
    const classes = useStyles();
    const authContext = useContext(AuthContext);
    const context = useContext(TablesContext)


    const handleTextInputChange = event => {
        setData({
            ...data,
            tableId: event.target.value,
        });
    };

    const getArray = childArr => {

        setData({
            ...data,

        })
    }

    const handleDropdownInputChange = selectedOptions => {
        // event.preventDefault()
        // console.log('@handleDropdown, event.target.value: ' + event.target.value)

        // const { options } = event.target;
        // const value = [];
        // for (let i = 0, l = options.length; i < l; i += 1) {
        //   if (options[i].selected) {
        //     value.push(options[i].value);
        //     setData(data.timeSlots.push(options[i].value))
        //   }
        // }
        // console.log('value[i]' +  )
        // setTableId(value)
        let values = state.timeSlots
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
        values.map(v => {
            let newArr = []

        })
        setData({
            ...data,
            timeSlots: values,
        });
    };


    const { state: tablesState } = useContext(TablesContext);
    const [data, setData] = useState(initialState);
    const [state, dispatch] = React.useReducer(reducer, initialState);
    // let tableID = props.id;
    // let tableTime = props.timeSlots.time

    console.log('@atblepage, authContext token: ' + authContext.state.token)
    const handleFormSubmit = event => {

        setData({
            ...data,
            isSubmitting: true,
            errorMessage: null
        });
        event.preventDefault();
        dispatch({
            type: "ADD_TABLE_REQUEST"
        });
        fetch(`http://localhost:3030/tables/`, {
            method: "POST",
            headers: {
                'Content-Type': `application/json`
            },
            body: JSON.stringify({
                id: data.tableId,
                timeSlots: data.timeSlots,
            })
        })
            .then(res => {
                return res = res.json();
            })
            .then(res => {
                dispatch({
                    type: "ADD_TABLES_SUCCESS",
                    payload: res
                })
            })

            .catch(error => {
                setData({
                    ...data,
                    isSubmitting: false,
                    errorMessage: error.message || error.statusText
                });
            });
    }

    // console.log('@add table view, just before return authcontext.state.token: ' + authContext.state.token)
    return (
        // <NavBar />
        <Container >

            {/* <form className={classes.root} noValidate autoComplete="off"> */}
            <div>
                {/* <FormProvider { ...useFormFoos} > */}
                <form className={classes.root} onSubmit={handleFormSubmit}>
                    <h2>Table ID:</h2>
                    {/* <FormInput onSubmit={handleFormSubmit} name ="name" label="name" /> */}
                    <TextField onChange={handleTextInputChange} id="tableIdInput" label="Required" value={data.tableID} />
                    <h2>Table Time Slots</h2>
                    {/* <TimeSlotDropdown multiple={true} onItemChange={handleDropdownInputChange} id="timeSlotDropdown" value={data.timeSlots} /> */}
                    <Select
                        value={state.timeSlots}
                        // default={times[0]}
                        isMulti
                        components={animatedComponents}
                        name='timeSlotsDropdown'
                        options={times}
                        classNamePrefix='select'
                        onChange={handleDropdownInputChange}
                    ></Select>

                    {data.errorMessage && (
                        <span className="form-error">{data.errorMessage}</span>
                    )}
                    <Button className={classes.submitButton} >
                        <button disabled={data.isSubmitting} className={classes.submitButton}>
                            {data.isSubmitting ? (
                                "Loading..."
                            ) : (
                                    "Submit"
                                )}
                        </button>
                    </Button>

                </form>
                {/* </FormProvider> */}
            </div>
            {/* </form> */}
        </Container >
    );
};
export default AddTablePage;