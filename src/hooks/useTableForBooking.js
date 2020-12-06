import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../App";

const context = useContext(AuthContext);


const getTable = id =>  {
    return (
      context.tables 
    )
  }

const useTableForBooking = id =>    {
    const [table, setTable] = useState(null);
    useEffect(() => {
        getTable(id).then(table =>{
            setTable(table)
        });
    },[id]);
    return [table,setTable];
};

export default useTableForBooking;