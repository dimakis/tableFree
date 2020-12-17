import React from "react";
import { AuthContext } from "../App";
import Button from '@material-ui/core/Button';
// import AuthContext from "../context/loggedInContext";
import { Link, Route, Redirect, useHistory } from 'react-router-dom'
import ProtectedRoute from "./ProtectedRoute";
import Home from './Home'

//  export const LoggedInContext = React.createContext();

const authenticatedState = {
  isAuthenticated: false,
  user: null,
  token: null,
};


export const Register = (props) => {
  const { state, dispatch } = React.useContext(AuthContext);
  // const { state, dispatch }  = React.useContext(AuthContext);
  // const dispatch = useAuthDispatchContext()
  // const [state, loggedInDispatch] = React.useReducer(reducer, authenticatedState)
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

  const handleFormSubmit = async (event) => {
    // console.log('@login, handleformsubmit start')
    event.preventDefault();
    setData({
      data: { ...data },
      isSubmitting: true,
      errorMessage: null
    });
    let id = data.email
    const token = Buffer.from(`${data.email}:${data.password}`, 'utf8').toString('base64')
    await fetch("http://localhost:3035/auth/login", {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        "email": data.email,
        "password": data.password
      })
    })
      // .then( res => {
      //   if (res.ok) {
      //     return res.json();
      //   }
      //   throw res;
      // })
      .then(res => {
        return res = res.json();
      })
      // console.log('@login, res.json: ' + res)
      .then(res => {
        dispatch({
          type: "REGISTER",
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
    return (
      props.history.push('/home/')
    )
  };

  return (
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
            </button>
          </form>
          <ProtectedRoute
            path={`/home/`} component={Home} />
        </div>
      </div>
    </div>
  );
};
export default Register