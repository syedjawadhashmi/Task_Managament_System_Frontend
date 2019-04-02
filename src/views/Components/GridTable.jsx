import * as React from 'react';
import {
    SortingState, EditingState, PagingState, SummaryState,
    IntegratedPaging, IntegratedSorting, IntegratedSummary,
    FilteringState, IntegratedFiltering, IntegratedGrouping,
    IntegratedSelection, SelectionState
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table, TableHeaderRow, TableEditRow, TableEditColumn,
    PagingPanel, DragDropProvider, TableColumnReordering,
    TableFixedColumns, TableSummaryRow, TableSelection,
    TableFilterRow
} from '@devexpress/dx-react-grid-material-ui';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TableCell from '@material-ui/core/TableCell';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { withStyles } from '@material-ui/core/styles';

import firebase from "../../constant/api/firebase";


// import { ProgressBarCell } from '../../../theme-sources/material-ui/components/progress-bar-cell';
// import { HighlightedCell } from '../../../theme-sources/material-ui/components/highlighted-cell';
// import { CurrencyTypeProvider } from '../../../theme-sources/material-ui/components/currency-type-provider';
// import { PercentTypeProvider } from '../../../theme-sources/material-ui/components/percent-type-provider';

import {
    generateRows,
    globalSalesValues,
} from './demo-data';

const styles = theme => ({
    lookupEditCell: {
        paddingTop: theme.spacing.unit * 0.875,
        paddingRight: theme.spacing.unit,
        paddingLeft: theme.spacing.unit,
    },
    dialog: {
        width: 'calc(100% - 16px)',
    },
    inputRoot: {
        width: '100%',
    },
});

const AddButton = ({ onExecute }) => (
    <div style={{ textAlign: 'center' }}>
        <Button
            color="primary"
            onClick={onExecute}
            title="Create new row"
        >
            New
    </Button>
    </div>
);

const EditButton = ({ onExecute }) => (
    <IconButton onClick={onExecute} title="Edit row">
        <EditIcon />
    </IconButton>
);

const DeleteButton = ({ onExecute }) => (
    <IconButton
        onClick={() => {
            // eslint-disable-next-line
            if (window.confirm('Are you sure you want to delete this row?')) {
                onExecute();
            }
        }}
        title="Delete row"
    >
        <DeleteIcon />
    </IconButton>
);

const CommitButton = ({ onExecute }) => (
    <IconButton onClick={onExecute} title="Save changes">
        <SaveIcon />
    </IconButton>
);

const CancelButton = ({ onExecute }) => (
    <IconButton color="secondary" onClick={onExecute} title="Cancel changes">
        <CancelIcon />
    </IconButton>
);

const commandComponents = {
    add: AddButton,
    edit: EditButton,
    delete: DeleteButton,
    commit: CommitButton,
    cancel: CancelButton,
};

const Command = ({ id, onExecute }) => {
    const CommandButton = commandComponents[id];
    return (
        <CommandButton
            onExecute={onExecute}
        />
    );
};

const availableValues = {
    product: globalSalesValues.product,
    region: globalSalesValues.region,
    customer: globalSalesValues.customer,
};

const LookupEditCellBase = ({
    availableColumnValues, value, onValueChange, classes,
}) => (
        <TableCell
            className={classes.lookupEditCell}
        >
            <Select
                value={value}
                onChange={event => onValueChange(event.target.value)}
                input={(
                    <Input
                        classes={{ root: classes.inputRoot }}
                    />
                )}
            >
                {availableColumnValues.map(item => (
                    <MenuItem key={item} value={item}>
                        {item}
                    </MenuItem>
                ))}
            </Select>
        </TableCell>
    );
export const LookupEditCell = withStyles(styles, { name: 'ControlledModeDemo' })(LookupEditCellBase);

const Cell = (props) => {
    const { column } = props;
    if (column.name === 'discount') {
        // return <ProgressBarCell {...props} />;
    }
    if (column.name === 'amount') {
        // return <HighlightedCell {...props} />;
    }
    return <Table.Cell {...props} />;
};

const EditCell = (props) => {
    const { column } = props;
    const availableColumnValues = availableValues[column.name];
    if (availableColumnValues) {
        return <LookupEditCell {...props} availableColumnValues={availableColumnValues} />;
    }
    return <TableEditRow.Cell {...props} />;
};

const getRowId = row => row.id;


class DemoBase extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                { name: 'ProjectCode', title: 'Project Code' },
                { name: 'category', title: 'Category' },
                { name: 'ticketSummary', title: 'Summary' },
                { name: 'status', title: 'Status' },
                { name: 'number', title: 'Task Code' },
                { name: 'assigned', title: 'Assigned' },
                { name: 'priority', title: 'Priority' },
                { name: 'deadline', title: 'Deadline' },
                { name: 'est_dev_efforts', title: 'Est. Dev Effort' },
                { name: 'act_dev_efforts', title: 'Act. Dev Effort' },
                { name: 'rate_unit_dev', title: 'Dev. Rate Unit' },
                { name: 'dev_efforts_amt', title: 'Dev. Effort Amount' },
                { name: 'dev_paid_on', title: 'Dev.Paid On' },
                { name: 'est_cus_efforts', title: 'Est. Customer Effort' },
                { name: 'act_cus_efforts', title: 'Act. Customer Effort' },
                { name: 'rate_unit_cus', title: 'Customer Rate Unit' },
                { name: 'cus_efforts_amt', title: 'Invoice Amount' },
                { name: 'cus_paid_on', title: 'Paid by Customer On' }
            ],
            tableColumnExtensions: [
                { columnName: 'product', width: 180 },
                { columnName: 'region', width: 180 },
                { columnName: 'amount', width: 120, align: 'right' },
                { columnName: 'discount', width: 180 },
                { columnName: 'saleDate', width: 180 },
                { columnName: 'customer', width: 180 },
            ],
            rows: [],
            sorting: [],
            editingRowIds: [],
            addedRows: [],
            rowChanges: {},
            currentPage: 0,
            pageSize: 0,
            pageSizes: [5, 10, 0],
            columnOrder: ['product', 'region', 'amount', 'discount', 'saleDate', 'customer'],
            currencyColumns: ['amount'],
            percentColumns: ['discount'],
            leftFixedColumns: [TableEditColumn.COLUMN_TYPE],
            totalSummaryItems: [
                { columnName: 'discount', type: 'avg' },
                { columnName: 'amount', type: 'sum' },
            ],
            tasks: [],
            loading: true
        };
        const getStateRows = () => {
            const { rows } = this.state;
            return rows;
        };

        this.changeSorting = sorting => this.setState({ sorting });
        this.changeEditingRowIds = editingRowIds => this.setState({ editingRowIds });
        this.changeAddedRows = addedRows => this.setState({
            addedRows: addedRows.map(row => (Object.keys(row).length ? row : {
                amount: 0,
                discount: 0,
                saleDate: new Date().toISOString().split('T')[0],
                product: availableValues.product[0],
                region: availableValues.region[0],
                customer: availableValues.customer[0],
            })),
        });
        this.changeRowChanges = rowChanges => this.setState({ rowChanges });
        this.changeCurrentPage = currentPage => this.setState({ currentPage });
        this.changePageSize = pageSize => this.setState({ pageSize });
        this.commitChanges = ({ added, changed, deleted }) => {
            let { rows } = this.state;
            if (added) {
                const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
                rows = [
                    ...rows,
                    ...added.map((row, index) => ({
                        id: startingAddedId + index,
                        ...row,
                    })),
                ];
            }
            if (changed) {
                rows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
            }
            if (deleted) {
                rows = this.deleteRows(deleted);
            }
            this.setState({ rows });
        };
        this.deleteRows = (deletedIds) => {
            firebase
                .database()
                .ref("Tasks")
                .child(deletedIds[0])
                .remove()
                .then(() => {
                })
                const rows = getStateRows().slice();
                    deletedIds.forEach((rowId) => {
                        const index = rows.findIndex(row => row.id === rowId);
                        if (index > -1) {
                            rows.splice(index, 1);
                        }
                    });
                    return rows;
        };
        this.changeColumnOrder = (order) => {
            this.setState({ columnOrder: order });
        };
    }

    componentDidMount() {
        this.getTasks()
    }

    // componentDidUpdate() {
    //     this.getTasks();
    // }

    getTasks() {
        firebase
            .database()
            .ref("Tasks")
            .on("value", data => {
                if (data.val()) {
                    let tasks = this.snapshotToArray(data.val())
                    this.setState({ rows: tasks, loading: false })
                }
                else{
                    this.setState({ loading: false })
                }
            })
    }

    snapshotToArray = snapshot => Object.entries(snapshot).map(e => Object.assign(e[1], { id: e[0] }));

    render() {
        console.log('rowssss', this.state.rows)
        console.log('tasks', this.state.tasks)
        const {
            rows,
            columns,
            tableColumnExtensions,
            sorting,
            editingRowIds,
            addedRows,
            rowChanges,
            currentPage,
            pageSize,
            pageSizes,
            columnOrder,
            currencyColumns,
            percentColumns,
            leftFixedColumns,
            totalSummaryItems,
            loading
        } = this.state;

        // const rows = [{
        //     amount: 10294,
        //     channel: "VARs",
        //     customer: "Beacon Systems",
        //     discount: 0.279,
        //     id: 0,
        //     product: "EnviroCare Max",
        //     region: "South America",
        //     saleDate: "2016-02-29",
        //     sector: "Banking",
        //     shipped: false,
        //     units: 4
        // }]

        return (
            <Paper>
                <Grid
                    rows={rows}
                    columns={columns}
                    getRowId={getRowId}
                >
                    <FilteringState />
                    <SortingState
                        sorting={sorting}
                        onSortingChange={this.changeSorting}
                    />
                    <PagingState
                        currentPage={currentPage}
                        onCurrentPageChange={this.changeCurrentPage}
                        pageSize={pageSize}
                        onPageSizeChange={this.changePageSize}
                    />

                    {/* <IntegratedGrouping /> */}
                    <IntegratedFiltering />

                    <EditingState
                        editingRowIds={editingRowIds}
                        onEditingRowIdsChange={this.changeEditingRowIds}
                        rowChanges={rowChanges}
                        onRowChangesChange={this.changeRowChanges}
                        addedRows={addedRows}
                        onAddedRowsChange={this.changeAddedRows}
                        onCommitChanges={this.commitChanges}
                    />
                    <SummaryState
                        totalItems={totalSummaryItems}
                    />

                    <IntegratedSorting />
                    <IntegratedPaging />
                    <IntegratedSummary />

                    {/* <CurrencyTypeProvider for={currencyColumns} />
          <PercentTypeProvider for={percentColumns} /> */}

                    <DragDropProvider />

                    <Table
                        columnExtensions={tableColumnExtensions}
                        cellComponent={Cell}
                    />
                    {/* <TableColumnReordering
                        order={columnOrder}
                        onOrderChange={this.changeColumnOrder}
                    /> */}
                    <TableHeaderRow showSortingControls />
                    <TableFilterRow />
                    <TableEditRow
                        cellComponent={EditCell}
                    />
                    <TableEditColumn
                        width={170}
                        showAddCommand={!addedRows.length}
                        showEditCommand
                        showDeleteCommand
                        commandComponent={Command}
                    />
                    <TableSummaryRow />
                    <TableFixedColumns
                        leftColumns={leftFixedColumns}
                    />
                    <PagingPanel
                        pageSizes={pageSizes}
                    />
                </Grid>
                {loading && 'loading...'}
            </Paper>
        );
    }
}

export default withStyles(styles, { name: 'ControlledModeDemo' })(DemoBase);