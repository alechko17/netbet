import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import usePaging from '../hooks/usePaging';
import httpRequest from '../helpers/httpRequest'
import LinearIndeterminate from './LinearIndeterminate'


const useStyles = makeStyles({
    root: {
      flexGrow: 1,
      minWidth: 500,
      background: '#e4ecff',
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    }
  });


const ToDoList = ({sortState, filterState, typeState, searchState, rowsPerPage}) => {

    const [todos, setTodos] = useState('')
    const [totalRows, setTotalRows] = useState('')
    const [loader, setLoader] = useState(false)

    const { pageState, renderedPaging } = usePaging({totalRows, rowsPerPage});
    const classes = useStyles();

    
  
    useEffect(() => {
        setLoader(true);

        var filter = []
        if(filterState){
            filter.push(`status:${filterState}`)
        }
        if(typeState){
            filter.push(`type:${typeState}`)
        }
        filter = filter.join("|")

        httpRequest(`/api/todos?sort=${sortState}&filter=${filter}&page=${pageState}&rows=${rowsPerPage}&fastSearch=${searchState}`).then(data => {
            setTodos(data.todoData);
            setTotalRows(data.totalRows);
            setLoader(false);
        });

    }, [ sortState, filterState, pageState, typeState, rowsPerPage, searchState])
  

    const updateTask = (e) => {

        const postBody = {
            id: e.id, 
            status: e.status.toLocaleLowerCase() === "active" ? "Done" : "Active"
        }

        httpRequest(`/api/todos/update`, postBody, 'POST').then(data => {
            
            setTodos(data.todoData);
            setTotalRows(data.totalRows);
        });
    }
  

    return (
        <>
            <Grid item >
                {renderedPaging}
            </Grid>
            {loader && (
                <LinearIndeterminate />
            )}  
            {todos.length === 0 
            ? (<Typography variant="body2" color="textSecondary" component="p">
                    No Data to show
                </Typography>) 
            : 
            (todos.map((todo , key) => (
                <Grid item key={key}>
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography className={classes.title} color="textPrimary" gutterBottom>
                                {todo.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {new Date(todo.creationTime).toLocaleDateString()}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {todo.status}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {todo.content}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {todo.type}
                            </Typography>
                            { todo.status.toLocaleLowerCase() === 'active' && (
                                <button onClick={e => updateTask(todo)} >
                                    Change to Done
                                </button>
                            )}
                        </CardContent>
                    </Card>
                </Grid>))
            )} 
            
        </>
    );
  }
  
  export default ToDoList;