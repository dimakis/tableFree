import React, { useContext, useState } from "react";
import { AuthContext } from "../App";
import { Card, CardContent } from "@material-ui/core";
import NavBar from "../navBar";
import TimeSlotDropdown from '../components/timeSlotDropdown'
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { TablesContext } from "../context/tablesContext";

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
            justifyContent: "center"
        },
    },
}));

const AddTablePage = props => {
    const classes = useStyles();
    const authContext = useContext(AuthContext);
    const context = useContext(TablesContext)

    const initialState = {
        tableId: null,
        timeSlots: [],
        bookedBy: "",
        isBooked: false
    }
    const reducer = (state, action) => {
        switch (action.type) {
            case "BOOK_TABLES_REQUEST":
                return {
                    state: {...state},
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

    const handleInputChange = event => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    };

    const { state: tablesState } = useContext(TablesContext);
    const [data, setData] = useState(initialState);
    const [state, dispatch] = React.useReducer(reducer, initialState);
    // let tableID = props.id;
    // let tableTime = props.timeSlots.time

    // console.log('@atblepage, tablesState: ')
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
        console.log("token: " + authContext.state.token)

        console.log("@addTablesView, dispatch before fetch: "+ data.tableId)


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

 
    return (
        // <NavBar />
        <Container >
            
            {/* <form className={classes.root} noValidate autoComplete="off"> */}
                <div>
                    <form onSubmit={handleFormSubmit}>
                        <h2>Table ID:</h2>
                        <TextField onChange={handleInputChange} required id="standard-required" label="Required" />
                        <h2>Table Time Slots</h2>
                        <TimeSlotDropdown onChange={handleInputChange} />


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
                </div>
            {/* </form> */}
        </Container>
    );
};
export default AddTablePage;