import React from "react";
import Home from '../components/Home'
import Login from '../components/Login'
import ProtectedRoute from "../components/ProtectedRoute";
import { Route } from 'react-router-dom'
import { AuthContext } from '../App'


export const TablesContext = React.createContext();
export const TablesDispatchContext = React.createContext();


const initialState = {
    // isAuthenticated: false,
    // user: null,
    // token: null,
    tables: [],
    isFetching: false,
    hasError: false,
    isBooking: false,
    tableForBooking: []
};

const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_TABLES_REQUEST":
            // console.log('@tablesContext, token: ' + state.token)

            return {
                // token: state.token,
                // isAuthenticated: 
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
            console.log('@tablesCon, BOOK_TABLE')
            return {
                isBooking: true,
                ...state,
                tableForBooking: action.payload.table,

            };
            case "FETCH_TABLE_REQUEST":
                // console.log('@tablesContext, token: ' + state.token)
    
                return {
                    // token: state.token,
                    // isAuthenticated: 
                    ...state,
                    tableForBooking: action.payload,
                    isFetching: true,
                    hasError: false
                };

        default:
            return state;
    }
};

export const TabContextProvider = (props) => {
    const { state: authState } = React.useContext(AuthContext)
    console.log('@tablesContext, authstate.token: ' + authState.token)
    const [state, dispatch] = React.useReducer(reducer, initialState)


    // const log = 

    const addBookingToTable = (tableID) => {
        console.log("@tablesContext: in addBookingToTables ")
        const index = state.tables.map((tab) => tab.id).indexOf(tableID);
        dispatch({ type: "BOOK_TABLE", payload: { table: state.tables[index] } });
        // console.log("tablesContext.js addBookingToTable foo " + payload)
    };

    const FetchTableById = (id) => {
        React.useEffect(() => {
            dispatch({
                type: "FETCH_TABLES_REQUEST"
            });
            fetch(`http://localhost:3030/tables/${id}`, {
                // the reason I can do leave out the localhost is I designated port 3030 as a proxy
                // fetch("/tables/", {
                headers: {
                    Authorization: `Bearer ${state.token}`
                }
            })
                .then(res => {
                    return res = res.json();

                })
                .then(resJson => {
                    console.log(resJson);
                    console.log("fetch table success")
                    dispatch({
                        type: "FETCH_TABLES_SUCCESS",
                        payload: resJson
                    })
                })
                .catch(error => {
                    console.log(error);
                    dispatch({
                        type: "FETCH_TABLES_FAILURE"
                    });
                });
        }, []);
    }


    const FetchTables = () => {
        React.useEffect(() => {
            dispatch({
                type: "FETCH_TABLES_REQUEST"
            });
            fetch("http://localhost:3030/tables/", {
                // the reason I can do leave out the localhost is I designated port 3030 as a proxy
                // fetch("/tables/", {
                headers: {
                    Authorization: `Bearer ${state.token}`
                }
            })
                .then(res => {
                    return res = res.json();

                })
                .then(resJson => {
                    console.log(resJson);
                    console.log("fetch table success")
                    dispatch({
                        type: "FETCH_TABLES_SUCCESS",
                        payload: resJson
                    })
                })
                .catch(error => {
                    console.log(error);
                    dispatch({
                        type: "FETCH_TABLES_FAILURE"
                    });
                });
        }, []);
    }


    return (
        <React.Fragment>
            <TablesContext.Provider
                value={{
                    tables: state.tables,
                    // isAuthenticated: state.isAuthenticated,
                    // user: state.user,
                    // token: state.token,
                    isFetching: state.isFetching,
                    hasError: state.hasError,
                    isBooking: state.isBooking,
                    tableForBooking: state.tableForBooking,
                    state: { ...state },
                    addBookingToTable: addBookingToTable,
                    fetchTables: FetchTables,
                    fetchTableById: FetchTableById,
                    dispatch: dispatch,
                }}
            >
                <TablesDispatchContext.Provider
                    value={dispatch}
                >
                    {props.children}
                </TablesDispatchContext.Provider>
            </TablesContext.Provider>
        </React.Fragment>
    )
}
export default TabContextProvider;
