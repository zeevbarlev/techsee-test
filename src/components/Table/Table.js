import { withStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import classnames from "classnames";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { invalidateRequest } from "../../redux/actions/searchAction";
import TableBody from "./TableBody";
import TableHead from "./TableHead";


export const cellHead = Object.freeze({
    firstName: 'firstName',
    lastName: 'lastName',
    country: 'country',
    bugs: 'bugs'
})

export const ORDER_BY = Object.freeze({
    ASC: 'asc',
    DESC: 'desc'
})

const styles = theme => ({
    container: {
        marginTop: 80
    }
})

class CustomTable extends Component {
    state = {
        order: ORDER_BY.ASC,
        orderBy: cellHead.firstName,
        page: 0,
        rowsPerPage: 10,
    }

    setSort = ({ order, orderBy }) => {
        this.setState({ order, orderBy })
    }

    handleChangePage = (event, newPage) => {
        this.setState({ page: newPage })
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({ rowsPerPage: event.target.value, page: 0 })
    };

    componentDidCatch(){
        this.props.dispatch(invalidateRequest())
    }

    render() {
        const { data, classes, didInvalidate } = this.props
        const { order, orderBy, rowsPerPage, page, error } = this.state

        if (didInvalidate || !data || !data.length) {
            return null
        }

        return (
            <div className={classes.container}>
                <TableContainer>
                    <Table
                        className={classnames(classes.table, 'test-table')}
                        aria-labelledby="tableTitle"
                        size='medium'
                        aria-label="enhanced table">
                        <TableHead
                            rowCount={data.length}
                            order={order}
                            orderBy={orderBy}
                            setSort={this.setSort} />
                        <TableBody
                        order={order}
                        orderBy={orderBy}
                            page={page}
                            rowsPerPage={rowsPerPage}/>
                    </Table>
                </TableContainer>
                {
                    data.length > 1 && <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
                }
            </div>)
    }
}

const mapStateToProps = (state) => ({
    data: state.requestData.data,
    didInvalidate: state.requestData.didInvalidate,
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default compose(withStyles(styles),
    connect(mapStateToProps))(CustomTable);