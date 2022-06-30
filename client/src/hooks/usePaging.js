import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  button: {
    border: 'none',
    padding: '7px 14px',
    borderRadius: 10,
    cursor: 'pointer',
    marginRight: 4,
    marginLeft: 4,
    },
  activeButton: {
    color: 'white',
    background: '#185adb',
  },
  inactiveButton: {
    color: '#2c3e50',
    background: '#f9f9f9',
  },
});



const usePaging = ({ totalRows, rowsPerPage }) => {

    const [pageState, setPageState] = useState(1)
    const classes = useStyles();

    const pages = Math.ceil( totalRows / rowsPerPage )


      return {
        pageState,
        renderedPaging: (
          <>
            {[...Array(pages)].map((el, index) =>
              <button
                key={index}
                className={`${classes.button} ${
                  pageState === index+1 ? classes.activeButton : classes.inactiveButton
                }`}
                onClick={() => setPageState(index+1)}
              >
                {index+1}
              </button>
            )}
          </>
        )
      };
}

export default usePaging;