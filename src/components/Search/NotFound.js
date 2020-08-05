import { makeStyles } from '@material-ui/core';
import React from 'react';


const useStyles = makeStyles({
    text: {
        color: 'red',
        color: '#21212d',
        'font-size': '3rem',
        'font-weight': 400,
        'font-family': '"Roboto", "Helvetica", "Arial", sans-serif',
        'line-height': '1.5em',
        'text-align': 'center'
    }
})

export default function NotFound({ isNotFound }) {
    const classes = useStyles();

    if(!isNotFound){
        return null
    }
    return <p className={classes.text}>Tester name not found</p>
}