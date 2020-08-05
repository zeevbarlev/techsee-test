import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import React, { Component } from 'react';
import { cellHead, ORDER_BY } from "./Table";


export default class CustomTableHead extends Component {

    headCells = [
        { id: cellHead.firstName, label: 'First name', isSortable: true },
        { id: cellHead.lastName, label: 'Last name', isSortable: true },
        { id: cellHead.country, label: 'Country', isSortable: true },
        { id: cellHead.bugs, label: 'Bugs', isSortable: false },
    ];

    sort = (columnName) => () => {
        const { order, orderBy, setSort } = this.props

        let newOrder
        if (columnName !== orderBy || order === ORDER_BY.DESC) {
            newOrder = ORDER_BY.ASC
        }
        else {
            newOrder = ORDER_BY.DESC
        }

        setSort({ orderBy: columnName, order: newOrder })
    }

    

    isSortable(headCell){
        return headCell.isSortable && this.props.rowCount > 1
    }

    render() {
        const { order, orderBy } = this.props;


        return (
            <TableHead>
                <TableRow>
                    {this.headCells.map((headCell) => (
                        <TableCell
                        className={`test-sort-by-${headCell.id}`}
                            key={headCell.id}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                        {
                            !this.isSortable(headCell) ? headCell.label : <TableSortLabel
                            
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : ORDER_BY.ASC}
                            onClick={this.sort(headCell.id)}
                        >
                            {headCell.label}
                        </TableSortLabel> 
                        }
                            
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }
}

