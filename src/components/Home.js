import React from "react";
import { AuthContext } from "../App";
import Card from "../components/Card";
import MatCard from "../components/MatCard"

const initialState = {
  tables: [],
  isFetching: false,
  hasError: false,
};



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
      case "BOOK_TABLE":
        return {
          ...state,
          tableForBooking: state.tables.map((tab) =>
          tab.id === action.payload.table.id ?
          tab : tab),
        };
    default:
      return state;
  }
};

export const Home = () => {
  const { state: authState } = React.useContext(AuthContext);
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

  const addBookingToTable = (tableID) => {
    const index = state.tables.map((tab) => tab.id).indexOf(tableID);
    dispatch({ type: "BOOK_TABLE", payload: { table: state.tables[index] } });
  };

  return (
    <React.Fragment>
    <div className="home">
      {state.isFetching ? (
        <span className="loader">LOADING...</span>
      ) : state.hasError ? (
        <span className="error">AN ERROR HAS OCCURED</span>
      ) : (

      )}
    </div>
    </React.Fragment>
  );
};
export default Home;