import React, { useState, useMemo } from 'react';
import Grid from '@material-ui/core/Grid';
import SimpleSelect from '../components/SimpleSelect';
import debounce from "lodash.debounce";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    input:{
        minWidth: 120,
        minHeight: 24
    }
  });

const useFilters = () => {

    const [sortState, setSortState] = useState('')
    const [filterState, setFilterState] = useState('')
    const [typeState, setTypeState] = useState('')
    const [searchState, setSearchState] = useState('')

    const classes = useStyles();

    const filterData = [
        {key: 'done', value: 'done'},
        {key: 'active', value: 'active'},
    ]

    const sortData = [
        {key: 'asc', value: 'asc'},
        {key: 'desc', value: 'desc'},
    ]

    const typeData = [
        {key: 'results', value: 'results'},
        {key: 'wins', value: 'wins'},
        {key: 'withdraw', value: 'withdraw'},
    ]


    const debouncedChangeHandler = useMemo(() => {
        return debounce((e) => {
                    setSearchState(e.target.value);
                }, 300);
    }, []);

    return {
        sortState,
        filterState,
        typeState,
        searchState,
        filterNav:(
            <>        
                <Grid item xs={10}>
                    <SimpleSelect 
                        data={filterData}
                        lable="filter by: "
                        onChange={sort => setFilterState(sort)}
                    />
                    <SimpleSelect 
                        data={sortData}
                        lable="sort by: "
                        onChange={sort => setSortState(sort)}
                    />
                    <SimpleSelect 
                        data={typeData}
                        lable="type by: "
                        onChange={sort => setTypeState(sort)}
                    />
                    <label>search here: </label>
                    <input type="text" onChange={debouncedChangeHandler} className={classes.input}/>
                </Grid>
            </>
        )
    }
}

export default useFilters;