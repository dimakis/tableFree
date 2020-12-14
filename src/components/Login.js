import React from "react";
import { AuthContext } from "../App";
import { Link, Route } from 'react-router-dom'
import ProtectedRoute from "./ProtectedRoute";
import Home from './Home'

 export const LoggedInContext = React.createContext();

const authenticatedState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
};

export const LoginContextProvider = (props) => {
  const { dispatch } = React.useContext(AuthContext);
  const [state, loggedInDispatch] = React.useReducer(reducer, authenticatedState)
  const initialState = {
    email: "",
    password: "",
    isSubmitting: false,
    errorMessage: null,

  };
  const [data, setData] = React.useState(initialState);
  const handleInputChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
  };
  const handleFormSubmit = event => {
    event.preventDefault();
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null
    });
    let id = data.email
    const token = Buffer.from(`${data.email}:${data.password}`, 'utf8').toString('base64')
    fetch("http://localhost:3035/users/", {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        username: data.email,
        password: data.password
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
          type: "LOGIN",
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
  };
  return (
    <LoggedInContext.Provider value={{
    data,
    dispatch
    }}

    >  {props.children}  </LoggedInContext.Provider>

    <div className="login-container">
      <div className="card">
        <div className="container">
          <form onSubmit={handleFormSubmit}>
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

            <label htmlFor="password">
              Password
              <input
                type="password"
                value={data.password}
                onChange={handleInputChange}
                name="password"
                id="password"
              />
            </label>

            {data.errorMessage && (
              <span className="form-error">{data.errorMessage}</span>
            )}
            <button disabled={data.isSubmitting}>
              <Link to={`/home/`} >
                {data.isSubmitting ? (
                  "Loading..."
                ) : (
                    "Login"
                  )}
              </Link>
              <Route
               path={`/home/`} /> 
              {props.children}

            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LoginContextProvider;