import React, { useContext } from "react";
import { BrowserRouter, Switch, Route, Redirect, Link } from 'react-router-dom';
import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import Header from "./components/Header";
import NavBar from "./navBar/index"
import BookingPage from "./components/BookingPage";
import CssBaseline from '@material-ui/core/CssBaseline';
import TableSelection from "./components/TableSelection";
import BookingPageTemplate from "./bookingPageTemplate/index"
import { Table, Typography } from "@material-ui/core";
import AddTablePage from "./views/addTableView";
import AuthenContext, { AuthContext } from './context/authUserContext'
import ProtectedRoute from './components/ProtectedRoute'
// export const AuthContext = React.createContext();

const initialState = {
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

function Appify() {
  const context = useContext(AuthContext)
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <React.Fragment>
      <BrowserRouter>
        <AuthenContext>

          {/* <Typography > */}
            <NavBar />
            <TableSelection />
            {/* <div className="App">{!state.isAuthenticated ? <Login /> : <Link to='/home' />}</div> */}
            <Switch>
              <Route path='/' component={Login} />
              <ProtectedRoute exact path="/addTablePage/" component={AddTablePage} />
              <ProtectedRoute exact path="/bookingPage/:id/" component={BookingPageTemplate} />
              <ProtectedRoute exact path="/home/" component={Home} />
              {/* <Redirect from="*" to="/" /> */}
            </Switch>
          {/* </Typography> */}
    
      </AuthenContext>
      </BrowserRouter>
      </React.Fragment>
  );
}
export default Appify;


//      <Route ="/" component={Home} />