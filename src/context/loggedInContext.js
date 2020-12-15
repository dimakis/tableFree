// import React from "react";
// import { AuthContext } from "../App";
// import { Link, Route } from 'react-router-dom'


// // export const AuthContext = React.createContext();
// // export const LoggedInContext = React.createContext();
// export const AuthDispatchContext = React.createContext();


// // const authenticatedState = {
// //   isAuthenticated: false,
// //   user: null,
// //   token: null,
// // };
// const initialState = {
//     email: "",
//     password: "",
//     isSubmitting: false,
//     errorMessage: null,

//   };

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

// export const LoginContextProvider = (props) => {
//     const { state, dispatch } = React.useContext(AuthContext);
//     // const [state, loggedInDispatch] = React.useReducer(reducer, authenticatedState)

//     const initialState = {
//       email: "",
//       password: "",
//       isSubmitting: false,
//       errorMessage: null,
  
//     };

//     return (
//         <LoggedInContext.Provider value={{
//             state,
//             loggedInDispatch
//             }}
//             > 
//             {/* <AuthContext.Provider 
//             value={{
//                 state,
//                 dispatch
//             }}
//             > */}
//              {props.children} 
//              {/* </AuthContext.Provider> */}
//               </LoggedInContext.Provider>
//     );
//         }
//         export default LoginContextProvider;