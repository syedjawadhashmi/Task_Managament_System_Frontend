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
import profile from "../../assets/img/default-avatar.png";
import PDFIcon from "../../assets/img/pdficon.png";
import firebase from "../../constant/api/firebase";
import Datetime from "react-datetime";
import tableStyle from "assets/jss/material-dashboard-pro-react/components/tableStyle";
import TextField from "@material-ui/core/TextField";
import Edit from "@material-ui/icons/Edit";
import Check from "@material-ui/icons/Check";
import Close from "@material-ui/icons/Close";
import { Link } from "react-router-dom";
import Input from "@material-ui/core/Input";
import * as jsPDF from "jspdf";
import "jspdf-autotable";
import AttachFile from '@material-ui/icons/AttachFile';
import MessageIcon from '@material-ui/icons/MessageRounded';
import CircularProgress from '@material-ui/core/CircularProgress';

import InputAdornment from '@material-ui/core/InputAdornment';
import EditIcon from '@material-ui/icons/Edit';

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
    handleDevPaidCodeChange,
    onSelectBox
  } = props;
  const roles = localStorage.getItem("role");
  const role = roles.slice(1, roles.length - 1);
  if (role == "Admin") {
    var tableHead = [
      "#",
      "Project Code",
      "Dev / Support",
      "Ticket Summary",
      "Status",
      "Number",
      "Last Updated",
      "Assigned",
      "Priority",
      "Deadline",
      "Customer",
      "Estimated developer efforts",
      "Actual developer efforts",
      "Rate unit",
      "Developer Effort amount",
      "Developer Paid on",
      "Efforts estimated to customer",
      "Efforts adjusted to customer",
      "Rate unit",
      "To invoice amount",
      "Paid by Customer on",
      "Action"
    ];
  } else if (role == "Developer") {
    var tableHead = [
      "#",
      "Project Code",
      "Dev / Support",
      "Ticket Summary",
      "Status",
      "Number",
      "Last Updated",
      "Assigned",
      "Priority",
      "Deadline",
      "Customer",
      "Estimated developer efforts",
      "Actual developer efforts",
      "Rate unit",
      "Developer Effort amount",
      "Developer Paid on",
      "Action"
    ];
  } else {
    var tableHead = [
      ' ',
      "#",
      "Project Code",
      "Dev / Support",
      "Ticket Summary",
      "Status",
      "Number",
      "Last Updated",
      "Assigned",
      "Priority",
      "Deadline",
      "Customer",
      "Efforts estimated to customer",
      "Efforts adjusted to customer",
      "Rate unit",
      "To invoice amount",
      "Paid by Customer on",
      "Action"
    ];
  }
  // if(AsyncStorage.getItem('user'))
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
              let that = this;
              // console.log('props_data', prop.key)
              return (
                <TableRow
                  key={prop.key}
                  hover={hover}
                  className={tableRowClasses}

                >
                  <TableCell>
                    {(prop.all_projects.status === 'Close') ?
                  <Checkbox
                  // indeterminate={false}
                  // disabled={true}
                  // checked={numSelected === rowCount}
                   onChange={(e) => onSelectBox(prop, e)}
                  />: 
                  <Checkbox
                  // indeterminate={false}
                  disabled={true}
                  />
                  }
                  </TableCell>
                  <TableCell
                    className={classes.tableCell}
                    colSpan={prop.colspan}
                    onClick={() => handleClickOpen(prop.key)}

                  >
                    {key}
                  </TableCell>
                  <TableCell
                    className={classes.tableCell}
                    colSpan={prop.colspan}
                    onClick={() => handleClickOpen(prop.key)}
                  >
                    {editing == prop.key ? (
                      <CustomInput
                        id="required"
                        md={12}
                        lg={12}
                        labelText="Project Code"
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
                    onClick={() => handleClickOpen(prop.key)}
                  >
                    {editing == prop.key ? (
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
                        prop.all_projects.category
                      )}
                  </TableCell>
                  <TableCell
                    className={classes.tableCell}
                    colSpan={prop.colspan}
                    onClick={() => handleClickOpen(prop.key)}
                  >
                    {prop.all_projects.ticketSummary}
                  </TableCell>
                  <TableCell
                    className={classes.tableCell}
                    colSpan={prop.colspan}
                    onClick={() => handleClickOpen(prop.key)}
                  >
                    {editing == prop.key ? (
                      <FormControl
                        style={{ marginTop: 10 }}
                        className={[classes.formControl, "form-control"]}
                        variant="outlined"
                      >
                        <Select
                          onChange={handleDevPaidCodeChange}
                          value={DevPaid}
                        // displayEmpty
                        >
                          <MenuItem value={"Open"}>Open</MenuItem>
                          <MenuItem value={"Close"}>Close</MenuItem>
                        </Select>
                      </FormControl>
                    ) : (
                        prop.all_projects.status
                      )}
                  </TableCell>
                  <TableCell
                    className={classes.tableCell}
                    colSpan={prop.colspan}
                    onClick={() => handleClickOpen(prop.key)}
                  >
                    {prop.all_projects.number}
                  </TableCell>
                  <TableCell
                    className={classes.tableCell}
                    colSpan={prop.colspan}
                    onClick={() => handleClickOpen(prop.key)}
                  >
                    {prop.all_projects.lastUpdated}
                  </TableCell>
                  <TableCell
                    className={classes.tableCell}
                    colSpan={prop.colspan}
                    onClick={() => handleClickOpen(prop.key)}
                  >
                    {prop.all_projects.assigned}
                  </TableCell>
                  <TableCell
                    className={classes.tableCell}
                    colSpan={prop.colspan}
                    onClick={() => handleClickOpen(prop.key)}
                  >
                    {prop.all_projects.priority}
                  </TableCell>
                  <TableCell
                    className={classes.tableCell}
                    colSpan={prop.colspan}
                    onClick={() => handleClickOpen(prop.key)}
                  >
                    {prop.all_projects.deadline}
                  </TableCell>
                  <TableCell
                    className={classes.tableCell}
                    colSpan={prop.colspan}
                    onClick={() => handleClickOpen(prop.key)}
                  >
                    {prop.all_projects.customer}
                  </TableCell>
                  {role == "Admin" || role == "Developer" ? (
                    <TableCell
                      className={classes.tableCell}
                      colSpan={prop.colspan}
                      onClick={() => handleClickOpen(prop.key)}
                    >
                      {prop.all_projects.est_dev_efforts}
                    </TableCell>
                  ) : null}
                  {role == "Admin" || role == "Developer" ? (
                    <TableCell
                      className={classes.tableCell}
                      colSpan={prop.colspan}
                      onClick={() => handleClickOpen(prop.key)}
                    >
                      {prop.all_projects.act_dev_efforts}
                    </TableCell>
                  ) : null}
                  {role == "Admin" || role == "Developer" ? (
                    <TableCell
                      className={classes.tableCell}
                      colSpan={prop.colspan}
                      onClick={() => handleClickOpen(prop.key)}
                    >
                      {prop.all_projects.rate_unit_dev}
                    </TableCell>
                  ) : null}
                  {role == "Admin" || role == "Developer" ? (
                    <TableCell
                      className={classes.tableCell}
                      colSpan={prop.colspan}
                      onClick={() => handleClickOpen(prop.key)}
                    >
                      {prop.all_projects.dev_efforts_amt}
                    </TableCell>
                  ) : null}
                  {role == "Admin" || role == "Developer" ? (
                    <TableCell
                      className={classes.tableCell}
                      colSpan={prop.colspan}
                      onClick={() => handleClickOpen(prop.key)}
                    >
                      {prop.all_projects.dev_paid_on}
                    </TableCell>
                  ) : null}
                  {role == "Admin" ||
                    role == "Product Owner" ||
                    role == "Consultant" ? (
                      <TableCell
                        className={classes.tableCell}
                        colSpan={prop.colspan}
                        onClick={() => handleClickOpen(prop.key)}
                      >
                        {prop.all_projects.est_cus_efforts}
                      </TableCell>
                    ) : null}
                  {role == "Admin" ||
                    role == "Product Owner" ||
                    role == "Consultant" ? (
                      <TableCell
                        className={classes.tableCell}
                        colSpan={prop.colspan}
                        onClick={() => handleClickOpen(prop.key)}
                      >
                        {prop.all_projects.act_cus_efforts}
                      </TableCell>
                    ) : null}
                  {role == "Admin" ||
                    role == "Product Owner" ||
                    role == "Consultant" ? (
                      <TableCell
                        className={classes.tableCell}
                        colSpan={prop.colspan}
                        onClick={() => handleClickOpen(prop.key)}
                      >
                        {prop.all_projects.rate_unit_cus}
                      </TableCell>
                    ) : null}
                  {role == "Admin" ||
                    role == "Product Owner" ||
                    role == "Consultant" ? (
                      <TableCell
                        className={classes.tableCell}
                        colSpan={prop.colspan}
                        onClick={() => handleClickOpen(prop.key)}
                      >
                        {prop.all_projects.cus_efforts_amt}
                      </TableCell>
                    ) : null}
                  {role == "Admin" ||
                    role == "Product Owner" ||
                    role == "Consultant" ? (
                      <TableCell
                        className={classes.tableCell}
                        colSpan={prop.colspan}
                        onClick={() => handleClickOpen(prop.key)}
                      >
                        {prop.all_projects.cus_paid_on}
                      </TableCell>
                    ) : null}
                  <TableCell
                    className={classes.tableCell}
                    colSpan={prop.colspan}
                    // onClick={() => handleClickOpen(prop.key)}
                  >
                    {role == "Admin" ||
                      prop.all_projects.createdBy ==
                      firebase.auth().currentUser.email ? (
                        editing == prop.key ? (
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
                          )
                      ) : null}
                      {
                        (role === "Consultant" &&
                        prop.all_projects.createdBy == firebase.auth().currentUser.email) ? (
                          editing == prop.key ? (
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
                            )
                        ) : null
                      }
                    {role == "Admin" || role == "Product Owner" ? (
                      <DeleteButton
                        deleteUser={deleteUser}
                        asd={prop.key}
                        v={key}
                      />
                    ) : null}
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
    category: "",
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
    DevPaid: "",
    ticketSummary: "",
    status: "",
    number: "",
    lastUpdated: "",
    assigned: "",
    priority: "",
    deadline: "",
    customer: "",
    text: "",
    comments: [],
    from: "",
    childKey: "",
    printInvoiceObj: {},
    est_dev_efforts: "",
    act_dev_efforts: "",
    rate_unit_dev: "",
    dev_efforts_amt: "",
    dev_paid_on: "",
    est_cus_efforts: "",
    act_cus_efforts: "",
    rate_unit_cus: "",
    cus_efforts_amt: "",
    cus_paid_on: "",
    loading: false,
    completed: 0,
    allDevs: [],
    allProjects: [],
    allCustomers: [],
    checkBoxChecked: false
  };
  componentDidMount() {
    this.showTasks();
    this.all_customer();
    this.getDevelopers();
    this.getProjects();
    this.getCustomers();
    // this.timer = setInterval(this.progress, 1000);
  }

  componentWillUnmount() {
    // clearInterval(this.timer);
  }

  getDevelopers() {
    firebase
      .database()
      .ref("Developer")
      .on("child_added", developer => {
        let devs = this.state.allDevs;
        devs.push(developer.val());
        this.setState({
          allDevs: devs
        });
      })
  }

  getProjects() { //getting Projects for Project Code in Add Task
    firebase
    .database()
    .ref("Projects")
    .on("child_added", project => {
      let projects = this.state.allProjects;
        projects.push(project.val());
        this.setState({
          allProjects: projects
        });
    });
  };

  getCustomers() { // getting customers from firebase for add task customer dropdowns
    firebase
    .database()
    .ref("Customer")
    .on("child_added", customer => {
      console.log('Customers ', customer.val());
      let customers = this.state.allCustomers;
      customers.push(customer.val());
        this.setState({
          allCustomers: customers
        });
    });
  };

  showTasks() {
    firebase
      .database()
      .ref("Tasks")
      .on("child_added", project => {
        let currentpost = this.state.projects;

        let obj = {
          all_projects: project.val(),
          key: project.key
        };

        let email = firebase.auth().currentUser.email;
        const role =
          localStorage.getItem("role") &&
          localStorage.getItem("role").replace(/['"]+/g, "");

        if (project.val().createdBy == email || role == "Admin" || (role == "Developer" && project.val().assigned == email)) {
          currentpost.push(obj);
          this.setState({
            projects: currentpost,
            posts: ""
          });
        }
      });
  }
  handleest_dev_effortsChange = e => {
    this.setState({ est_dev_efforts: e.target.value });
  };
  handleact_dev_effortsChange = e => {
    this.setState({ act_dev_efforts: e.target.value });
  };
  handlerate_unit_devChange = e => {
    this.setState({ rate_unit_dev: e.target.value });
  };
  handledev_efforts_amtChange = e => {
    this.setState({ dev_efforts_amt: e.target.value });
  };
  handledev_paid_onChange = e => {
    this.setState({ dev_paid_on: e.target.value });
  };
  handleest_cus_effortsChange = e => {
    this.setState({ est_cus_efforts: e.target.value });
  };
  handleact_cus_effortsChange = e => {
    this.setState({ act_cus_efforts: e.target.value });
  };
  handlerate_unit_cusChange = e => {
    this.setState({ rate_unit_cus: e.target.value });
  };
  handlecus_efforts_amtChange = e => {
    this.setState({ cus_efforts_amt: e.target.value });
  };
  handlecus_paid_onChange = e => {
    this.setState({ cus_paid_on: e.target.value });
  };
  handleticketSummaryChange = e => {
    this.setState({ ticketSummary: e.target.value });
  };
  handleProjectCodeChange = e => {
    this.setState({ ProjectCode: e.target.value });
  };
  handlestatusChange = e => {
    this.setState({ status: e.target.value });
  };
  handlecategoryChange = e => {
    this.setState({ category: e.target.value });
  };
  handleEDevEffortsCodeChange = e => {
    this.setState({ EDevEfforts: e.target.value });
  };
  handleDevPaidCodeChange = e => {
    this.setState({ DevPaid: e.target.value });
  };
  handleADevEffortsCodeChange = e => {
    this.setState({ ADevEffort: e.target.value });
  };
  handlecustomerChange = e => {
    this.setState({
      customer: e.target.value
    });
  };
  handleassignedChange = e => {
    this.setState({ assigned: e.target.value });
  };
  handlepriorityChange = e => {
    this.setState({ priority: e.target.value });
  };
  handledeadlineChange = e => {
    this.setState({ deadline: e.target.value });
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

  handlenumberChange = event => {
    this.setState({ number: event.target.value });
  };
  handlelastUpdatedChange = e => {
    this.setState({ lastUpdated: e.target.value });
  };
  handleChangeProductOwner = e => {
    this.setState({ ProductOwner: e.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  handleClickOpen = key => {
    this.setState({ comments: [] })
    let comments = []
    var ref = firebase.database().ref("Comments");
    let self = this
    ref.orderByChild('taskId').equalTo(key).on("child_added", function (snapshot) {
      console.log('ABID SHAKA', snapshot.val());
      comments.push(snapshot.val());
      self.setState({ comments: comments });
      console.log('JAWAD', self.state.comments)
    });

    this.setState({
      open: true,
      childKey: key
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
  handlePdf = (td) => {
    let col, row = [];
    col = [
      { title: 'Dascription', dataKey: 'customer' },
      { title: 'Project', dataKey: 'ProjectCode' },
      { title: 'Assigned', dataKey: 'assign' }
    ];
    row.push({
      customer: td.all_projects.customer,
      ProjectCode: td.all_projects.ProjectCode,
      assign: td.all_projects.assigned,
    });
    var doc = new jsPDF('p', 'pt');
    doc.setFontSize(22);
    doc.setTextColor(102, 178, 255);
    doc.text(20, 20, 'SysBrillance');
    doc.setFontSize(15);
    doc.setTextColor(0, 0, 0);
    doc.text(500, 20, 'Invoice');
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(500, 30, 'SysBrillance');
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(500, 40, 'United Arab Emirates');
    doc.line(600, 50, 10, 50);
    doc.setFontSize(10);
    doc.setTextColor(220, 220, 220);
    doc.text(20, 70, 'BILL TO');
    doc.setTextColor(0, 0, 0);
    doc.text(430, 70, 'InvoiceNumber: ' + td.all_projects.number);
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(20, 80, td.all_projects.customer);
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(20, 90, 'My address');
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(430, 90, 'Invoice Date: February 15, 2019');
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(20, 100, 'Dubai etc, etc');
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(430, 100, 'Payment Due: February 15, 2019');
    doc.setFontSize(20);
    doc.setTextColor(40);
    doc.autoTable(col, row, {
      startY: 110,
    });
    doc.save('invoice.pdf')
  }

  handleSelectCheckBox = (prop, e) => {
    this.setState({
      printInvoiceObj: prop,
      checkBoxChecked: e.target.checked
    });
    console.log(this.state.checkBoxChecked);
  }

  openUpdateProject = _param => {
    this.setState({ editing: _param.key });
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
    // e.preventDefault();
    const {
      EDevEfforts,
      ADevEffort,
      DevPaid,
      est_dev_efforts,
      act_dev_efforts,
      rate_unit_dev,
      dev_efforts_amt,
      dev_paid_on,
      est_cus_efforts,
      act_cus_efforts,
      rate_unit_cus,
      cus_efforts_amt,
      cus_paid_on
    } = this.state;

    firebase
      .database()
      .ref("Tasks/" + key)
      .update({
        ProjectCode: EDevEfforts,
        status: DevPaid
        // est_dev_efforts: est_dev_efforts,
        // act_dev_efforts: act_dev_efforts,
        // rate_unit_dev: rate_unit_dev,
        // dev_efforts_amt: dev_efforts_amt,
        // dev_paid_on: dev_paid_on,
        // est_cus_efforts: est_cus_efforts,
        // act_cus_efforts: act_cus_efforts,
        // rate_unit_cus: rate_unit_cus,
        // cus_efforts_amt: cus_efforts_amt,
        // cus_paid_on: cus_paid_on
      })
      .then(() => {
        alert("Task updated successfully");
        this.setState({
          DevPaid: "",
          ADevEffort: "",
          EDevEfforts: "",
          editing: "",
          projects: []
        });
        this.showTasks();
      })
      .catch(error => {
        alert(error);
      });
  };

  addNewTask = e => {
    e.preventDefault();
    const {
      ticketSummary,
      status,
      number,
      lastUpdated,
      assigned,
      priority,
      deadline,
      customer,
      ProjectCode,
      category,
      est_dev_efforts,
      act_dev_efforts,
      rate_unit_dev,
      dev_efforts_amt,
      dev_paid_on,
      est_cus_efforts,
      act_cus_efforts,
      rate_unit_cus,
      cus_efforts_amt,
      cus_paid_on
    } = this.state;
    const assignedDev = assigned.email
    var userId = firebase.auth().currentUser.uid;
    const email = firebase.auth().currentUser.email;
    const ref = firebase.database().ref("Tasks/");
    ref
      .push({
        uid: userId,
        ticketSummary: ticketSummary,
        ProjectCode: ProjectCode,
        status: status,
        category: category,
        customer: customer.email,
        priority: priority,
        number: number,
        assigned: assignedDev,
        deadline: deadline,
        lastUpdated: lastUpdated,
        est_dev_efforts: est_dev_efforts,
        act_dev_efforts: act_dev_efforts,
        rate_unit_dev: rate_unit_dev,
        dev_efforts_amt: dev_efforts_amt,
        dev_paid_on: dev_paid_on,
        est_cus_efforts: est_cus_efforts,
        act_cus_efforts: act_cus_efforts,
        rate_unit_cus: rate_unit_cus,
        cus_efforts_amt: cus_efforts_amt,
        cus_paid_on: cus_paid_on,
        createdBy: email
      })
      .catch(error => {
        console.log("Error during user creating on firebase", error);
      });
    alert("Task Add Successfully");
    this.setState({
      ticketSummary: "",
      status: "",
      ProjectCode: "",
      category: "",
      customer: "",
      priority: "",
      number: "",
      assigned: "",
      lastUpdated: "",
      deadline: "",
      projectopen: false,
      _param: "",
      est_dev_efforts: "",
      act_dev_efforts: "",
      rate_unit_dev: "",
      dev_efforts_amt: "",
      dev_paid_on: "",
      est_cus_efforts: "",
      act_cus_efforts: "",
      rate_unit_cus: "",
      cus_efforts_amt: "",
      cus_paid_on: "",
      assigneename: []
    });
  };
  handleChangeMultiple = event => {
    this.setState({
      assigneename: event.target.value
    });
  };

  handleInputChange = e => {
    this.setState({
      text: e.target.value
    });
  };

  handleMessaging = e => {
    if (!this.state.text) {
      alert('Please enter a comment first!');
      return false
    }
    const email = firebase.auth().currentUser.email;
    console.log(this.state.childKey);

    const ref = firebase
      .database()
      .ref(`Comments`)
    // .child(this.state.childKey);
    ref
      .push({
        from: email,
        text: this.state.text,
        type: 'text',
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
  };

  handleFileChange(event) {
    this.setState({ loading: true })
    const { target } = event;
    const { files } = target;
    let self = this;

    if (files && files[0]) {
      var reader = new FileReader();
      reader.onload = event => {
        console.log('mime type', files[0].type)
        let mimeType = files[0].type;

        var metadata = {
          contentType: mimeType
        };

        var storageRef = firebase.storage().ref();

        let folder = mimeType.split('/')[0] == 'image' ? 'image/' : 'docs/'

        var uploadTask = storageRef.child(`${folder}` + files[0].name).put(files[0], metadata);

        uploadTask.on('state_changed', function (snapshot) {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          self.progress(progress)
          console.log('Upload is ' + progress + '% done');
        }, function (error) {
        }, function () {

          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            const email = firebase.auth().currentUser.email;
            let taskId = self.state.childKey

            const ref = firebase
              .database()
              .ref(`Comments`)
            ref
              .push({
                from: email,
                type: mimeType,
                url: downloadURL,
                createdAt: new Date(),
                taskId: taskId
              }).
              then((res) => {
                self.setState({ loading: false })
                console.log('Comment Added !!')
              })
              .catch(err => {
                console.log('ERROR !!!')
              })
            console.log('File available at', downloadURL);
          });
        });
      };
    }
    reader.readAsDataURL(files[0]);
  }

  progress = (progress) => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + progress });
  };

  render() {
    const {
      ProjectCode,
      category,
      projects,
      allcustomers,
      _param,
      ticketSummary,
      status,
      number,
      lastUpdated,
      assigned,
      priority,
      deadline,
      customer,
      est_dev_efforts,
      act_dev_efforts,
      rate_unit_dev,
      dev_efforts_amt,
      dev_paid_on,
      est_cus_efforts,
      act_cus_efforts,
      rate_unit_cus,
      cus_efforts_amt,
      cus_paid_on
    } = this.state;
    // const roles = localStorage.getItem("role");
    // const assignees = allcustomers;
    const { classes } = this.props;
    const { loading } = this.state
    console.log("asas", this.state.selectedassignee);
    const roles = localStorage.getItem("role");
    const role = roles.slice(1, roles.length - 1);
    const tableData = projects;
    console.log('Table Data ', tableData);
    return (
      <Paper className={classes.root}>
        { (role === 'Admin' || role === 'Product Owner') ?
        <Button
        onClick={this.projecthandleClickOpen}
        variant="contained"
        color="primary"
        style={{ fontSize: 10, margin: 10 }}
      >
        Add
      </Button> :
        null
        }
        {role === 'Admin' ?
      <Button
      disabled={!this.state.checkBoxChecked}
      onClick={() => this.handlePdf(this.state.printInvoiceObj)}
      variant="contained"
      color="primary"
      style={{ fontSize: 10, margin: 10 }}
    >
      Create Invoice
    </Button>: null  
      }
        <CustomTable
          onSelectBox={this.handleSelectCheckBox}
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
          maxWidth='md'
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            <Icon style={{ paddingTop: 5 }}>comment </Icon>
            Comments
          </DialogTitle>
          <DialogContent>
            <FormControl className={classes.margin}>
              {/* <InputBase
                id="bootstrap-input"
                placeholder={
                  "Write a comment"
                }
                value={this.state.text}
                classes={{
                  root: classes.bootstrapRoot,
                  input: classes.bootstrapInput
                }}
                onChange={this.handleInputChange}
              /> */}

              <TextField
                id="outlined-simple-start-adornment"
                className={classNames(classes.margin, classes.textField)}
                variant="outlined"
                label="Write a comment"
                value={this.state.text}
                onChange={this.handleInputChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><EditIcon /></InputAdornment>,
                }}
              />

              <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', margin: 20, float: 'right' }}>

                <div>
                  <label id="#bb" style={{ color: 'black' }}>
                    <i className="material-icons" >attach_file</i>
                    <input type="file" name="myFile" style={{ display: 'none' }} disabled={loading ? true : false} onChange={this.handleFileChange.bind(this)} />
                  </label>
                </div>

                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={this.handleMessaging}>
                    Send
                  <MessageIcon />
                  </Button>
                </div>

                {
                  this.state.completed < 100 ?
                    <div>
                      <CircularProgress
                        className={classes.progress}
                        variant="static"
                        value={this.state.completed}
                        style={{ marginLeft: 10 }}
                        size={30} />
                    </div>
                    :
                    null
                }

              </div>

              {this.state.comments.slice(0).reverse().map(c => (
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
                        margin: 10,
                        fontSize: 13
                      }}
                      variant="h6"
                      component="h4"
                    >
                      {c.from}
                      {/* <span style={{ fontSize: 12 }}> Now</span> */}
                    </Typography>
                    {
                      c.type.split('/')[0] == 'application' ?
                        <div style={{ margin: 10 }}>
                          {/* <img src={PDFIcon} width={100} height={100} /> */}
                          <a target="blank" href={c.url}>
                            <img src={PDFIcon} width={100} height={100} />
                          </a>
                        </div>
                        :
                        c.type.split('/')[0] == 'image' ?
                          <div style={{ margin: 10 }}>
                            <img src={c.url} width={100} height={100} />
                          </div>
                          :
                          <Typography style={{ margin: 10 }} component="p">
                            {c.text}
                          </Typography>
                    }
                    <Typography style={{ margin: 10, fontSize: 9 }} component="p">
                      {Date(c.createdAt)}
                    </Typography>
                    {/* <Button>
                      <Icon>reply</Icon>reply
                    </Button> */}
                  </Paper>
                  {/* UserName:<h5>{c.from}</h5>Post:<p>{c.text}</p> */}
                </div>
              ))}
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
                  Project Code
                </InputLabel>
                <Select
                  value={ProjectCode}
                  onChange={this.handleProjectCodeChange}
                  // displayEmpty
                  input={
                    <OutlinedInput
                      // style={{ fontSize: 10 }}
                      labelWidth={60}
                      name="Country"
                      id="outlined-age-simple"
                    />
                  }
                >
                {this.state.allProjects.map(project => {
                 return(
                  <MenuItem value={project.ProjectCode}>{project.ProjectCode}</MenuItem>
                 ); 
                })}                  
                </Select>
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
                  Dev / Support
                </InputLabel>
                <Select
                  value={category}
                  onChange={this.handlecategoryChange}
                  // displayEmpty
                  input={
                    <OutlinedInput
                      // style={{ fontSize: 10 }}
                      labelWidth={60}
                      name="Country"
                      id="outlined-age-simple"
                    />
                  }
                >
                  <MenuItem value={"Dev"}>Dev</MenuItem>
                  <MenuItem value={"Support"}>Support</MenuItem>
                </Select>
              </FormControl>
              <CustomInput
                id="required"
                labelText="Ticket Summary"
                formControlProps={{
                  fullWidth: true
                }}
                onChange={this.handleticketSummaryChange}
                value={ticketSummary}
                inputProps={{
                  type: "text"
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
                  Status
                </InputLabel>
                <Select
                  value={status}
                  onChange={this.handlestatusChange}
                  // displayEmpty
                  input={
                    <OutlinedInput
                      // style={{ fontSize: 10 }}
                      labelWidth={30}
                      name="Country"
                      id="outlined-age-simple"
                    />
                  }
                >
                  <MenuItem value={"Open"}>Open</MenuItem>
                  <MenuItem value={"Close"}>Close</MenuItem>
                </Select>
              </FormControl>
            </FormControl>
            <FormControl fullWidth style={{ marginTop: 10 }}>
              <CustomInput
                id="required"
                labelText="Number"
                formControlProps={{
                  fullWidth: true
                }}
                value={number}
                onChange={this.handlenumberChange}
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
                labelText="Last Updated"
                formControlProps={{
                  fullWidth: true
                }}
                onChange={this.handlelastUpdatedChange}
                value={lastUpdated}
                inputProps={{
                  type: "text"
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
                Assigned
              </InputLabel>
              <Select
                value={assigned}
                onChange={this.handleassignedChange}
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
                {
                  this.state.allDevs.map((prop, key) => {
                    return(
                      <MenuItem value={prop}>{prop.name}</MenuItem>
                    )
                })
                }
              </Select>
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
                Priority
              </InputLabel>
              <Select
                value={priority}
                onChange={this.handlepriorityChange}
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
                <MenuItem value={"High"}>High</MenuItem>
                <MenuItem value={"Medium"}>Medium</MenuItem>
                <MenuItem value={"Low"}>Low</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth style={{ marginTop: 10 }}>
              <FormControl fullWidth style={{ marginTop: 10 }}>
                <TextField
                  id="date"
                  label="Deadline"
                  type="date"
                  defaultValue="2017-05-24"
                  value={deadline}
                  onChange={this.handledeadlineChange}
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
                <InputLabel
                  style={{ fontSize: 10 }}
                  ref={ref => {
                    this.InputLabelRef = ref;
                  }}
                  htmlFor="outlined-age-simple"
                >
                  Customer
                </InputLabel>
                <Select
                  onChange={this.handlecustomerChange}
                  value={customer}
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
                {
                  this.state.allCustomers.map(c => {
                    return(
                      <MenuItem value={c}>{c.customer}</MenuItem>
                    );
                  })
                }
                  
                </Select>
              </FormControl>
            </FormControl>
            {role == "Admin" ? (
              <FormControl fullWidth style={{ marginTop: 10 }}>
                <CustomInput
                  id="required"
                  labelText="Estimated developer efforts"
                  formControlProps={{
                    fullWidth: true
                  }}
                  onChange={this.handleest_dev_effortsChange}
                  value={est_dev_efforts}
                  inputProps={{
                    type: "number"
                  }}
                />
              </FormControl>
            ) : null}
            {role == "Admin" ? (
              <FormControl fullWidth style={{ marginTop: 10 }}>
                <CustomInput
                  id="required"
                  labelText="Actual developer efforts"
                  formControlProps={{
                    fullWidth: true
                  }}
                  onChange={this.handleact_dev_effortsChange}
                  value={act_dev_efforts}
                  inputProps={{
                    type: "number"
                  }}
                />
              </FormControl>
            ) : null}
            {role == "Admin" ? (
              <FormControl
                fullWidth
                style={{ marginTop: 10 }}
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
                  onChange={this.handlerate_unit_devChange}
                  value={rate_unit_dev}
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
            ) : null}
            {role == "Admin" ? (
              <FormControl fullWidth style={{ marginTop: 10 }}>
                <CustomInput
                  id="required"
                  labelText="Developer Effort amount "
                  formControlProps={{
                    fullWidth: true
                  }}
                  onChange={this.handledev_efforts_amtChange}
                  value={dev_efforts_amt}
                  inputProps={{
                    type: "number"
                  }}
                />
              </FormControl>
            ) : null}
            {role == "Admin" ? (
              <FormControl fullWidth style={{ marginTop: 10 }}>
                <TextField
                  id="date"
                  label="Developer Paid on"
                  type="date"
                  defaultValue="2017-05-24"
                  value={dev_paid_on}
                  onChange={this.handledev_paid_onChange}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </FormControl>
            ) : null}
            {role == "Admin" ? (
              <FormControl fullWidth style={{ marginTop: 10 }}>
                <CustomInput
                  id="required"
                  labelText="Efforts estimated to customer "
                  formControlProps={{
                    fullWidth: true
                  }}
                  value={est_cus_efforts}
                  onChange={this.handleest_cus_effortsChange}
                  inputProps={{
                    type: "number"
                  }}
                />
              </FormControl>
            ) : null}
            {role == "Admin" ? (
              <FormControl fullWidth style={{ marginTop: 10 }}>
                <CustomInput
                  id="required"
                  labelText="Efforts adjusted to customer"
                  formControlProps={{
                    fullWidth: true
                  }}
                  value={act_cus_efforts}
                  onChange={this.handleact_cus_effortsChange}
                  inputProps={{
                    type: "number"
                  }}
                />
              </FormControl>
            ) : null}
            {role == "Admin" ? (
              <FormControl
                fullWidth
                style={{ marginTop: 10 }}
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
                  value={rate_unit_cus}
                  onChange={this.handlerate_unit_cusChange}
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
            ) : null}
            {role == "Admin" ? (
              <FormControl fullWidth style={{ marginTop: 10 }}>
                <CustomInput
                  id="required"
                  labelText="To invoice amount "
                  formControlProps={{
                    fullWidth: true
                  }}
                  value={cus_efforts_amt}
                  onChange={this.handlecus_efforts_amtChange}
                  inputProps={{
                    type: "number"
                  }}
                />
              </FormControl>
            ) : null}
            {role == "Admin" ? (
              <FormControl fullWidth style={{ marginTop: 10 }}>
                <TextField
                  id="date"
                  label="Paid by Customer on"
                  type="date"
                  defaultValue="2017-05-24"
                  value={cus_paid_on}
                  onChange={this.handlecus_paid_onChange}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </FormControl>
            ) : null}
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
