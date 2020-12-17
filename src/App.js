import React, { useContext } from "react";
import { BrowserRouter, Switch, Route, Redirect, Link, withRouter } from 'react-router-dom';
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
import ProtectedRoute from './components/ProtectedRoute'
import TabContextProvider, { TablesDispatchContext } from "./context/tablesContext";
import BookingPageView from './views/bookingPageView'
import TableBookingView from './views/tableBookingPage'
// import {AuthContext} from './context/loggedInContext'


export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

// export const useAuthDispatchContext = () =>  {
//   const disCon = React.useContext(AuthDispatchContext);
//   if (disCon === undefined) {
//     throw new Error('useCountDispatch must be used within a CountProvider')
//   }
//   return disCon
// }


const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      console.log('@APP-> login, in redcucer, access_token: ' + action.payload.access_token)
      console.log('@APP-> login, in redcucer, token: ' + action.payload.token)
      console.log('@APP-> login, in redcucer, action.payload: ' + action.payload)

      // localStorage.setItem("user", JSON.stringify(action.payload.token));
      localStorage.setItem("token", JSON.stringify(action.payload.access_token));
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.access_token,
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
  // const context = useContext(AuthContext)
  // const state = context.state
  console.log('@ app')
  const [state, dispatch] = React.useReducer(reducer, initialState)
  console.log('@app, local storage token: ' + localStorage.getItem('token'))

  return (
    <React.Fragment>
      <BrowserRouter>
        <AuthContext.Provider
          value={{
            state,
            isAuthenticated: state.isAuthenticated,
            token: state.token,
            dispatch
          }}
        >
          <TabContextProvider>
            <Typography >

              <NavBar />
              {/* <div className="App">{!state.isAuthenticated ? <Link to='login' /> : <Link to='/home/' />}</div> */}
              <Switch>
                {/* <Route {!state.isAuthenticated ?  path='/' component={Login} /> */}

                <ProtectedRoute exact path="/bookingPage/" component={TableBookingView} />
                <ProtectedRoute exact path="/bookingPage/:id" component={BookingPageView} />
                <ProtectedRoute exact path="/addTablePage/" component={AddTablePage} />
                <ProtectedRoute exact path="/home/" component={Home} />
                <Route exact path='/login/' component={Login} />

                <Redirect from="*" to="/login/" />
              </Switch>
            </Typography>

          </TabContextProvider>
        </AuthContext.Provider>
      </BrowserRouter>
    </React.Fragment>
  );
}
export default Appify


//      <Route ="/" component={Home} />