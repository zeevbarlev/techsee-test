import { makeStyles } from '@material-ui/core';
import React from 'react';
import classnames from "classnames";

const useStyles = makeStyles({
    error: {
        color: 'red',
        'font-size': '3rem',
        'font-weight': 400,
        'font-family': '"Roboto", "Helvetica", "Arial", sans-serif',
        'line-height': '1.5em',
        'text-align': 'center'
    }
})

export default function ErrorQuery({ isError }) {
    const classes = useStyles();

    if(!isError){
        return null
    }
    return <p className={classnames(classes.error, 'test-error-query') }>Temporary error occurred, please try again later</p>
}