import React, { useContext, useState } from "react";
// import { AuthContext } from "../App";
import AuthContext  from "../context/loggedInContext"

const BookingPage = props => {
    const context = useContext(AuthContext);

    const initialState = {
        id: props.id,
        firstName: "",
        lastName: "",
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
    let tableID = props.id;
    let tableTime = props.timeSlots.time
    const handleFormSubmit = event => {
        setData({
            ...data,
            isSubmitting: true,
            errorMessage: null
        });
        event.preventDefault();
        dispatch({
            type: "BOOK_TABLES_REQUEST"
        });
        fetch(`http://localhost:3030/tables/${tableID}/${tableTime}/`, {
            method: "POST",
            headers: {
                Autherization: `Bearer ${authState.token}`
            },
            body: JSON.stringify({
                id: props.id,
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
                    type: "BOOK_TABLES_SUCCESS",
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
        <div className="login-container">
        <div className="card">
          <div className="container">
            <form onSubmit={handleFormSubmit}>
              <label htmlFor="firstName">
                First Name:
                <input
                  type="text"
                  value={data.firstName}
                  onChange={handleInputChange}
                  name="firstName"
                  id="firstName"
                />
              </label>

              <label htmlFor="lastName">
                Last Name:
                <input
                  type="text"
                  value={data.lastName}
                  onChange={handleInputChange}
                  name="lastName"
                  id="lastName"
                />
              </label>
              <h1>Login</h1>
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
        </div>
      </div>
   );
};
export default BookingPage;