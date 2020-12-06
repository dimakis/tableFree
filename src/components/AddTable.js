import React, { useContext, createContext } from "react";
import { AuthContext } from "../contexts/adminContext";
import { Table } from "@material-ui/core";


const ADD_TABLE = 'ADD_TABLE'
const REMOVE_TABLE = 'REMOVE_TABLE'

const editTableReducer = (state, action) => {
    switch (action.type) {
        case ADD_TABLE:
            return [...state, { table: action.table }];
        case REMOVE_TABLE:
            return state.filter(table => table, id !== action.table.id);
        default:
            return state;
    }
}
export default editTableReducer;