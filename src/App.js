import React from "react";
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import Header from "./components/Header";
import BookingPage from "./components/BookingPage";

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

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <BrowserRouter>    
    <AuthContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      <Header />
      {/* <div className="App">{!state.isAuthenticated ? <Login /> : <Home />}</div> */}
      <Switch>
        <Route path="/" component= {Home} />
        <Route path="/bookingPage/:id/" component={BookingPage}/>
        <Redirect from="*" to="/" />
      </Switch>
    </AuthContext.Provider>
    </BrowserRouter>

  );
}
export default App;


//      <Route ="/" component={Home} />