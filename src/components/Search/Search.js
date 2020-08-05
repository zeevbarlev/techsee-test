import { Grid, TextField, withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import SearchButton from "./SearchButton";


export const MIN_VALID_LENGTH_NAME = 2
export const MAX_VALID_LENGTH_NAME = 12

const styles = theme => ({
    inputContainer: {
        height: 56
    },
    textField: {
        width: '50%'
    }
})



class Search extends Component {
    state = {
        inputValue: '',
        isErrorInInput: false
    }

    isInvalidName(inputValue) {

        return inputValue.length < MIN_VALID_LENGTH_NAME ||
            inputValue.length > MAX_VALID_LENGTH_NAME
    }

    getErrorMessage() {
        const { inputValue, isErrorInInput } = this.state

        let message = ''
        if (inputValue.length < MIN_VALID_LENGTH_NAME) {
            message = `name must be greater than ${MIN_VALID_LENGTH_NAME} characters`
        }
        else if (inputValue.length > MAX_VALID_LENGTH_NAME) {
            message = `name must be less than ${MAX_VALID_LENGTH_NAME} characters`
        }

        return message
    }

    onChangeText = (e) => {
        const shouldSetErrorInInput = this.state.isErrorInInput && this.isInvalidName(e.target.value)
        this.setState({
            inputValue: e.target.value,
            isErrorInInput: shouldSetErrorInInput
        })
    }

    onBlur = () => {
        const { inputValue } = this.state

        this.setState({
            isErrorInInput: inputValue.length > 0 && this.isInvalidName(inputValue)
        })
    }

    render() {
        const { classes } = this.props
        const { inputValue, isErrorInInput } = this.state

        return (
            <Grid wrap='nowrap' justify='center' container className={classes.inputContainer}>
                <TextField
                    onBlur={this.onBlur}
                    error={isErrorInInput}
                    helperText={isErrorInInput && this.getErrorMessage()}
                    className={classes.textField}
                    autoFocus
                    label="Tester Name"
                    placeholder="Enter the tester name"
                    variant='outlined'
                    value={inputValue}
                    onChange={this.onChangeText}
                    inputProps={{ className: 'test-input' }}
                    FormHelperTextProps={{ className: 'test-helper-text' }}
                />
                <SearchButton
                    disabled={this.isInvalidName(inputValue)}
                    inputValue={inputValue}
                />
            </Grid>
        )
    }
}


export default withStyles(styles)(Search);

