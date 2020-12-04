import { React, createContext } from "react";
import Card from "../components/Card";
import MatCard from "../components/MatCard"
import { HomeTablesLayout } from "../components/Home";

const initialState = {
  tables: [],
  isFetching: false,
  hasError: false,
  isAdmin: false,
};

export const AuthContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_TABLES_REQUEST":
      return {
        ...state,
        isFetching: true,
        hasError: false
      };
    case "FETCH_TABLES_SUCCESS":
      return {
        ...state,
        isFetching: false,
        tables: action.payload
      };
    case "FETCH_TABLES_FAILURE":
      return {
        ...state,
        hasError: true,
        isFetching: false
      };
    default:
      return state;
  }
};

export const Home = () => {
  // const { state: authState } = React.useContext(AuthContext);
  const {state: authState} = React.useContext(AuthContext);
  const [state, dispatch] = React.useReducer(reducer, initialState);
  React.useEffect(() => {
    dispatch({
      type: "FETCH_TABLES_REQUEST"
    });
    fetch("http://localhost:3030/tables/", {
      // the reason I can do leave out the localhost is I designated port 3030 as a proxy
      // fetch("/tables/", {
      headers: {
        Authorization: `Bearer ${authState.token}`
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw res;
        }
      })
      .then(resJson => {
        console.log(resJson);
        console.log("fetch table success")
        // let finalArr = []
        // finalArr = resJson.map(()=>
        //     {
        //         id: resJson.id;
        //         timeSlots: resJson.timeSlots
        //     })
        dispatch({
          type: "FETCH_TABLES_SUCCESS",
          //   let tabArr = tableArrayCons(resJson)
          //   payload: tableArrayCons(resJson)
          payload: resJson
        })
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: "FETCH_TABLES_FAILURE"
        });
      });
  }, [authState.token]);

  return (
    <React.Fragment>
      <AuthContext.Provider
        value={{
          state:this.state,
          dispatch
        }} >
      </AuthContext.Provider>

    </React.Fragment>
  );
};
export default AuthContext.Provider;