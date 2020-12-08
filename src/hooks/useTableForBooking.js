import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../App";




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