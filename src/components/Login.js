import React from "react";
import { AuthContext } from "../App";

// import AuthContext from "../context/loggedInContext";
import { Link, Route } from 'react-router-dom'
import ProtectedRoute from "./ProtectedRoute";
import Home from './Home'

//  export const LoggedInContext = React.createContext();

const authenticatedState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "LOGIN":
//       localStorage.setItem("user", JSON.stringify(action.payload.user));
//       localStorage.setItem("token", JSON.stringify(action.payload.token));
//       return {
//         ...state,
//         isAuthenticated: true,
//         user: action.payload.user,
//         token: action.payload.token
//       };
//     case "LOGOUT":
//       localStorage.clear();
//       return {
//         ...state,
//         isAuthenticated: false,
//         user: null
//       };
//     default:
//       return state;
//   }
// };

export const LoginContextProvider = () => {
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
    let res = await fetch("http://localhost:3035/auth/login", {
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
          return res =res.json();
      })
      // console.log('@login, res.json: ' + res)
      .then(res => {
        dispatch({
          type: "LOGIN",
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
    // console.log('@login, res.statustext: ' + res.statusText)

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
              <Route
                path={`/home/`} component={Home} />
              {/* {props.children} */}

            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LoginContextProvider;