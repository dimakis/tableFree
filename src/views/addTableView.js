import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authUserContext";
import { Card, CardContent } from "@material-ui/core";
import NavBar from "../navBar";
import TimeSlotDropdown from '../components/timeSlotDropdown'
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const AddTablePage = props => {
    const classes = useStyles();
    const context = useContext(AuthContext);

    const initialState = {
        tableId: null,
        timeSlots: [],
        capacity: "",
        misc: ""
    }
    const reducer = (state, action) => {
        switch (action.type) {
            case "BOOK_TABLES_REQUEST":
                return {
                    ...state,
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

    const { state: authState } = useContext(AuthContext);
    const [data, setData] = useState(initialState);
    const [state, dispatch] = React.useReducer(reducer, initialState);
    // let tableID = props.id;
    // let tableTime = props.timeSlots.time
    console.log('authState: ' + authState)
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
                Autherization: `Bearer ${authState.token}`
            },
            body: JSON.stringify({
                id: data.tableId,
                timeSlots: data.timeSlots,
                capacity: data.capacity,
                misc: data.misc,
                email: data.email
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

    const handleInputChange = event => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    };

    return (
        // <NavBar />
        <Container maxWidth="m">
            <form className={classes.root} noValidate autoComplete="off">
                <div>
                    <form onSubmit={handleFormSubmit}>
                        <label htmlFor="tableId">
                            <h2>Table ID:</h2>
                            <input
                                type="text"
                                value={data.tableId}
                                onChange={handleInputChange}
                                name="tableId"
                                id="tableId"
                            />
                        </label>
                        <TextField onChange={handleInputChange} required id="standard-required" label="Required" defaultValue="Table ID " />
                        <h2>Table Time Slots</h2>
                        <TimeSlotDropdown />
                        <label htmlFor="capacity">
                            Capacity
                <input
                                type="text"
                                value={data.capacity}
                                onChange={handleInputChange}
                                name="capacity"
                                id="capacity"
                            />
                        </label>

                        <label htmlFor="misc">
                            Misc:
                <input
                                type="misc"
                                value={data.misc}
                                onChange={handleInputChange}
                                name="misc"
                                id="misc"
                            />
                        </label>

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
            </form>
        </Container>
    );
};
export default AddTablePage;