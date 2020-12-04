import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import "./App.css";
import Login from "./components/Login";
import Home, { AuthContext } from "./contexts/adminContext";
import Header from "./components/Header";
import NavBar from "./navBar/index"
import BookingPage from "./components/BookingPage";
import CssBaseline from '@material-ui/core/CssBaseline';
import TableSelection from "./components/TableSelection";
import BookingPageView from "./views/bookingPageView";
import HomeTablesView from './views/homeTablesView'



function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
      {/* <AuthContext.Consumer > */}
        <NavBar />
        <TableSelection />
        {/* <div className="App">{!state.isAuthenticated ? <Login /> : <Home />}</div> */}
        <Switch>
          <Route path="/" component={HomeTablesView} />
          {/* <Route path="/bookingPage/:id/" component={BookingPage}/> */}
          <Route exact path="/bookingPage/:id/" component={BookingPageView} />
          <Redirect from="*" to="/" />
        </Switch>
        {/* </AuthContext.Consumer> */}
      </BrowserRouter>
    </React.Fragment>

  );
}
export default App;


//      <Route ="/" component={Home} />