import { Button, Icon, makeStyles } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux'
import { search } from '../../redux/actions/searchAction';
import classnames from "classnames";

const useStyles = makeStyles({
    button: {
        textTransform: 'initial',
        marginLeft: 16
    }
})

export default function SearchButton({ disabled, inputValue }) {

    const dispatch = useDispatch()
    const classes = useStyles();
    
    const onSearch = () => {
        dispatch(search(inputValue))
    }

    return (
        <Button
            disabled={disabled}
            onClick={onSearch}
            variant="contained"
            color="primary"
            className={classnames(classes.button, 'test-button') }
            endIcon={<Icon>search</Icon>}
        >Fetch
            </Button>)
}