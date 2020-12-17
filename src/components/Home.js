import React, { useContext } from "react";
import { AuthContext } from "../App";
// import AuthContext from '../context/loggedInContext'
import Card from "../components/Card";
import MatCard from "../components/MatCard"
import TablesList from "../tablesList/tablesList";
import TableSelection from '../components/TableSelection'
import { Box } from "@material-ui/core";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { TablesContext, TabContextProvider } from "../context/tablesContext";
import useToggleState from "../hooks/useToggleState";


const initialState = {
  tables: [],
  isFetching: false,
  hasError: false,
  isBooking: false,
  tableForBooking: null
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
        isBooking: true,
        tableForBooking: state.tables.map((tab) =>
          tab.id === action.payload.table.id ?
            { ...tab, beingBooked: true } : tab),
      };
    default:
      return state;
  }
};

export const Home = () => {
  const authContext = useContext(AuthContext)
  const tablesContext = useContext(TablesContext)
  const isBooking = tablesContext.isBooking;
  tablesContext.fetchTables()
  // console.log('context: ' + context)

  // const { state: authState } = React.useContext(AuthContext);
  // const [state, dispatch] = React.useReducer(reducer, initialState);
  // React.useEffect(() => {
  //   dispatch({
  //     type: "FETCH_TABLES_REQUEST"
  //   });
  //   fetch("http://localhost:3030/tables/", {
  //     // the reason I can do leave out the localhost is I designated port 3030 as a proxy
  //     // fetch("/tables/", {
  //     headers: {
  //       Authorization: `Bearer ${authState.token}`
  //     }
  //   })
  //     .then(res => {
  //       if (res.ok) {
  //         return res.json();
  //       } else {
  //         throw res;
  //       }
  //     })
  //     .then(resJson => {
  //       console.log(resJson);
  //       console.log("fetch table success")
  //       // let finalArr = []
  //       // finalArr = resJson.map(()=>
  //       //     {
  //       //         id: resJson.id;
  //       //         timeSlots: resJson.timeSlots
  //       //     })
  //       dispatch({
  //         type: "FETCH_TABLES_SUCCESS",
  //         //   let tabArr = tableArrayCons(resJson)
  //         //   payload: tableArrayCons(resJson)
  //         payload: resJson
  //       })
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       dispatch({
  //         type: "FETCH_TABLES_FAILURE"
  //       });
  //     });
  // }, [authState.token]);

  // const addBookingToTable = (tableID) => {
  //   const index = state.tables.map((tab) => tab.id).indexOf(tableID);
  //   dispatch({ type: "BOOK_TABLE", payload: { table: state.tables[index] } });
  // };
  // const setHomeState = (isBooking) => {
  //   return isBooking ? isBooking.useToggleState() : isBooking
  // }
  // setHomeState(isBooking)
  console.log("@Home, tablesContext.tables" + tablesContext.tables)
  console.log('@Home, autcontext token: ' + authContext.state.token)
  // console.log('@Home, autcontext.state access_token: ' + authContext.state.access_token)

  return (
    <React.Fragment>
      <TabContextProvider>
        <TableSelection />

        <div className="home">
          {tablesContext.state.isFetching ? (
            <span className="loader">LOADING...</span>
          ) : tablesContext.state.hasError ? (
            <span className="error">AN ERROR HAS OCCURED</span>
          ) :
              tablesContext.state.isBooking ?
                (
                  // console.log("@Home in rtn, table isBooking: true\ntypof" + typeof table) &&
                  < TablesList isBooking={isBooking} tables={tablesContext.state.tableForBooking} ></TablesList>
                ) :
                // console.log("@Home in rtn, table isBooking: false\ntypof" + typeof table) &&
                < TablesList isBooking={isBooking} tables={tablesContext.tables} ></TablesList>
          }
        </div>
      </TabContextProvider>
    </React.Fragment>
  );
};
export default Home;