/* eslint-disable no-debugger */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React from "react";
import classNames from "classnames";
import cx from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import CloseIcon from "@material-ui/icons/Close";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Icon from "@material-ui/core/Icon";
import FormControl from "@material-ui/core/FormControl";
import InputBase from "@material-ui/core/InputBase";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Avatar from "@material-ui/core/Avatar";
import profile from "../../assets/img/faces/avatar.jpg";
import firebase from "../../constant/api/firebase";
import Datetime from "react-datetime";
import tableStyle from "assets/jss/material-dashboard-pro-react/components/tableStyle";
import TextField from "@material-ui/core/TextField";
import Edit from "@material-ui/icons/Edit";
import Check from "@material-ui/icons/Check";
import Close from "@material-ui/icons/Close";
import { Link } from "react-router-dom";
import Input from "@material-ui/core/Input";
const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500]
  }
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit
  }
}))(MuiDialogActions);

let counter = 0;
function createData(name, calories, fat, carbs, protein) {
  counter += 1;
  return { id: counter, name, calories, fat, carbs, protein };
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
function getStyles(name, that) {
  return {
    fontWeight: "normal"
  };
}
function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: "name", numeric: false, disablePadding: true, label: "Project" },
  { id: "calories", numeric: true, disablePadding: false, label: "Category" },
  { id: "fat", numeric: true, disablePadding: false, label: "Total Summary" },
  { id: "carbs", numeric: true, disablePadding: false, label: "Status" },
  {
    id: "protein",
    numeric: true,
    disablePadding: false,
    label: "Last Updated"
  },
  { id: "protein", numeric: true, disablePadding: false, label: "Assigned" },
  { id: "fat", numeric: true, disablePadding: false, label: "Priority" }
  // { id: "fat", numeric: true, disablePadding: false, label: "Deadline" },
  // { id: "carbs", numeric: true, disablePadding: false, label: "Customer" },
  // { id: "protein", numeric: true, disablePadding: false, label: "Protein (g)" },
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                align={row.numeric ? "right" : "left"}
                padding={row.disablePadding ? "none" : "default"}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? "bottom-end" : "bottom-start"}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this
          )}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: "0 0 auto"
  }
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes, projecthandleClickOpen } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Button
            variant="contained"
            onClick={projecthandleClickOpen}
            color="primary"
            id="tableTitle"
            className={classes.button}
          >
            add
          </Button>
          // <Typography variant="h6" id="tableTitle">
          //   Nutrition
          // </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  handleClickOpen: PropTypes.func.isRequired
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: "auto"
  },
  bootstrapInput: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.common.white,
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "500px",
    height: "50px",
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      "'Segoe UI'",
      "Roboto",
      "'Helvetica Neue'",
      "Arial",
      "sans-serif",
      "'Apple Color Emoji'",
      "'Segoe UI Emoji'",
      "'Segoe UI Symbol'"
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  },
  bootstrapFormLabel: {
    fontSize: 18
  },
  avatar: {
    margin: 10,
    marginTop: 25
  }
});

let CustomTable = ({ ...props }) => {
  const {
    classes,
    tableData,
    tableHeaderColor,
    hover,
    deleteUser,
    colorsColls,
    coloredColls,
    customCellClasses,
    customClassesForCells,
    striped,
    tableShopping,
    customHeadCellClasses,
    customHeadClassesForCells,
    handleClickOpen,
    openUpdateProject,
    editing,
    updateTask,
    EDevEfforts,
    handleEDevEffortsCodeChange,
    handleADevEffortsCodeChange,
    DevPaid,
    ADevEffort,
    handleDevPaidCodeChange
  } = props;
  const tableHead = [
    "#",
    "Estimated developer efforts ",
    "Actual developer efforts ",
    "Rate unit ",
    "Developer Effort amount calculated ",
    "Developer Paid on ",
    "Efforts estimated to customer ",
    "Efforts adjusted to customer Adjusted ",
    "Rate unit ",
    "To invoice amount calculated ",
    "Paid by Customer on "
  ];
  console.log(tableData);
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor]}>
            <TableRow className={classes.tableRow}>
              {tableHead.map((prop, key) => {
                const tableCellClasses =
                  classes.tableHeadCell +
                  " " +
                  classes.tableCell +
                  " " +
                  cx({
                    [customHeadCellClasses[
                      customHeadClassesForCells.indexOf(key)
                    ]]: customHeadClassesForCells.indexOf(key) !== -1,
                    [classes.tableShoppingHead]: tableShopping,
                    [classes.tableHeadFontSize]: !tableShopping
                  });
                return (
                  <TableCell className={classes.tableCell} key={key}>
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody
        //  onClick={handleClickOpen}
        >
          {tableData &&
            tableData.map((prop, key) => {
              // debugger
              var rowColor = "";
              var rowColored = false;
              if (prop.color !== undefined) {
                rowColor = prop.color;
                rowColored = true;
                prop = prop.all_projects;
              }
              console.log("Keyy", key);
              const tableRowClasses = cx({
                [classes.tableRowHover]: hover,
                [classes[rowColor + "Row"]]: rowColored,
                [classes.tableStripedRow]: striped && key % 2 === 0
              });

              // console.log('props_data', prop.key)
              return (
                <TableRow
                  key={prop.key}
                  hover={hover}
                  className={tableRowClasses}
                >
                  <TableCell
                    className={classes.tableCell}
                    colSpan={prop.colspan}
                  >
                    {key}
                  </TableCell>
                  <TableCell
                    className={classes.tableCell}
                    colSpan={prop.colspan}
                  >
                    {editing == prop.all_projects.newProjectName ? (
                      <CustomInput
                        id="required"
                        md={12}
                        lg={12}
                        labelText="Dev Efforts"
                        formControlProps={{
                          fullWidth: true
                        }}
                        onChange={handleEDevEffortsCodeChange}
                        value={EDevEfforts}
                        inputProps={{
                          type: "text"
                        }}
                      />
                    ) : (
                      prop.all_projects.ProjectCode
                    )}
                  </TableCell>
                  <TableCell
                    className={classes.tableCell}
                    colSpan={prop.colspan}
                  >
                    {editing == prop.all_projects.newProjectName ? (
                      <CustomInput
                        id="required"
                        md={12}
                        lg={12}
                        labelText="Dev Efforts"
                        formControlProps={{
                          fullWidth: true
                        }}
                        onChange={handleADevEffortsCodeChange}
                        value={ADevEffort}
                        inputProps={{
                          type: "text"
                        }}
                      />
                    ) : (
                      prop.all_projects.newProjectName
                    )}
                  </TableCell>
                  <TableCell
                    className={classes.tableCell}
                    colSpan={prop.colspan}
                  >
                    {/* {editing == prop.all_projects.newProjectName ? (
                      <CustomInput
                        id="required"
                        md={12}
                        lg={12}
                        labelText="Rate unit"
                        formControlProps={{
                          fullWidth: true
                        }}
                        onChange={hand}
                        value={ProjectCode}
                        inputProps={{
                          type: "text"
                        }}
                      />
                    ) : (
                      )} */}
                    {prop.all_projects.customer}
                  </TableCell>
                  <TableCell
                    className={classes.tableCell}
                    colSpan={prop.colspan}
                  />
                  <TableCell
                    className={classes.tableCell}
                    colSpan={prop.colspan}
                  >
                    {editing == prop.all_projects.newProjectName ? (
                      <CustomInput
                        id="required"
                        md={12}
                        lg={12}
                        labelText="Dev Paid "
                        formControlProps={{
                          fullWidth: true
                        }}
                        onChange={handleDevPaidCodeChange}
                        value={DevPaid}
                        inputProps={{
                          type: "text"
                        }}
                      />
                    ) : (
                      prop.all_projects.Rate
                    )}
                  </TableCell>
                  <TableCell
                    className={classes.tableCell}
                    colSpan={prop.colspan}
                  >
                    {/* {editing == prop.all_projects.newProjectName ? (
                      <CustomInput
                        id="required"
                        md={12}
                        lg={12}
                        labelText="Dev Paid "
                        formControlProps={{
                          fullWidth: true
                        }}
                        onChange={handleDevPaidCodeChange}
                        value={DevPaid}
                        inputProps={{
                          type: "text"
                        }}
                      />
                    ) : (
                    )} */}
                    {prop.all_projects.rate_unit}
                  </TableCell>
                  <TableCell
                    className={classes.tableCell}
                    colSpan={prop.colspan}
                  >
                    {prop.all_projects.projectEstimationEndDate}
                  </TableCell>
                  <TableCell
                    className={classes.tableCell}
                    colSpan={prop.colspan}
                  >
                    {/* {editing == prop.all_projects.newProjectName ? (
                      <CustomInput
                        id="required"
                        md={12}
                        lg={12}
                        labelText="Rate unit"
                        formControlProps={{
                          fullWidth: true
                        }}
                        // onChange={this.handleProjectCodeChange}
                        // value={ProjectCode}
                        inputProps={{
                          type: "text"
                        }}
                      />
                    ) : (
                    )} */}
                    {prop.all_projects.projectStartDate}
                  </TableCell>
                  <TableCell
                    className={classes.tableCell}
                    colSpan={prop.colspan}
                  >
                    {/* {editing == prop.all_projects.newProjectName ? (
                      <CustomInput
                        id="required"
                        md={12}
                        lg={12}
                        labelText="invoice "
                        formControlProps={{
                          fullWidth: true
                        }}
                        // onChange={this.handleProjectCodeChange}
                        // value={ProjectCode}
                        inputProps={{
                          type: "text"
                        }}
                      />
                    ) : (
                    )} */}
                    {prop.all_projects.projectActualEndDate}
                  </TableCell>
                  <TableCell
                    className={classes.tableCell}
                    colSpan={prop.colspan}
                  >
                    {editing == prop.all_projects.newProjectName ? (
                      <EditButton
                        updateTask={updateTask}
                        edit={true}
                        _param={prop}
                        v={prop.key}
                        asd={key}
                      />
                    ) : (
                      <EditButton
                        openUpdateProject={openUpdateProject}
                        _param={prop}
                        v={prop.key}
                        asd={key}
                      />
                    )}
                    <DeleteButton
                      deleteUser={deleteUser}
                      asd={prop.key}
                      v={key}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};

class EditButton extends React.Component {
  render() {
    const { edit, _param, _route, asd, v } = this.props;
    console.log("parm", _param);
    return (
      <div>
        {edit ? (
          <Button
            edit={true}
            color="success"
            onClick={() => this.props.updateTask(_param, v)}
            simple
          >
            <Check color="success" />
          </Button>
        ) : (
          <Button
            onClick={() => this.props.openUpdateProject(_param)}
            edit={true}
            color="success"
            simple
          >
            <Edit color="success" />
          </Button>
        )}
      </div>
    );
  }
}

class DeleteButton extends React.Component {
  render() {
    // debugger;
    const { asd, v } = this.props;
    console.log("key", asd);
    return (
      <Button
        color="danger"
        simple
        onClick={() => this.props.deleteUser(asd, v)}
      >
        <Close color="danger" />
      </Button>
    );
  }
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray",
  hover: false,
  colorsColls: [],
  coloredColls: [],
  striped: false,
  customCellClasses: [],
  customClassesForCells: [],
  customHeadCellClasses: [],
  customHeadClassesForCells: []
};

CustomTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  // Of(PropTypes.arrayOf(PropTypes.node)) || Of(PropTypes.object),
  tableData: PropTypes.arrayOf(PropTypes.string),
  hover: PropTypes.bool,
  coloredColls: PropTypes.arrayOf(PropTypes.number),
  // Of(["warning","primary","danger","success","info","rose","gray"]) - colorsColls
  colorsColls: PropTypes.array,
  customCellClasses: PropTypes.arrayOf(PropTypes.string),
  customClassesForCells: PropTypes.arrayOf(PropTypes.number),
  customHeadCellClasses: PropTypes.arrayOf(PropTypes.string),
  customHeadClassesForCells: PropTypes.arrayOf(PropTypes.number),
  striped: PropTypes.bool,
  // this will cause some changes in font
  tableShopping: PropTypes.bool
};

CustomTable = withStyles(tableStyle)(CustomTable);
class TaskTable extends React.Component {
  state = {
    order: "asc",
    orderBy: "calories",
    newProjectName: "",
    Consultants: "",
    ProductOwner: "",
    open: false,
    projectopen: false,
    ProjectCode: "",
    Rate: "",
    rate_unit: "",
    customer: "company 1",
    currency: "",
    projectStartDate: "",
    projectEstimationEndDate: "",
    projectActualEndDate: "",
    selected: [],
    projects: [],
    allcustomers: [],
    posts: "",
    _param: "",
    assignee: [],
    assigneename: [],
    selectedassignee: [],
    editing: "",
    EDevEfforts: "",
    ADevEffort: "",
    DevPaid: ""
  };
  componentDidMount() {
    this.showProjects();
    this.all_customer();
  }
  showProjects() {
    firebase
      .database()
      .ref("Tasks")
      .on("child_added", project => {
        let currentpost = this.state.projects;

        let obj = {
          all_projects: project.val(),
          key: project.key
        };
        currentpost.push(obj);
        this.setState({
          projects: currentpost,
          posts: ""
        });
      });
  }
  handleProjectNameChange = e => {
    this.setState({ newProjectName: e.target.value });
  };
  handleProjectCodeChange = e => {
    this.setState({ ProjectCode: e.target.value });
  };
  handleRateChange = e => {
    this.setState({ Rate: e.target.value });
  };
  handleRateUnitChange = e => {
    this.setState({ rate_unit: e.target.value });
  };
  handleEDevEffortsCodeChange = e => {
    this.setState({ EDevEfforts: e.target.value });
    debugger;
  };
  handleDevPaidCodeChange = e => {
    this.setState({ DevPaid: e.target.value });
    debugger;
  };
  handleADevEffortsCodeChange = e => {
    this.setState({ ADevEffort: e.target.value });
    debugger;
  };
  handleCustomerChange = e => {
    this.state.allcustomers &&
      this.state.allcustomers.map(user => {
        debugger;
        if (e.target.value == user.all_customers.customer) {
          this.setState({
            assignee: user.all_customers.users
          });
        }
      });
    this.setState({
      customer: e.target.value
    });
  };
  handleassigneeChange = e => {
    this.setState({ assigneename: e.target.value });
  };
  handleCurrencyChange = e => {
    this.setState({ currency: e.target.value });
  };
  handleDateChange = e => {
    this.setState({ projectStartDate: e.target.value });
  };
  handleprojectEstimationEndDateChange = e => {
    this.setState({ projectEstimationEndDate: e.target.value });
  };
  handleprojectActualEndDateChange = e => {
    this.setState({ projectActualEndDate: e.target.value });
  };
  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };
  handleChangeConsultants = e => {
    this.setState({ Consultants: e.target.value });
  };
  handleChangeProductOwner = e => {
    this.setState({ ProductOwner: e.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };
  projecthandleClickOpen = () => {
    this.setState({
      projectopen: true
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  projecthandleClose = () => {
    this.setState({ projectopen: false });
  };
  all_customer() {
    firebase
      .database()
      .ref("Customer")
      .on("child_added", customer => {
        let currentpost = this.state.allcustomers;

        let obj = {
          all_customers: customer.val(),
          key: customer.key
        };
        currentpost.push(obj);
        this.setState({
          allcustomers: currentpost,
          posts: ""
        });
      });
  }
  deleteCustomer = (key, index) => {
    console.log("key", key, index);
    let fetchpost = this.state.projects;
    firebase
      .database()
      .ref("Tasks")
      .child(key)
      .remove()
      .then(() => {
        fetchpost.splice(index, 1);
        this.setState({
          projects: fetchpost
        });
      });
  };

  openUpdateProject = _param => {
    debugger;
    this.setState({ editing: _param.all_projects.newProjectName });
    // this.projecthandleClickOpen();
    // if (_param !== "") {
    //   this.setState({
    //     newProjectName: _param.newProjectName,
    //     ProjectCode: _param.ProjectCode,
    //     Rate: _param.Rate,
    //     rate_unit: _param.rate_unit,
    //     customer: _param.customer,
    //     currency: _param.currency,
    //     projectStartDate: _param.projectStartDate,
    //     projectEstimationEndDate: _param.projectEstimationEndDate,
    //     projectActualEndDate: _param.projectActualEndDate,
    //     _param: _param
    //   });
    // }
  };
  updateTask = (e, key) => {
    debugger;
    // e.preventDefault();
    const { EDevEfforts, ADevEffort, DevPaid } = this.state;

    firebase
      .database()
      .ref("Tasks/" + key)
      .update({
        newProjectName: EDevEfforts,
        ProjectCode: ADevEffort,
        Rate: DevPaid
      })
      .then(() => {
        alert("project updated successfully");
        this.setState({
          DevPaid: "",
          ADevEffort: "",
          EDevEfforts: "",
          editing: "",
          projects: []
        });
        this.showProjects();
      })
      .catch(error => {
        alert(error);
      });
  };

  addNewTask = e => {
    e.preventDefault();
    const {
      newProjectName,
      ProjectCode,
      Rate,
      rate_unit,
      customer,
      currency,
      projectStartDate,
      projectEstimationEndDate,
      projectActualEndDate,
      assigneename
    } = this.state;
    var userId = firebase.auth().currentUser.uid;
    const ref = firebase.database().ref("Tasks/");
    debugger;
    ref
      .push({
        uid: userId,
        newProjectName: newProjectName,
        ProjectCode: ProjectCode,
        Rate: Rate,
        rate_unit: rate_unit,
        customer: customer,
        currency: currency,
        projectStartDate: projectStartDate,
        projectEstimationEndDate: projectEstimationEndDate,
        projectActualEndDate: projectActualEndDate,
        assignee: assigneename
      })
      .catch(error => {
        console.log("Error during user creating on firebase", error);
      });
    alert("Project Add Successfully");
    this.setState({
      newProjectName: "",
      Rate: "",
      ProjectCode: "",
      rate_unit: "",
      customer: "",
      currency: "",
      projectStartDate: "",
      projectEstimationEndDate: "",
      projectActualEndDate: "",
      projectopen: false,
      _param: "",
      assigneename: []
    });
  };
  handleChangeMultiple = event => {
    this.setState({
      assigneename: event.target.value
    });
  };

  render() {
    const {
      data,
      order,
      orderBy,
      selected,
      rowsPerPage,
      page,
      newProjectName,
      ProjectCode,
      Rate,
      rate_unit,
      currency,
      projects,
      allcustomers,
      _param
    } = this.state;
    debugger;
    // const assignees = allcustomers;
    const { classes } = this.props;
    console.log("asas", this.state.selectedassignee);

    const tableData = projects;
    return (
      <Paper className={classes.root}>
        <Button
          onClick={this.projecthandleClickOpen}
          variant="contained"
          color="primary"
          style={{ fontSize: 10, margin: 10 }}
        >
          Add
        </Button>
        <CustomTable
          handleClickOpen={this.handleClickOpen}
          handleEDevEffortsCodeChange={this.handleEDevEffortsCodeChange}
          handleADevEffortsCodeChange={this.handleADevEffortsCodeChange}
          handleDevPaidCodeChange={this.handleDevPaidCodeChange}
          ADevEffort={this.state.ADevEffort}
          DevPaid={this.state.DevPaid}
          EDevEfforts={this.state.EDevEfforts}
          tableData={tableData}
          editing={this.state.editing}
          deleteUser={this.deleteCustomer}
          updateTask={this.updateTask}
          openUpdateProject={this.openUpdateProject}
        />
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            <Icon style={{ paddingTop: 5 }}>comment</Icon>Comments
            <p style={{ fontSize: "x-small" }}>Hawaji Tourism</p>
          </DialogTitle>
          <DialogContent>
            <FormControl className={classes.margin}>
              <InputBase
                id="bootstrap-input"
                placeholder={
                  "Enter your comments here, and @mention people to grab their attention."
                }
                defaultValue=""
                classes={{
                  root: classes.bootstrapRoot,
                  input: classes.bootstrapInput
                }}
              />
              <div
                style={{
                  backgroundColor: "#eee",
                  color: "rgb(180, 182, 187)",
                  padding: 5,
                  width: 120,
                  textAlign: "center",
                  marginTop: 5,
                  marginLeft: "77%"
                }}
              >
                Post Comment
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row"
                }}
              >
                <Avatar
                  alt="Remy Sharp"
                  src={profile}
                  className={classes.avatar}
                />
                <Paper className={classes.root} elevation={1}>
                  <Typography
                    style={{
                      margin: 10
                    }}
                    variant="h6"
                    component="h4"
                  >
                    Nikhil Gaekward <span style={{ fontSize: 12 }}> Now</span>
                  </Typography>
                  <Typography style={{ margin: 10 }} component="p">
                    why is there a drop in visitors going to the island?
                    <p
                      style={{
                        color: "rgb(0, 0, 255)"
                      }}
                    >
                      @Alan Wright
                    </p>
                  </Typography>
                  <Button>
                    <Icon>reply</Icon>reply
                  </Button>
                </Paper>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row"
                }}
              >
                <Avatar
                  alt="Remy Sharp"
                  src={profile}
                  className={classes.avatar}
                />
                <Paper className={classes.root} elevation={1}>
                  <Typography
                    style={{ margin: 10 }}
                    variant="h6"
                    component="h4"
                  >
                    Nikhil Gaekward{" "}
                    <span style={{ fontSize: 12 }}> 0 min ago</span>
                  </Typography>
                  <Typography style={{ margin: 10 }} component="p">
                    why is there a drop in visitors going to the island?
                    <p style={{ color: "rgb(0, 0, 255)" }}>@Alan Wright</p>
                  </Typography>
                  <Button>
                    <Icon>reply</Icon>reply
                  </Button>
                </Paper>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row"
                }}
              >
                <Avatar
                  alt="Remy Sharp"
                  src={profile}
                  className={classes.avatar}
                />
                <Paper className={classes.root} elevation={1}>
                  <Typography
                    style={{ margin: 10 }}
                    variant="h6"
                    component="h4"
                  >
                    Nikhil Gaekward{" "}
                    <span style={{ fontSize: 12 }}> 2 days ago</span>
                  </Typography>
                  <Typography style={{ margin: 10 }} component="p">
                    why is there a drop in visitors going to the island?
                    <p style={{ color: "rgb(0, 0, 255)" }}>@Alan Wright</p>
                  </Typography>
                  <Button>
                    <Icon>reply</Icon>reply
                  </Button>
                </Paper>
              </div>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          onClose={this.projecthandleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.projectopen}
        >
          {/* add a project model */}
          <DialogTitle
            id="customized-dialog-title"
            onClose={this.projecthandleClose}
          >
            Add Task
          </DialogTitle>
          <DialogContent>
            <FormControl
              className={[classes.formControl, "form-control"]}
              md={12}
              lg={12}
            >
              {/* {
              this.state.editing == prop.
            } */}
              <CustomInput
                id="required"
                md={12}
                lg={12}
                labelText="Estimated developer efforts"
                formControlProps={{
                  fullWidth: true
                }}
                onChange={this.handleProjectCodeChange}
                value={ProjectCode}
                inputProps={{
                  type: "number"
                }}
              />
              <CustomInput
                id="required"
                labelText="Actual developer efforts"
                formControlProps={{
                  fullWidth: true
                }}
                onChange={this.handleProjectNameChange}
                value={newProjectName}
                inputProps={{
                  type: "number"
                }}
              />
              <FormControl
                style={{ marginTop: 10 }}
                className={[classes.formControl, "form-control"]}
                variant="outlined"
              >
                <InputLabel
                  style={{ fontSize: 10 }}
                  ref={ref => {
                    this.InputLabelRef = ref;
                  }}
                  htmlFor="outlined-age-simple"
                >
                  Rate Unit
                </InputLabel>
                <Select
                  value={this.state.rate_unit}
                  onChange={this.handleRateUnitChange}
                  // displayEmpty
                  input={
                    <OutlinedInput
                      // style={{ fontSize: 10 }}
                      labelWidth={40}
                      name="Country"
                      id="outlined-age-simple"
                    />
                  }
                >
                  <MenuItem value={"Hourly"}>Hourly</MenuItem>
                  <MenuItem value={"Daily"}>Daily</MenuItem>
                  <MenuItem value={"Weekly"}>Weekly</MenuItem>
                  <MenuItem value={"Monthly"}>Monthly</MenuItem>
                </Select>
              </FormControl>
              <CustomInput
                id="required"
                labelText="Developer Effort amount calculated"
                formControlProps={{
                  fullWidth: true
                }}
                onChange={this.handleRateChange}
                value={Rate}
                inputProps={{
                  type: "number"
                }}
              />
            </FormControl>
            {/* <FormControl
              style={{ marginTop: 10 }}
              className={[classes.formControl, "form-control"]}
              variant="outlined"
            >
              <InputLabel
                style={{ fontSize: 10 }}
                ref={ref => {
                  this.InputLabelRef = ref;
                }}
                htmlFor="outlined-age-simple"
              >
                Developer Effort amount calculated
              </InputLabel>
              <Select
                value={this.state.rate_unit}
                onChange={this.handleRateUnitChange}
                // displayEmpty
                input={
                  <OutlinedInput
                    // style={{ fontSize: 10 }}
                    labelWidth={40}
                    name="Country"
                    id="outlined-age-simple"
                  />
                }
              >
                <MenuItem value={"Hourly"}>Hourly</MenuItem>
                <MenuItem value={"Daily"}>Daily</MenuItem>
                <MenuItem value={"Weekly"}>Weekly</MenuItem>
                <MenuItem value={"Monthly"}>Monthly</MenuItem>
              </Select>
            </FormControl> */}
            <FormControl fullWidth style={{ marginTop: 10 }}>
              <TextField
                id="date"
                label="Developer Paid on"
                type="date"
                defaultValue="2017-05-24"
                value={this.state.projectStartDate}
                onChange={this.handleDateChange}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </FormControl>
            <FormControl
              style={{ marginTop: 10 }}
              className={[classes.formControl, "form-control"]}
              variant="outlined"
            >
              <CustomInput
                id="required"
                labelText="Efforts estimated to customer"
                formControlProps={{
                  fullWidth: true
                }}
                onChange={this.handleRateChange}
                value={Rate}
                inputProps={{
                  type: "number"
                }}
              />
            </FormControl>

            <FormControl
              style={{ marginTop: 10 }}
              className={[classes.formControl, "form-control"]}
              variant="outlined"
            >
              <CustomInput
                id="required"
                labelText="Efforts adjusted to customer Adjusted"
                formControlProps={{
                  fullWidth: true
                }}
                onChange={this.handleRateChange}
                value={Rate}
                inputProps={{
                  type: "number"
                }}
              />
            </FormControl>

            <FormControl
              style={{ marginTop: 10 }}
              className={[classes.formControl, "form-control"]}
              variant="outlined"
            >
              <InputLabel
                style={{ fontSize: 10 }}
                ref={ref => {
                  this.InputLabelRef = ref;
                }}
                htmlFor="outlined-age-simple"
              >
                Rate Unit
              </InputLabel>
              <Select
                value={this.state.rate_unit}
                onChange={this.handleRateUnitChange}
                // displayEmpty
                input={
                  <OutlinedInput
                    // style={{ fontSize: 10 }}
                    labelWidth={40}
                    name="Country"
                    id="outlined-age-simple"
                  />
                }
              >
                <MenuItem value={"Hourly"}>Hourly</MenuItem>
                <MenuItem value={"Daily"}>Daily</MenuItem>
                <MenuItem value={"Weekly"}>Weekly</MenuItem>
                <MenuItem value={"Monthly"}>Monthly</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth style={{ marginTop: 10 }}>
              <CustomInput
                id="required"
                labelText="To invoice amount calculate"
                formControlProps={{
                  fullWidth: true
                }}
                onChange={this.handleRateChange}
                value={Rate}
                inputProps={{
                  type: "number"
                }}
              />
            </FormControl>
            <FormControl fullWidth style={{ marginTop: 10 }}>
              <TextField
                id="date"
                label="Paid by Customer on"
                type="date"
                defaultValue="2017-05-24"
                value={this.state.projectActualEndDate}
                onChange={this.handleprojectActualEndDateChange}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={_param === "" ? this.addNewTask : this.updateTask}
              color="primary"
            >
              {_param === "" ? "Add Task" : "Update Task"}
            </Button>
            <Button onClick={this.projecthandleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    );
  }
}

TaskTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TaskTable);
