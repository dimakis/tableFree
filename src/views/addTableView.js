import React, { useContext, useState } from "react";
import { AuthContext } from "../App";
import { Card, CardContent } from "@material-ui/core";
import NavBar from "../navBar";
import TimeSlotDropdown from '../components/timeSlotDropdown'
import Container from '@material-ui/core/Container';

const AddTablePage = props => {
    const context = useContext(AuthContext);

    const initialState = {
        tableId: null,
        timeSlots: "",
        phoneNumber: "",
        email: ""
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
                Autherization: `Bearer ${authState.token}`
            },
            body: JSON.stringify({
                id: data.tableId,
                firstName: data.firstName,
                lastName: data.lastName,
                phoneNumber: data.phoneNumber,
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
          <div className="container">
            <form onSubmit={handleFormSubmit}>
              <label htmlFor="firstName">
                <h2>Table ID:</h2>
                <input
                  type="text"
                  value={data.tableId}
                  onChange={handleInputChange}
                  name="firstName"
                  id="firstName"
                />
              </label>
              <h2>Table Time Slots</h2>
              <TimeSlotDropdown />
              <label htmlFor="email">
                Email Address
                <input
                  type="text"
                  value={data.email}
                  onChange={handleInputChange}
                  name="email"
                  id="email"
                />
              </label>
  
              <label htmlFor="phoneNumber">
                Phone Number:
                <input
                  type="phoneNumber"
                  value={data.phoneNumber}
                  onChange={handleInputChange}
                  name="phoneNumber"
                  id="phoneNumber"
                />
              </label>
  
              {data.errorMessage && (
                <span className="form-error">{data.errorMessage}</span>
              )}
             <button disabled={data.isSubmitting}>
                {data.isSubmitting ? (
                  "Loading..."
                ) : (
                  "Login"
                )}
              </button>
            </form>
          </div>
          </Container>
   );
};
export default AddTablePage;