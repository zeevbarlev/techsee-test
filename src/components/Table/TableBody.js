import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { cellHead, ORDER_BY } from "./Table";


class CustomTableBody extends Component {

    columnNames = [ cellHead.firstName, cellHead.lastName, cellHead.country, cellHead.bugs ]

    generateRows() {
        const { order, orderBy, data, page, rowsPerPage } = this.props
        const startRow = page * rowsPerPage

        const orderFactor = order === ORDER_BY.ASC ?  1 : -1

        let generatedRows = this.props.data
        .sort((a, b) => a[orderBy] > b[orderBy] ? orderFactor : -orderFactor)
        .slice(startRow, startRow + rowsPerPage)
        .map(row => ({
                ...row,
                [cellHead.bugs]: row[cellHead.bugs].map(bug => bug.title).join(', ')
        }))
        
        return generatedRows
    }

    render() {

        return (
            <TableBody>
                {
                    this.generateRows().map((row) => (
                        <TableRow
                            hover
                            tabIndex={-1}
                            key={row[cellHead.firstName]}>
                            {
                                this.columnNames.map(c => (
                                    <TableCell className={`test-${c}-value`} align="left" key={row[c]}>{row[c]}</TableCell>
                                ))
                            }
                        </TableRow>
                    )
                )}
            </TableBody>
        );
    }
}

const mapStateToProps = (state) => ({
    data: state.requestData.data
})

export default connect(mapStateToProps)(CustomTableBody);