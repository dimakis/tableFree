import React, { useContext } from "react";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { AuthContext } from "../contexts/adminContext";

const FilterControls = props => {
    const context = useContext(AuthContext)

  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value);
  };
  const handleTextChange = e => {
    handleChange(e, "name", e.target.value);
  };

  return (
    <Grid container spacing={3}>
    <Grid item xs={12}>
      <Paper className={classes.paper}>xs=12</Paper>
        <h4>
          <span>List Filtering:</span>
          <input
            type="text"
            placeholder="Table Search"
            onChange={handleTextChange}
          />
        </h4>

    </Grid>
    </Grid>
  );
};

export default FilterControls;