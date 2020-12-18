import React, { useContext } from "react";
import HomePageTemplate from "../homPageTemplate";
import { AuthContext } from "../contexts/adminContext";


const HomeTablesView = () =>    {
    const context = useContext(AuthContext);
    const tables = context.state.tables.values;
    console.log(tables)

    return (
        <HomePageTemplate 
        tables={tables} >
        </HomePageTemplate>
    )
    
}
export default HomeTablesView;