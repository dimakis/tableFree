import React from "react";
import { AuthContext } from "../contexts/adminContext";

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

const isAuthenticated = () => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    return (
        <React.Fragment>
            <AuthContext.Provider
            value={{
                state,
                dispatch
              }}
            >
            </AuthContext.Provider>
        </React.Fragment>
    
)
}
export default isAuthenticated;