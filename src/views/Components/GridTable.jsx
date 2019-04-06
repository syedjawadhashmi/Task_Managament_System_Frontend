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
import Comment from "@material-ui/icons/Comment";
import { withStyles } from '@material-ui/core/styles';

import firebase from "../../constant/api/firebase";
import CircularProgress from '@material-ui/core/CircularProgress';

import AddTask from './AddTask'
import Comments from './Comment'

// import { ProgressBarCell } from '../../../theme-sources/material-ui/components/progress-bar-cell';
// import { HighlightedCell } from '../../theme-sources/material-ui/components/highlighted-cell';
// import { Loading } from '../../theme-sources/material-ui/components/loading';
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

const priorities = ['High', 'Medium', 'Low'];
const categories = ['Dev', 'Support'];
const status = ['Open', 'Close'];
const rateUnits = ['Hourly', 'Daily', 'Weekly', 'Monthly'];

let role = localStorage.getItem("role") && localStorage.getItem("role").replace(/['"]+/g, "");

const AddButton = ({ onExecute }) => (
    <div style={{ textAlign: 'center' }}>
        <Button
            color="primary"
            // onClick={onExecute}
            title="Create new row"
        >
            New
    </Button>
    </div>
);

const EditButton = ({ onExecute, row }) => {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const seflCreated = role !== "Developer" && row.createdBy == currentUser.email ? true : false
    return (
        <IconButton
            disabled={seflCreated ? false : true}
            onClick={onExecute}
            title="Edit row">
            <EditIcon />
        </IconButton>
    )
}

const DeleteButton = ({ onExecute, row }) => (
    <IconButton
        disabled={role !== "Admin"}
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
    cancel: CancelButton
};

const Command = ({ id, onExecute }) => {
    const CommandButton = commandComponents[id];
    return (
        <CommandButton
            onExecute={onExecute}
        />
    );
};

let availableValues = {
    priority: priorities,
    category: categories,
    status: status,
    rate_unit_cus: rateUnits,
    rate_unit_dev: rateUnits
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
    const role = localStorage.getItem("role") && localStorage.getItem("role").replace(/['"]+/g, "");
    const { column } = props;
    const availableColumnValues = availableValues[column.name];
    if (availableColumnValues) {
        return <LookupEditCell {...props} availableColumnValues={availableColumnValues} />;
    }
    return <TableEditRow.Cell
        {...props}
        editingEnabled={
            column.name == 'ProjectCode' ||
                column.name == 'number' ||
                column.name == 'customer' ||
                (column.name == 'est_dev_efforts' && (role == 'Product Owner' || role == 'Product Owner')) ||
                (column.name == 'act_dev_efforts' && (role == 'Product Owner' || role == 'Product Owner')) ||
                (column.name == 'dev_efforts_amt' && (role == 'Product Owner' || role == 'Product Owner')) ||
                (column.name == 'dev_paid_on' && (role == 'Product Owner' || role == 'Product Owner')) ||
                (column.name == 'est_cus_efforts' && (role == 'Product Owner' || role == 'Product Owner')) ||
                (column.name == 'act_cus_efforts' && (role == 'Product Owner' || role == 'Product Owner')) ||
                (column.name == 'cus_efforts_amt' && (role == 'Product Owner' || role == 'Product Owner')) ||
                (column.name == 'cus_paid_on' && (role == 'Product Owner' || role == 'Product Owner'))
                ? false : true}
    />;
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
                { name: 'devName', title: 'Assigned' },
                { name: 'priority', title: 'Priority' },
                { name: 'deadline', title: 'Deadline' },
                { name: 'customer', title: 'Company' },
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
            projects: [],
            developers: [],
            loading: true,
            selection: [],
            open: false,
            draweropen: false,
            comments: [],
            text: "",
            editComment: false,
            childKey: "",
            completed: 0,
        };
        const getStateRows = () => {
            const { rows } = this.state;
            return rows;
        };

        this.changeSorting = sorting => this.setState({ sorting });
        this.changeEditingRowIds = editingRowIds => this.setState({ editingRowIds });
        this.changeAddedRows = (addedRows) => {
            this.setState({ open: true })
        }
        this.onCommentsChange = (key) => {
            this.setState({ comments: [] })
            debugger
            let comments = [];
            var ref = firebase.database().ref("Comments");
            let self = this;
            ref
                .orderByChild("taskId")
                .equalTo(key)
                .on("child_added", function (snapshot) {
                    console.log("ABID SHAKA", snapshot.val());
                    let CommentObj = {
                        comment: snapshot.val(),
                        key: snapshot.key
                    }
                    comments.push(CommentObj);
                    self.setState({ comments: comments });
                    console.log("JAWAD", self.state.comments);
                });
            self.setState({ draweropen: true, childKey: key })
        }
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
                const { developers } = this.state
                const key = Object.keys(changed)[0]
                let value = Object.values(changed)[0]
                if (value.devName) {
                    let developer = developers.find(x => x.name == value.devName)
                    const { email } = developer
                    value.assigned = email
                }
                value.lastUpdated = Date.now()
                firebase
                    .database()
                    .ref("Tasks/" + key)
                    .update(value)
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

        this.changeSelection = selection => this.setState({ selection });

    }
    handleInputChange = e => {
        this.setState({
            text: e.target.value
        });
    };


    handleMessaging = e => {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!this.state.text) {
            alert("Please enter a comment first!");
            return false;
        }

        const email = firebase.auth().currentUser.email;

        const ref = firebase.database().ref(`Comments`);
        // .child(this.state.childKey);

        if (!this.state.editComment) {
            debugger
            ref
                .push({
                    from: email,
                    text: this.state.text,
                    type: "text",
                    createdAt: Date.now(),
                    taskId: this.state.childKey
                })
                .catch(error => {
                    alert("Something went wrong");
                });

            // alert("Successfully post comment");
            this.setState({
                text: ""
            });
        }

        else {
            let key = this.state.editKey;
            let text = this.state.text;
            let self = this
            firebase
                .database()
                .ref("Comments/" + key).update({
                    text: text
                })
                .then(res => {
                    self.state.comments.map((comment, index) => {
                        if (comment.key == key) {
                            let editedComment = this.state.comments
                            editedComment[index].comment.text = text
                            this.setState({ comments: editedComment })
                        }

                    })
                    this.setState({
                        text: ""
                    });
                })
                .catch(err => {
                    alert('Something went wrong')
                })
        }

    };
    componentDidMount() {
        this.getProjects()
        this.getTasks()
        this.getDevelopers()
    }

    // componentDidUpdate() {
    //     this.getTasks();
    // }
    updateComment = (comment) => {
        this.setState({ text: comment.comment.text, editComment: true, editKey: comment.key })
    }
    progress = progress => {
        const { completed } = this.state;
        this.setState({ completed: completed >= 100 ? 0 : completed + progress });
    };
    deleteComment = (comment, index) => {
        debugger;
        let key = comment.key;
        let self = this;
        firebase
            .database()
            .ref("Comments")
            .child(key)
            .remove()
            .then(() => {
                self.state.comments.map((comment, index) => {
                    if (comment.key == key) {
                        let comments = self.state.comments;
                        comments.splice(index, 1);
                        self.setState({ comments: comments });
                        debugger;
                    }
                });
                // self.setState({ comments: [] })
                debugger
                let comments = [];
                var ref = firebase.database().ref("Comments");
                ref
                    .orderByChild("taskId")
                    .equalTo(key)
                    .on("child_added", function (snapshot) {
                        console.log("ABID SHAKA", snapshot.val());
                        let CommentObj = {
                            comment: snapshot.val(),
                            key: snapshot.key
                        }
                        comments.push(CommentObj);
                        self.setState({ comments: comments });
                        console.log("JAWAD", self.state.comments);
                    });
                self.setState({ childKey: key })
            });
    }
    handleFileChange = (event) => {
        this.setState({ loading: true });
        const { target } = event;
        const { files } = target;
        let self = this;

        if (files && files[0]) {
            var reader = new FileReader();
            reader.onload = event => {
                console.log("mime type", files[0].type);
                let mimeType = files[0].type;

                var metadata = {
                    contentType: mimeType
                };

                var storageRef = firebase.storage().ref();

                let folder = mimeType.split("/")[0] == "image" ? "image/" : "docs/";

                var uploadTask = storageRef
                    .child(`${folder}` + files[0].name)
                    .put(files[0], metadata);

                uploadTask.on(
                    "state_changed",
                    function (snapshot) {
                        var progress =
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        debugger
                        self.progress(progress);
                        console.log("Upload is " + progress + "% done");
                    },
                    function (error) { },
                    function () {
                        uploadTask.snapshot.ref
                            .getDownloadURL()
                            .then(function (downloadURL) {
                                let currentUser = JSON.parse(localStorage.getItem('currentUser'));
                                const email = firebase.auth().currentUser.email;
                                let taskId = self.state.childKey;

                                const ref = firebase.database().ref(`Comments`);
                                ref
                                    .push({
                                        from: email,
                                        type: mimeType,
                                        url: downloadURL,
                                        createdAt: new Date(),
                                        taskId: taskId
                                    })
                                    .then(res => {
                                        self.setState({ loading: false });
                                        console.log("Comment Added !!");
                                    })
                                    .catch(err => {
                                        console.log("ERROR !!!");
                                    });
                                console.log("File available at", downloadURL);
                            });
                    }
                );
            };
        }
        reader.readAsDataURL(files[0]);
    }

    getTasks() {
        firebase
            .database()
            .ref("Tasks")
            .on("value", data => {
                if (data.val()) {
                    let tasks = this.snapshotToArray(data.val())
                    this.showTasks(tasks)
                }
                else {
                    this.setState({ loading: false })
                }
            })
    }

    getProjects() {
        firebase
            .database()
            .ref("Projects")
            .on("value", data => {
                if (data.val()) {
                    let projects = this.snapshotToArray(data.val())
                    this.setState({ projects })
                }
            })

    }

    showTasks(tasks) {
        const { projects } = this.state
        let email = firebase.auth().currentUser.email;
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const role = localStorage.getItem("role") && localStorage.getItem("role").replace(/['"]+/g, "");

        let filterTasks = []

        tasks.map(task => {
            // ROLES FOR ADMIN
            if (role == 'Admin') {
                filterTasks.push(task)
                this.setState({ rows: tasks, loading: false })
            }

            // ROLES FOR DEVELOPER
            else if (role == 'Developer') {
                if (task.assigned == email) {
                    filterTasks.push(task)
                    this.setState({ rows: filterTasks, loading: false })
                }
                // else {
                //     this.setState({ rows: [], loading: false })
                // }
            }

            // ROLES FOR CONSULTANT
            else if (role == 'Consultant' || role == 'Product Owner') {
                let isOnwerOrConsultant = ''
                const project = projects.find(x => x.ProjectCode == task.ProjectCode)
                isOnwerOrConsultant = project && project.assignedMembers.find(x => x.email == currentUser.email)
                if (isOnwerOrConsultant || currentUser.email == task.createdBy) {
                    filterTasks.push(task)
                    this.setState({ rows: filterTasks, loading: false })
                }
                else {
                    this.setState({ rows: [], loading: false })
                }
            }
        })

    }

    getDevelopers() {
        firebase
            .database()
            .ref("Developer")
            .on("value", data => {
                if (data.val()) {
                    let names = []
                    let developers = this.snapshotToArray(data.val())
                    developers.map(dev => names.push(dev.name))
                    availableValues.devName = names
                    // availableValues.assigned = developers
                    this.setState({ developers: developers })
                }
            });
    }

    onClose = () => { this.setState({ open: false }) }
    onCommentsClose = () => { this.setState({ draweropen: false }) }

    snapshotToArray = snapshot => Object.entries(snapshot).map(e => Object.assign(e[1], { id: e[0] }));

    render() {
        console.log('errrrrrrrrrrrrrrrrrrrrrr', this.state.rows)
        role = localStorage.getItem("role") && localStorage.getItem("role").replace(/['"]+/g, "");

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
            loading,
            selection,
            open,
            draweropen
        } = this.state;

        const cellComponent = ({ children, ...restProps }) => {
            const currentRow = { ...restProps.row };
            const { selection } = this.state;
            const rowId = restProps.tableRow.rowId;
            const selected = selection.indexOf(rowId) === -1;
            return (
                <TableEditColumn.Cell
                    {...restProps}
                // style={{
                //     ...(selected ? { pointerEvents: "none", opacity: 0.5 } : null)
                // }}
                >
                    {/* {children} */}
                    {
                        children.map(x => {
                            if (x.props) {
                                const CommandButton = commandComponents[x.props.id];
                                return (
                                    <CommandButton
                                        onExecute={x.props.onExecute}
                                        row={restProps.row}
                                    />
                                );
                            }
                        })
                    }
                    <IconButton
                        onClick={() => this.onCommentsChange(restProps.row.id)}
                        title="Edit row">
                        <Comment />
                    </IconButton>
                </TableEditColumn.Cell>
            );
        };

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

                    {/* <SelectionState
                        selection={selection}
                        onSelectionChange={this.changeSelection} /> */}

                    <PagingState
                        currentPage={currentPage}
                        onCurrentPageChange={this.changeCurrentPage}
                        pageSize={pageSize}
                        onPageSizeChange={this.changePageSize}
                    />

                    <IntegratedFiltering />

                    <EditingState
                        editingRowIds={editingRowIds}
                        onEditingRowIdsChange={this.changeEditingRowIds}
                        rowChanges={rowChanges}
                        onRowChangesChange={this.changeRowChanges}
                        addedRows={addedRows}
                        onAddedRowsChange={this.changeAddedRows}
                        onCommentsChange={this.onCommentsChange}
                        onCommitChanges={this.commitChanges}
                    />
                    <SummaryState
                        totalItems={totalSummaryItems}
                    />

                    <IntegratedSorting />
                    <IntegratedPaging />
                    {/* <IntegratedSelection /> */}
                    <IntegratedSummary />

                    {/* <CurrencyTypeProvider for={currencyColumns} />
          <PercentTypeProvider for={percentColumns} /> */}

                    <DragDropProvider />

                    <Table
                        columnExtensions={tableColumnExtensions}
                        cellComponent={Cell}
                    />
                    {/* <TableSelection showSelectAll={false} /> */}
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
                        showAddCommand={role !== "Developer" ? true : false}
                        showEditCommand
                        showDeleteCommand
                        // commandComponent={Command}
                        cellComponent={cellComponent}
                    />
                    <TableSummaryRow />
                    <TableFixedColumns
                        leftColumns={leftFixedColumns}
                    />
                    {/* <PagingPanel
                        pageSizes={pageSizes}
                    /> */}
                </Grid>
                {loading && <CircularProgress style={{ position: 'absolute', bottom: 360, left: 590, zIndex: 1000 }} />}
                <AddTask
                    open={open}
                    handleClose={this.onClose} />
                <Comments
                    loading={this.state.loading}
                    handleFileChange={this.handleFileChange}
                    // completed={this.props.completed}
                    comments={this.state.comments}
                    updateComment={this.updateComment}
                    handleMessaging={this.handleMessaging}
                    handleInputChange={this.handleInputChange}
                    deleteComment={this.deleteComment}
                    editComment={this.state.editComment}
                    text={this.state.text}
                    draweropen={draweropen}
                    handleClose={this.onCommentsClose} />
            </Paper>
        );
    }
}

export default withStyles(styles, { name: 'ControlledModeDemo' })(DemoBase);