import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link, NavLink } from "react-router-dom";
import { theme } from '../theme/index'
import useStyles from './navBarStyles'
// import "../App.css";



const NavBar = () => {

    const styleClass = useStyles();

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <NavLink href="#" className={styleClass.header} to="/home">
                        <Typography  theme={theme}>
                            <h1>tableFree</h1>
                        </Typography>
                    </NavLink>
                    <ul>
                        <NavLink href="#" className={styleClass.header} to="/addTablePage" >
                        <Typography theme={theme}>
                            <h2>Add tables</h2>
                        </Typography>
                        </NavLink>
                    </ul>
                </Toolbar>
            </AppBar>
        </div>
    )
}
export default NavBar;