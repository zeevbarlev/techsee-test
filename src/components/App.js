import { withStyles } from '@material-ui/core';
import classnames from "classnames";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import ErrorQuery from "./Search/ErrorQuery";
import Loading from "./Search/Loading";
import NotFound from "./Search/NotFound";
import Search from "./Search/Search";
import Table from "./Table/Table";

const styles = theme => ({
    loading: {
        opacity: 0.3
    },
    container: {
        width: '100%',
    },
    title: {
        color: '#21212d',
        'font-size': '3rem',
        'font-weight': 400,
        'font-family': '"Roboto", "Helvetica", "Arial", sans-serif',
        'line-height': '1.5em',
        'text-align': 'center',
    }
})



class App extends Component {

    render() {
        const { classes, requestData } = this.props

        return (
            <div className={classnames(classes.container, requestData.isFetching && classes.loading)}>
                <Loading isLoading={requestData.isFetching} />
                <p className={classes.title}>Search bugs</p>
                <Search />
                <NotFound isNotFound={requestData.isNotFound} />
                <ErrorQuery isError={requestData.didInvalidate} />
                <Table />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    requestData: state.requestData
})

export default compose(withStyles(styles),
    connect(
        mapStateToProps,
        null
    ))(App);

