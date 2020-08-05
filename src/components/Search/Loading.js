import { makeStyles, CircularProgress } from '@material-ui/core';
import React from 'react';


const useStyles = makeStyles({
    loadingContainer: {
        "position": "fixed",
        "width": "100%",
        "height": "100%",
        "display": "flex",
        "justifyContent": "center",
        "alignItems": "center"
    }
})

export default function Loading({ isLoading }) {
    const classes = useStyles();

    if (!isLoading) {
        return null
    }
    return (
        <div className={classes.loadingContainer}>
            <CircularProgress size={60} disableShrink />
        </div>)
}