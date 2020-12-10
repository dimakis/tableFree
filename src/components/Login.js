import React from "react";
import AuthenContext, { AuthContext } from "../context/authUserContext";
import { Link, Route } from 'react-router-dom'
import ProtectedRoute from "./ProtectedRoute";
import Home from './Home'

export const Login = () => {
  const { dispatch, FetchTables } = React.useContext(AuthContext);
  const initialState = {
    email: "",
    password: "",
    isSubmitting: false,
    errorMessage: null
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
        console.log("token: " + token)
        AuthenContext()
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
              {/* <Route */}
              {/* // path={`/home/`} /> */}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;