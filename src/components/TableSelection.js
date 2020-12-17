import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { AuthContext } from '../App';
import { NavLink } from "react-router-dom";
import { theme } from '../theme/index'
import Typography from '@material-ui/core/Typography';
import { TablesContext } from '../context/tablesContext'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import Button from '@material-ui/core/Button'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textDecoration: 'none'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  dropdownRoot: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    }
  },
  logOutButton: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 2,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 104,
    width: 300,
    padding: '0 30px',
    fontWeight: "fontWeightBold",
    fontSize: '22'

  },
}));


const TableSelection = props => {
  const classes = useStyles();
  const context = React.useContext(TablesContext);
  const authContext = React.useContext(AuthContext)

  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value);
  };
  const handleTextChange = e => {
    handleChange(e, "table", e.target.value);
  };
  const handleTableChange = e => {
    handleChange(e, "table", e.target.value);
  };
  const handleLogOut = e => {
    authContext.dispatch({ type: "LOGOUT" })
  };

  const animatedComponents = makeAnimated()
  console.log('@tablesSelection, context.tables: ' + context.tables)
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <NavLink href="#" className={classes.root} to="/addTablePage" >
              <Typography theme={theme}>
                <h2>Add Tables</h2>
              </Typography>
            </NavLink>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <NavLink className={classes.root} to="/bookingPage/" >
              <Typography theme={theme}>
                <h2>Book Table</h2>
              </Typography>
            </NavLink>
          </Paper>
        </Grid>
        <Grid item xm={4}>
          <Paper className={classes.paper}>
            <Button onClick={handleLogOut} className={classes.logOutButton} components={animatedComponents}
            >Log Out</Button>

          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
export default TableSelection;