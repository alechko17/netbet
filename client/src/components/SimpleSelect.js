import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    selectWrap: {
      margin: 20,
    },
    select:{
        minWidth: 120,
        minHeight: 30
    }
  });


function SimpleSelect(props) {

    const classes = useStyles();

    return (
        <span className={classes.selectWrap}>
            {props.lable && (
                <label>{props.lable}</label>
            )}
            <select 
                className={classes.select}
                onChange={e=>props.onChange(e.target.value)}
            >
                <option value=""></option>
                {props.data && props.data.map((select , key) => (
                    <option value={select.key} key={key}>{select.value}</option>
                ))}
            </select>
        </span>
    )
}


export default SimpleSelect;