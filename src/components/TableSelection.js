import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AuthContext from '../App';
import { NavLink } from "react-router-dom";
import { theme } from '../theme/index'
import Typography from '@material-ui/core/Typography';




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
    },
  },

}));
const TableSelection = props => {
  const classes = useStyles();
  const context = React.useContext(AuthContext);

  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
          <NavLink href="#" className={classes.root} to="/addTablePage" >
              <Typography theme={theme}>
                <h2>Add Tables</h2>
              </Typography>
            </NavLink>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
export default TableSelection;