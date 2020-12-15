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

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
            justifyContent: "center"
        },
    },
}));


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
                ...state,
                isFetching: false,
                tables: action.payload
            };
        case "BOOK_TABLES_FAILURE":
            return {
                ...state,
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

    const getArray = childArr =>    {

        setData({
            ...data,

        })
    }
    
    const handleDropdownInputChange = event => {

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
        let ts = []
        event.target.value = ts
        console.log('@array, event.target.value: ' + ts)
        setData({
            ...data,
            timeSlots: event.target.value,
        });
    };


    const { state: tablesState } = useContext(TablesContext);
    const [data, setData] = useState(initialState);
    const [state, dispatch] = React.useReducer(reducer, initialState);
    // let tableID = props.id;
    // let tableTime = props.timeSlots.time

    console.log('@atblepage, tablesState: ')
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
        fetch(`http://localhost:3030/tables/${data.tableId}`, {
            method: "POST",
            headers: {
                'Autherization': `Bearer ${authContext.state.token}`
            },
            body: JSON.stringify({
                id: data.tableId,
                timeSlots: data.timeSlots,
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw res;
            })
            .then(resJson => {
                dispatch({
                    type: "ADD_TABLES_SUCCESS",
                    payload: resJson
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

console.log('@add table view, just before return authcontext.state.token: ' + authContext.state.token)
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
                    <TimeSlotDropdown multiple={true} onChange={handleDropdownInputChange} id="timeSlotDropdown" value={data.timeSlots} />


                    {data.errorMessage && (
                        <span className="form-error">{data.errorMessage}</span>
                    )}
                    <button disabled={data.isSubmitting}>
                        {data.isSubmitting ? (
                            "Loading..."
                        ) : (
                                "Submit"
                            )}
                    </button>
                </form>
                {/* </FormProvider> */}
            </div>
            {/* </form> */}
        </Container>
    );
};
export default AddTablePage;