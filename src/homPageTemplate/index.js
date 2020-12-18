import React, { useContext, useState} from "react";
import NavBar from "../navBar";
import { Home } from "../contexts/adminContext";


const HomePageTemplate = ({ tables, tableID, action }) => {
    const [nameFilter, setNameFilter] = useState("");
    let displayedTables = tables
        .filter(m => {
            return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
        })

    // const handleChange = (type, value) => {
    //     if (type === "name") setNameFilter(value);
    //     else setGenreFilter(value);
    // };
    return (
        <>
        <NavBar />
        <Home />
        </>

    );
};
export default HomePageTemplate;