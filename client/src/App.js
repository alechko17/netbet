import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ToDoList from './components/ToDoList';
import useFilters from './hooks/useFilters'

import './App.css';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

function App() {

  const {sortState, filterState, filterNav, typeState, searchState} = useFilters()
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3} alignItems="center" direction="column">
        {filterNav}
        <ToDoList {...{sortState, filterState, typeState, searchState} }  rowsPerPage={5}/>
      </Grid>
    </div>
  );
}

export default App;
