import React from "react";
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
import { Table } from "@material-ui/core";
import AddTablePage from "./views/addTableView";

export const AuthContext = React.createContext();

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
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <React.Fragment>
      <BrowserRouter>
        <AuthContext.Provider
          value={{
            tables:state.tables,
            state,
            dispatch
          }}
        >
            <NavBar />
            <TableSelection />
            {/* <div className="App">{!state.isAuthenticated ? <Login /> : <Link to='/' />}</div> */}
            <Switch>
              <Route exact path="/bookingPage/:id/" component={BookingPageTemplate}  />
              <Route  exact path="/" component={Home} />
              <Route path="/addTablePage/" component={AddTablePage}/>
              {/* <Redirect from="*" to="/" /> */}
            </Switch>
        </AuthContext.Provider>
      </BrowserRouter>

    </React.Fragment>

  );
}
export default Appify;


//      <Route ="/" component={Home} />