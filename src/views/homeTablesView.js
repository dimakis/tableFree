import React, { useContext } from "react";
import HomePageTemplate from "../homPageTemplate";
import { AuthContext } from "../contexts/adminContext";

const tables=[
    {
        "id": 100,
        "timeSlots": [
          {
            "time": "12-1",
            "isBooked": true
          },
          {
            "time": "1-2",
            "isBooked": true
          }
        ]
      },
]

const HomeTablesView = () =>    {
    const context = useContext(AuthContext);
    // const tables = context.tables.values
    console.log(context)
    return (
        <HomePageTemplate 
        tables={tables} >
        </HomePageTemplate>
    )
    
}
export default HomeTablesView;