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
import Comments from "@material-ui/icons/Comment";
import Close from "@material-ui/icons/Close";
import { Link } from "react-router-dom";
import Input from "@material-ui/core/Input";
import * as jsPDF from "jspdf";
import "jspdf-autotable";
import AttachFile from "@material-ui/icons/AttachFile";
import MessageIcon from "@material-ui/icons/MessageRounded";
import CircularProgress from "@material-ui/core/CircularProgress";

import InputAdornment from "@material-ui/core/InputAdornment";
import EditIcon from "@material-ui/icons/Edit";

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
    UProjectCode,
    handleUProjectCodeCodeChange,
    handleADevEffortsCodeChange,
    DevPaid,
    ADevEffort,
    handleDevPaidCodeChange,
    onSelectBox,
    allProjects,
    allDevs,
    allCustomers,
    handleUTicketSummaryCodeChange,
    UTicketSummary,
    handleUDev_SupportCodeChange,
    UDev_Support,
    handleUStatusCodeChange,
    UStatus,
    handleUNumberCodeChange,
    UNumber,
    handleULastUpdatedCodeChange,
    ULastUpdated,
    handleUDevCodeChange,
    UDev,
    handleUPriorityCodeChange,
    UPriority,
    handleUDeadlineCodeChange,
    UDeadline,
    handleUCustomerCodeChange,
    UCustomer,

    handleUEDEffortsCodeChange,
    UEDEfforts,
    handleUADEffortsCodeChange,
    UADEfforts,
    handleURUDEVCodeChange,
    URUDEV,
    handleUDEAmountCodeChange,
    UDEAmount,
    handleUDPaidOnCodeChange,
    UDPaidOn,
    handleUECEffortsCodeChange,
    UECEfforts,
    handleUACEffortsCodeChange,
    UACEfforts,
    handleURUCustomerCodeChange,
    URUCustomer,
    handleUCEAmountCodeChange,
    UCEAmount,
    handleUCPaidOnCodeChange,
    UCPaidOn
  } = props;
  const roles = localStorage.getItem("role");
  const role = roles.slice(1, roles.length - 1);
  if (role == "Admin") {
    var tableHead = [
      "Select",
      "#",
      "Project Code",
      "Dev / Support",
      "Ticket Summary",
      "Status",
      "Task Code",
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
      "Select",
      "#",
      "Project Code",
      "Dev / Support",
      "Ticket Summary",
      "Status",
      "Task Code",
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
  } else if(role == "Consultant") {
    var tableHead = [
      "Select",
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
      "Action"
    ];
  }  else {
    var tableHead = [
      "Select",
      "#",
      "Project Code",
      "Dev / Support",
      "Ticket Summary",
      "Status",
      "Task Code",
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
              debugger
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

              let UProjectCode1 =
                UProjectCode == ""
                  ? prop.all_projects.ProjectCode
                  : UProjectCode;
              let UDev_Support1 =
                UDev_Support == "" ? prop.all_projects.category : UDev_Support;
              let UTicketSummary1 =
                UTicketSummary == ""
                  ? prop.all_projects.ticketSummary
                  : UTicketSummary;
              let UStatus1 = UStatus == "" ? prop.all_projects.status : UStatus;
              let UNumber1 = UNumber == "" ? prop.all_projects.number : UNumber;
              let ULastUpdated1 =
                ULastUpdated == ""
                  ? prop.all_projects.lastUpdated
                  : ULastUpdated;
              let UDev1 = UDev == "" ? prop.all_projects.assigned : UDev;
              let UPriority1 =
                UPriority == "" ? prop.all_projects.priority : UPriority;
              let UDeadline1 =
                UDeadline == "" ? prop.all_projects.deadline : UDeadline;
              let UCustomer1 =
                UCustomer == "" ? prop.all_projects.customer : UCustomer;
              let UEDEfforts1 =
                UEDEfforts == ""
                  ? prop.all_projects.est_dev_efforts
                  : UEDEfforts;
              let UADEfforts1 =
                UADEfforts == ""
                  ? prop.all_projects.act_dev_efforts
                  : UADEfforts;
              let URUDEV1 =
                URUDEV == "" ? prop.all_projects.rate_unit_dev : URUDEV;
              let UDEAmount1 =
                UDEAmount == "" ? prop.all_projects.dev_efforts_amt : UDEAmount;
              let UDPaidOn1 =
                UDPaidOn == "" ? prop.all_projects.dev_paid_on : UDPaidOn;
              let UECEfforts1 =
                UECEfforts == ""
                  ? prop.all_projects.est_cus_efforts
                  : UECEfforts;
              let UACEfforts1 =
                UACEfforts == ""
                  ? prop.all_projects.act_cus_efforts
                  : UACEfforts;
              let URUCustomer1 =
                URUCustomer == ""
                  ? prop.all_projects.rate_unit_cus
                  : URUCustomer;
              let UCEAmount1 =
                UCEAmount == "" ? prop.all_projects.cus_efforts_amt : UCEAmount;
              let UCPaidOn1 =
                UCPaidOn == "" ? prop.all_projects.cus_paid_on : UCPaidOn;

                let date = new Date(prop.all_projects.lastUpdated).getDate()
                let month = new Date(prop.all_projects.lastUpdated).getMonth() + 1
                let year = new Date(prop.all_projects.lastUpdated).getFullYear()
                let lastUpdatedDate = `${date}/${month}/${year}`

              // console.log('props_data', prop.key)
              return (
                <TableRow
                  key={prop.key}
                  hover={hover}
                  className={tableRowClasses}
                >
                  <TableCell>
                    {prop.all_projects.status === "Close" ? (
                      <Checkbox
                        // indeterminate={false}
                        // disabled={true}
                        // checked={numSelected === rowCount}
                        onChange={e => onSelectBox(prop, e)}
                      />
                    ) : (
                        <Checkbox
                          // indeterminate={false}
                          disabled={true}
                        />
                      )}
                  </TableCell>
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
                    {
                    //   editing == prop.key ? (
                    //   <FormControl
                    //     style={{ marginTop: 10 }}
                    //     className={[classes.formControl, "form-control"]}
                    //     variant="outlined"
                    //   >
                    //     <Select
                    //       onChange={handleUProjectCodeCodeChange}
                    //       value={UProjectCode1}
                    //     // displayEmpty
                    //     >
                    //       {allProjects.map(project => {
                    //         return (
                    //           <MenuItem value={project.ProjectCode}>
                    //             {project.ProjectCode}
                    //           </MenuItem>
                    //         );
                    //       })}
                    //     </Select>
                    //   </FormControl>
                    // ) : (
                        prop.all_projects.ProjectCode
                      // )
                      }
                  </TableCell>
                  <TableCell
                    className={classes.tableCell}
                    colSpan={prop.colspan}
                  >
                    {editing == prop.key ? (
                      <FormControl
                        style={{ marginTop: 10 }}
                        className={[classes.formControl, "form-control"]}
                        variant="outlined"
                      >
                        <Select
                          onChange={handleUDev_SupportCodeChange}
                          value={UDev_Support1}
                        // displayEmpty
                        >
                          <MenuItem value={"Dev"}>Dev</MenuItem>
                          <MenuItem value={"Support"}>Support</MenuItem>
                        </Select>
                      </FormControl>
                    ) : (
                        prop.all_projects.category
                      )}
                  </TableCell>
                  <TableCell
                    className={classes.tableCell}
                    colSpan={prop.colspan}
                  >
                    {editing == prop.key ? (
                      <CustomInput
                        id="required"
                        md={12}
                        lg={12}
                        labelText="Ticket Summary"
                        formControlProps={{
                          fullWidth: true
                        }}
                        onChange={handleUTicketSummaryCodeChange}
                        value={UTicketSummary1}
                        inputProps={{
                          type: "text"
                        }}
                      />
                    ) : (
                        prop.all_projects.ticketSummary
                      )}
                  </TableCell>
                  <TableCell
                    className={classes.tableCell}
                    colSpan={prop.colspan}
                  >
                    {editing == prop.key ? (
                      <FormControl
                        style={{ marginTop: 10 }}
                        className={[classes.formControl, "form-control"]}
                        variant="outlined"
                      >
                        <Select
                          onChange={handleUStatusCodeChange}
                          value={UStatus1}
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
                  >
                    {editing == prop.key ? (
                      <CustomInput
                        id="required"
                        md={12}
                        lg={12}
                        labelText="Number"
                        formControlProps={{
                          fullWidth: true
                        }}
                        onChange={handleUNumberCodeChange}
                        value={UNumber1}
                        inputProps={{
                          type: "text"
                        }}
                      />
                    ) : (
                        prop.all_projects.number
                      )}
                  </TableCell>
                  <TableCell
                    className={classes.tableCell}
                    colSpan={prop.colspan}
                  >
                    {
                    // (
                      // <CustomInput
                      // disabled
                      //   id="required"
                      //   md={12}
                      //   lg={12}
                      //   labelText="Last Updated"
                      //   formControlProps={{
                      //     fullWidth: true
                      //   }}
                      //   onChange={handleULastUpdatedCodeChange}
                      //   value={ULastUpdated1}
                      //   inputProps={{
                      //     type: "text"
                      //   }}
                      // />
                    // ) : (
                        // prop.all_projects.lastUpdated
                        lastUpdatedDate
                      // )
                      }
                  </TableCell>
                  <TableCell
                    className={classes.tableCell}
                    colSpan={prop.colspan}
                  >
                    {editing == prop.key ? (
                      <FormControl
                        style={{ marginTop: 10 }}
                        className={[classes.formControl, "form-control"]}
                        variant="outlined"
                      >
                        <Select onChange={handleUDevCodeChange} value={UDev1}>
                          {allDevs.map((prop, key) => {
                            return (
                              <MenuItem value={prop.name}>{prop.name}</MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    ) : (
                        prop.all_projects.assigned
                      )}
                  </TableCell>
                  <TableCell
                    className={classes.tableCell}
                    colSpan={prop.colspan}
                  >
                    {editing == prop.key ? (
                      <FormControl
                        style={{ marginTop: 10 }}
                        className={[classes.formControl, "form-control"]}
                        variant="outlined"
                      >
                        <Select
                          onChange={handleUPriorityCodeChange}
                          value={UPriority1}
                        // displayEmpty
                        >
                          <MenuItem value={"High"}>High</MenuItem>
                          <MenuItem value={"Medium"}>Medium</MenuItem>
                          <MenuItem value={"Low"}>Low</MenuItem>
                        </Select>
                      </FormControl>
                    ) : (
                        prop.all_projects.priority
                      )}
                  </TableCell>
                  <TableCell
                    className={classes.tableCell}
                    colSpan={prop.colspan}
                  >
                    {editing == prop.key ? (
                      <CustomInput
                        id="required"
                        md={12}
                        lg={12}
                        labelText="Deadline"
                        formControlProps={{
                          fullWidth: true
                        }}
                        onChange={handleUDeadlineCodeChange}
                        value={UDeadline1}
                        inputProps={{
                          type: "text"
                        }}
                      />
                    ) : (
                        prop.all_projects.deadline
                      )}
                  </TableCell>
                  <TableCell
                    className={classes.tableCell}
                    colSpan={prop.colspan}
                  >
                    {/* {editing == prop.key ? (
                      <FormControl
                        style={{ marginTop: 10 }}
                        className={[classes.formControl, "form-control"]}
                        variant="outlined"
                      >
                        <Select
                          onChange={handleUCustomerCodeChange}
                          value={UCustomer1}
                        // displayEmpty
                        >
                          {allCustomers.map(c => {
                            debugger
                            return (
                              <MenuItem value={c.customer}>
                                {c.customer}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    ) : ( */}
                        {prop.all_projects.customer}
                      {/* )} */}
                  </TableCell>
                  {role == "Admin" || role == "Developer" ? (
                    <TableCell
                      className={classes.tableCell}
                      colSpan={prop.colspan}
                    >
                      {editing == prop.key ? (
                        <CustomInput
                          id="required"
                          md={12}
                          lg={12}
                          labelText="EDEfforts"
                          formControlProps={{
                            fullWidth: true
                          }}
                          onChange={handleUEDEffortsCodeChange}
                          value={UEDEfforts1}
                          inputProps={{
                            type: "text"
                          }}
                        />
                      ) : (
                          prop.all_projects.est_dev_efforts
                        )}
                    </TableCell>
                  ) : null}
                  {role == "Admin" || role == "Developer" ? (
                    <TableCell
                      className={classes.tableCell}
                      colSpan={prop.colspan}
                    >
                      {editing == prop.key ? (
                        <CustomInput
                          id="required"
                          md={12}
                          lg={12}
                          labelText="ADEfforts"
                          formControlProps={{
                            fullWidth: true
                          }}
                          onChange={handleUADEffortsCodeChange}
                          value={UADEfforts1}
                          inputProps={{
                            type: "text"
                          }}
                        />
                      ) : (
                          prop.all_projects.act_dev_efforts
                        )}
                    </TableCell>
                  ) : null}
                  {role == "Admin" || role == "Developer" ? (
                    <TableCell
                      className={classes.tableCell}
                      colSpan={prop.colspan}
                    >
                      {editing == prop.key ? (
                        <CustomInput
                          id="required"
                          md={12}
                          lg={12}
                          labelText="RUDEV"
                          formControlProps={{
                            fullWidth: true
                          }}
                          onChange={handleURUDEVCodeChange}
                          value={URUDEV1}
                          inputProps={{
                            type: "text"
                          }}
                        />
                      ) : (
                          prop.all_projects.rate_unit_dev
                        )}
                    </TableCell>
                  ) : null}
                  {role == "Admin" || role == "Developer" ? (
                    <TableCell
                      className={classes.tableCell}
                      colSpan={prop.colspan}
                    >
                      {editing == prop.key ? (
                        <CustomInput
                          id="required"
                          md={12}
                          lg={12}
                          labelText="DEAmount"
                          formControlProps={{
                            fullWidth: true
                          }}
                          onChange={handleUDEAmountCodeChange}
                          value={UDEAmount1}
                          inputProps={{
                            type: "text"
                          }}
                        />
                      ) : (
                          prop.all_projects.dev_efforts_amt
                        )}
                    </TableCell>
                  ) : null}
                  {role == "Admin" || role == "Developer" ? (
                    <TableCell
                      className={classes.tableCell}
                      colSpan={prop.colspan}
                    >
                      {editing == prop.key ? (
                        <CustomInput
                          id="required"
                          md={12}
                          lg={12}
                          labelText="DPaidOn"
                          formControlProps={{
                            fullWidth: true
                          }}
                          onChange={handleUDPaidOnCodeChange}
                          value={UDPaidOn1}
                          inputProps={{
                            type: "text"
                          }}
                        />
                      ) : (
                          prop.all_projects.dev_paid_on
                        )}
                    </TableCell>
                  ) : null}
                  {role == "Admin" ||
                    role == "Product Owner" ||
                    role == "Consultant" ? (
                      <TableCell
                        className={classes.tableCell}
                        colSpan={prop.colspan}
                      >
                        {editing == prop.key ? (
                          <CustomInput
                            id="required"
                            md={12}
                            lg={12}
                            labelText="ECEfforts"
                            formControlProps={{
                              fullWidth: true
                            }}
                            onChange={handleUECEffortsCodeChange}
                            value={UECEfforts1}
                            inputProps={{
                              type: "text"
                            }}
                          />
                        ) : (
                            prop.all_projects.est_cus_efforts
                          )}
                      </TableCell>
                    ) : null}
                  {role == "Admin" ||
                    role == "Product Owner" ||
                    role == "Consultant" ? (
                      <TableCell
                        className={classes.tableCell}
                        colSpan={prop.colspan}
                      >
                        {editing == prop.key ? (
                          <CustomInput
                            id="required"
                            md={12}
                            lg={12}
                            labelText="ACEfforts"
                            formControlProps={{
                              fullWidth: true
                            }}
                            onChange={handleUACEffortsCodeChange}
                            value={UACEfforts1}
                            inputProps={{
                              type: "text"
                            }}
                          />
                        ) : (
                            prop.all_projects.act_cus_efforts
                          )}
                      </TableCell>
                    ) : null}
                  {role == "Admin" ||
                    role == "Product Owner" ||
                    role == "Consultant" ? (
                      <TableCell
                        className={classes.tableCell}
                        colSpan={prop.colspan}
                      >
                        {editing == prop.key ? (
                          <CustomInput
                            id="required"
                            md={12}
                            lg={12}
                            labelText="RUCustomer"
                            formControlProps={{
                              fullWidth: true
                            }}
                            onChange={handleURUCustomerCodeChange}
                            value={URUCustomer1}
                            inputProps={{
                              type: "text"
                            }}
                          />
                        ) : (
                            prop.all_projects.rate_unit_cus
                          )}
                      </TableCell>
                    ) : null}
                  {role == "Admin" ||
                    role == "Product Owner" ||
                    role == "Consultant" ? (
                      <TableCell
                        className={classes.tableCell}
                        colSpan={prop.colspan}
                      >
                        {editing == prop.key ? (
                          <CustomInput
                            id="required"
                            md={12}
                            lg={12}
                            labelText="CEAmount"
                            formControlProps={{
                              fullWidth: true
                            }}
                            onChange={handleUCEAmountCodeChange}
                            value={UCEAmount1}
                            inputProps={{
                              type: "text"
                            }}
                          />
                        ) : (
                            prop.all_projects.cus_efforts_amt
                          )}
                      </TableCell>
                    ) : null}
                  {role == "Admin" ||
                    role == "Product Owner" ||
                    role == "Consultant" ? (
                      <TableCell
                        className={classes.tableCell}
                        colSpan={prop.colspan}
                      >
                        {editing == prop.key ? (
                          <CustomInput
                            id="required"
                            md={12}
                            lg={12}
                            labelText="CPaidOn"
                            formControlProps={{
                              fullWidth: true
                            }}
                            onChange={handleUCPaidOnCodeChange}
                            value={UCPaidOn1}
                            inputProps={{
                              type: "text"
                            }}
                          />
                        ) : (
                            prop.all_projects.cus_paid_on
                          )}
                      </TableCell>
                    ) : null}
                  <TableCell
                    className={classes.tableCell}
                    colSpan={prop.colspan}
                  >
                    <Button
                      edit={true}
                      color="success"
                      onClick={() => handleClickOpen(prop.key)}
                      simple
                    >
                      <Comments color="success" />
                    </Button>
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
                    {role === "Consultant" &&
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
                    {role == "Admin" ? (
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
    debugger
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
    UProjectCode: "",
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
    checkBoxChecked: false,
    UTicketSummary: "",
    UDev_Support: "",
    UStatus: "",
    UNumber: "",
    ULastUpdated: "",
    UDev: "",
    UPriority: "",
    UDeadline: "",
    UCustomer: "",
    UEDEfforts: "",
    UADEfforts: "",
    URUDEV: "",
    UDEAmount: "",
    UDPaidOn: "",
    UECEfforts: "",
    UACEfforts: "",
    URUCustomer: "",
    UCEAmount: "",
    UCPaidOn: "",
    editComment: false,
    filterTxt: ''
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
      });
  }

  getProjects() {
    //getting Projects for Project Code in Add Task
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
  }

  getCustomers() {
    // getting customers from firebase for add task customer dropdowns
    firebase
      .database()
      .ref("Customer")
      .on("child_added", customer => {
        console.log("Customers ", customer.val());
        let customers = this.state.allCustomers;
        customers.push(customer.val());
        this.setState({
          allCustomers: customers
        });
      });
  }

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
        let customer = this.state.allCustomers.find(
          x => x.email == project.val().customer
        );
        let isExist = customer && customer.users.find(x => x.email == email);
        if (
          project.val().createdBy == email ||
          role == "Admin" ||
          (role == "Developer" && project.val().assigned == email) ||
          isExist
        ) {
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
    let companyEmail = e.target.value.customer
    let selectedCustomer = this.state.allCustomers.find(cust => cust.email == companyEmail)
    this.setState({ ProjectCode: e.target.value, customer: selectedCustomer, rate_unit_cus: 'Hourly' });
    if(this.state.category && e.target.value) {
      this.setState({
        number: `${e.target.value.ProjectCode}-${this.state.category}- ${Math.floor(Math.random() * 1000)}`
      });
    }
  };
  handlestatusChange = e => {
    this.setState({ status: e.target.value });
  };
  handlecategoryChange = e => {
    this.setState({ category: e.target.value });
    console.log(this.state.ProjectCode);
    if(this.state.ProjectCode && e.target.value) {
      this.setState({
        number: `${this.state.ProjectCode.ProjectCode}-${e.target.value}- ${Math.floor(Math.random() * 1000)}`
      });
    }
  };
  handleUProjectCodeCodeChange = e => {
    this.setState({ UProjectCode: e.target.value });
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
    this.setState({ assigned: e.target.value, rate_unit_dev: 'Hourly' });
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

  handleUTicketSummaryCodeChange = e => {
    this.setState({ UTicketSummary: e.target.value });
  };
  handleUDev_SupportCodeChange = e => {
    this.setState({ UDev_Support: e.target.value });
  };
  handleUStatusCodeChange = e => {
    this.setState({ UStatus: e.target.value });
  };
  handleUNumberCodeChange = e => {
    this.setState({ UNumber: e.target.value });
  };
  handleULastUpdatedCodeChange = e => {
    this.setState({ ULastUpdated: e.target.value });
  };
  handleUDevCodeChange = e => {
    this.setState({ UDev: e.target.value });
  };
  handleUPriorityCodeChange = e => {
    this.setState({ UPriority: e.target.value });
  };
  handleUDeadlineCodeChange = e => {
    this.setState({ UDeadline: e.target.value });
  };
  handleUCustomerCodeChange = e => {
    this.setState({ UCustomer: e.target.value });
  };
  handleUEDEffortsCodeChange = e => {
    this.setState({ UEDEfforts: e.target.value });
  };
  handleUADEffortsCodeChange = e => {
    this.setState({ UADEfforts: e.target.value });
  };
  handleURUDEVCodeChange = e => {
    this.setState({ URUDEV: e.target.value });
  };
  handleUDEAmountCodeChange = e => {
    this.setState({ UDEAmount: e.target.value });
  };
  handleUDPaidOnCodeChange = e => {
    this.setState({ UDPaidOn: e.target.value });
  };
  handleUECEffortsCodeChange = e => {
    this.setState({ UECEfforts: e.target.value });
  };
  handleUACEffortsCodeChange = e => {
    this.setState({ UACEfforts: e.target.value });
  };
  handleURUCustomerCodeChange = e => {
    this.setState({ URUCustomer: e.target.value });
  };
  handleUCEAmountCodeChange = e => {
    this.setState({ UCEAmount: e.target.value });
  };
  handleUCPaidOnCodeChange = e => {
    this.setState({ UCPaidOn: e.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  handleClickOpen = key => {
    this.setState({ comments: [] });
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
  handlePdf = td => {
    let col,
      row = [];
    col = [
      { title: "Dascription", dataKey: "customer" },
      { title: "Project", dataKey: "ProjectCode" },
      { title: "Assigned", dataKey: "assign" }
    ];
    row.push({
      customer: td.all_projects.customer,
      ProjectCode: td.all_projects.ProjectCode,
      assign: td.all_projects.assigned
    });
    var doc = new jsPDF("p", "pt");
    doc.setFontSize(22);
    doc.setTextColor(102, 178, 255);
    doc.text(20, 20, "SysBrillance");
    doc.setFontSize(15);
    doc.setTextColor(0, 0, 0);
    doc.text(500, 20, "Invoice");
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(500, 30, "SysBrillance");
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(500, 40, "United Arab Emirates");
    doc.line(600, 50, 10, 50);
    doc.setFontSize(10);
    doc.setTextColor(220, 220, 220);
    doc.text(20, 70, "BILL TO");
    doc.setTextColor(0, 0, 0);
    doc.text(430, 70, "InvoiceNumber: " + td.all_projects.number);
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(20, 80, td.all_projects.customer);
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(20, 90, "My address");
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(430, 90, "Invoice Date: February 15, 2019");
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(20, 100, "Dubai etc, etc");
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(430, 100, "Payment Due: February 15, 2019");
    doc.setFontSize(20);
    doc.setTextColor(40);
    doc.autoTable(col, row, {
      startY: 110
    });
    doc.save("invoice.pdf");
  };

  handleSelectCheckBox = (prop, e) => {
    this.setState({
      printInvoiceObj: prop,
      checkBoxChecked: e.target.checked
    });
    console.log(this.state.checkBoxChecked);
  };

  openUpdateProject = _param => {
    debugger
    console.log('jiye mutahida', _param)
    this.setState({ editing: _param.key });
    // this.projecthandleClickOpen();
    _param =  _param.all_projects
    if (_param !== "") {
      this.setState({
        UProjectCode: _param.ProjectCode,
      UTicketSummary: _param.ticketSummary,
      UDev_Support: _param.category,
      UStatus: _param.status,
      UNumber: _param.number,
      ULastUpdated: Date.now(),
      UDev: _param.assigned,
      UPriority: _param.priority,
      UDeadline: _param.deadline,
      UCustomer: _param.customer,
      UEDEfforts: _param.est_dev_efforts,
      UADEfforts: _param.act_dev_efforts,
      URUDEV: _param.rate_unit_dev,
      UDEAmount: _param.est_dev_efforts,
      UDPaidOn: _param.dev_paid_on,
      UECEfforts: _param.est_cus_efforts,
      UACEfforts: _param.act_cus_efforts,
      URUCustomer: _param.rate_unit_cus,
      UCEAmount: _param.cus_efforts_amt,
      UCPaidO: _param.cus_paid_on
      });
    }
  };
  updateTask = (e, key) => {
    // e.preventDefault();
    const {
      UProjectCode,
      UTicketSummary,
      UDev_Support,
      UStatus,
      UNumber,
      ULastUpdated,
      UDev,
      UPriority,
      UDeadline,
      UCustomer,
      UEDEfforts,
      UADEfforts,
      URUDEV,
      UDEAmount,
      UDPaidOn,
      UECEfforts,
      UACEfforts,
      URUCustomer,
      UCEAmount,
      UCPaidOn
    } = this.state;

    debugger

    firebase
      .database()
      .ref("Tasks/" + key)
      .update({
        ticketSummary: UTicketSummary,
        ProjectCode: UProjectCode,
        customer: UCustomer,
        status: UStatus,
        category: UDev_Support,
        priority: UPriority,
        number: UNumber,
        assigned: UDev,
        deadline: UDeadline,
        lastUpdated: ULastUpdated,
        est_dev_efforts: UEDEfforts,
        act_dev_efforts: UADEfforts,
        rate_unit_dev: URUDEV,
        dev_efforts_amt: UDEAmount,
        dev_paid_on: UDPaidOn,
        est_cus_efforts: UECEfforts,
        act_cus_efforts: UACEfforts,
        rate_unit_cus: URUCustomer,
        cus_efforts_amt: UCEAmount,
        cus_paid_on: UCPaidOn
      })
      .then(() => {
        alert("Task updated successfully");
        this.setState({
          UProjectCode: "",
          UTicketSummary: "",
          UDev_Support: "",
          UStatus: "",
          UNumber: "",
          ULastUpdated: "",
          UDev: "",
          UPriority: "",
          UDeadline: "",
          UCustomer: "",
          UEDEfforts: "",
          UADEfforts: "",
          URUDEV: "",
          UDEAmount: "",
          UDPaidOn: "",
          UECEfforts: "",
          UACEfforts: "",
          URUCustomer: "",
          UCEAmount: "",
          UCPaidOn: "",
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
    const assignedDev = assigned.email;
    var userId = firebase.auth().currentUser.uid;
    const email = firebase.auth().currentUser.email;
    const ref = firebase.database().ref("Tasks/");
    ref
      .push({
        uid: userId,
        ticketSummary: ticketSummary,
        ProjectCode: ProjectCode.ProjectCode,
        status: status,
        category: category,
        customer: customer.email,
        priority: priority,
        number: number,
        assigned: assignedDev,
        deadline: deadline,
        lastUpdated: Date.now(),
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

  handleFileChange(event) {
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
            self.progress(progress);
            console.log("Upload is " + progress + "% done");
          },
          function (error) { },
          function () {
            uploadTask.snapshot.ref
              .getDownloadURL()
              .then(function (downloadURL) {
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

  progress = progress => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + progress });
  };

  deleteComment(comment, index) {
    debugger
    let key = comment.key
    let self = this
    firebase
      .database()
      .ref("Comments")
      .child(key)
      .remove()
      .then(() => {
        self.state.comments.map((comment, index) => {
          if (comment.key == key) {
            let comments = self.state.comments
            comments.splice(index, 1)
            self.setState({ comments: comments })
            debugger
          }

        })
        // let comments = this.state.comments.slice(0).reverse()
        // comments.splice(index, 1);
        // this.setState({
        //   comments: comments.slice(0).reverse(),
        //   editComment: false,
        //   text: ''
        // });
      });
  }

  updateComment(comment) {
    this.setState({ text: comment.comment.text, editComment: true, editKey: comment.key })
  }

  handleFilterTxt = (e) => {
    this.setState({
      filterTxt: e.target.value
    });
  };
  dateIntoString = (date) => {
    debugger;
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!

    var yyyy = date.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    var today = dd + '/' + mm + '/' + yyyy;
    return today;
  }
  searchData = (search) => {
    this.setState({
      projects: this.state.projects.filter(x => x.all_projects.category == search || x.all_projects.ProjectCode == search ||
        x.all_projects.ticketSummary == search || x.all_projects.status == search || x.all_projects.number == search ||
        this.dateIntoString(x.all_projects.lastUpdated) == search || x.all_projects.priority == search || x.all_projects.deadline == search || 
        x.all_projects.customer == search || x.all_projects.dev_paid_on == search || x.all_projects.cus_paid_on == search) 
    });
  }
  setInitialState = () => {
    this.setState({
      filterTxt: '',
    });
    this.state.projects = [];
    console.log(this.state.projects);
    this.showTasks();
    console.log(this.state.projects);
  }

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
    const { loading } = this.state;
    debugger

    console.log("asas", this.state.selectedassignee);
    const roles = localStorage.getItem("role");
    const role = roles.slice(1, roles.length - 1);
    const tableData = projects;
    console.log("Table Data ", tableData);
    return (
      <Paper className={classes.root}>
        {role === "Admin" || role === "Product Owner" || role === "Consultant" ? (
          <Button
            onClick={this.projecthandleClickOpen}
            variant="contained"
            color="primary"
            style={{ fontSize: 10, margin: 10 }}
          >
            Add
          </Button>
        ) : null}
        {role === "Admin" ? (
          <Button
            disabled={!this.state.checkBoxChecked}
            onClick={() => this.handlePdf(this.state.printInvoiceObj)}
            variant="contained"
            color="primary"
            style={{ fontSize: 10, margin: 10 }}
          >
            Create Invoice
          </Button>
        ) : null}
        <CustomInput
                id="required"
                labelText="Search"
                formControlProps={{
                  // fullWidth: true
                }}
                onChange={this.handleFilterTxt}
                value={this.state.filterTxt}
                inputProps={{
                  type: "text"
                }}
              />
              <Button
            onClick={() => this.searchData(this.state.filterTxt)}
            variant="contained"
            color="primary"
            style={{ fontSize: 10, margin: 10 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.setInitialState()}
            variant="contained"
            color="primary"
            style={{ fontSize: 10, margin: 10 }}
          >
            Remove
          </Button>
        <CustomTable
          onSelectBox={this.handleSelectCheckBox}
          handleClickOpen={this.handleClickOpen}
          handleADevEffortsCodeChange={this.handleADevEffortsCodeChange}
          handleDevPaidCodeChange={this.handleDevPaidCodeChange}
          ADevEffort={this.state.ADevEffort}
          DevPaid={this.state.DevPaid}
          handleUProjectCodeCodeChange={this.handleUProjectCodeCodeChange}
          UProjectCode={this.state.UProjectCode}
          tableData={tableData}
          editing={this.state.editing}
          deleteUser={this.deleteCustomer}
          updateTask={this.updateTask}
          openUpdateProject={this.openUpdateProject}
          allProjects={this.state.allProjects}
          allDevs={this.state.allDevs}
          allCustomers={this.state.allCustomers}
          handleUTicketSummaryCodeChange={this.handleUTicketSummaryCodeChange}
          UTicketSummary={this.state.UTicketSummary}
          handleUDev_SupportCodeChange={this.handleUDev_SupportCodeChange}
          UDev_Support={this.state.UDev_Support}
          handleUStatusCodeChange={this.handleUStatusCodeChange}
          UStatus={this.state.UStatus}
          handleUNumberCodeChange={this.handleUNumberCodeChange}
          UNumber={this.state.UNumber}
          handleULastUpdatedCodeChange={this.handleULastUpdatedCodeChange}
          ULastUpdated={this.state.ULastUpdated}
          handleUDevCodeChange={this.handleUDevCodeChange}
          UDev={this.state.UDev}
          handleUPriorityCodeChange={this.handleUPriorityCodeChange}
          UPriority={this.state.UPriority}
          handleUDeadlineCodeChange={this.handleUDeadlineCodeChange}
          UDeadline={this.state.UDeadline}
          handleUCustomerCodeChange={this.handleUCustomerCodeChange}
          UCustomer={this.state.UCustomer}
          handleUEDEffortsCodeChange={this.handleUEDEffortsCodeChange}
          UEDEfforts={this.state.UEDEfforts}
          handleUADEffortsCodeChange={this.handleUADEffortsCodeChange}
          UADEfforts={this.state.UADEfforts}
          handleURUDEVCodeChange={this.handleURUDEVCodeChange}
          URUDEV={this.state.URUDEV}
          handleUDEAmountCodeChange={this.handleUDEAmountCodeChange}
          UDEAmount={this.state.UDEAmount}
          handleUDPaidOnCodeChange={this.handleUDPaidOnCodeChange}
          UDPaidOn={this.state.UDPaidOn}
          handleUECEffortsCodeChange={this.handleUECEffortsCodeChange}
          UECEfforts={this.state.UECEfforts}
          handleUACEffortsCodeChange={this.handleUACEffortsCodeChange}
          UACEfforts={this.state.UACEfforts}
          handleURUCustomerCodeChange={this.handleURUCustomerCodeChange}
          URUCustomer={this.state.URUCustomer}
          handleUCEAmountCodeChange={this.handleUCEAmountCodeChange}
          UCEAmount={this.state.UCEAmount}
          handleUCPaidOnCodeChange={this.handleUCPaidOnCodeChange}
          UCPaidOn={this.state.UCPaidOn}
        />
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
          maxWidth="md"
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
                  startAdornment: (
                    <InputAdornment position="start">
                      <EditIcon />
                    </InputAdornment>
                  )
                }}
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  margin: 20,
                  float: "right"
                }}
              >
                <div>
                  <label id="#bb" style={{ color: "black" }}>
                    <i className="material-icons">attach_file</i>
                    <input
                      type="file"
                      name="myFile"
                      style={{ display: "none" }}
                      disabled={loading ? true : false}
                      onChange={this.handleFileChange.bind(this)}
                    />
                  </label>
                </div>

                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={this.handleMessaging}
                  >
                    {!this.state.editComment ? 'Send' : 'Update'}

                    {
                      !this.state.editComment ?
                        <MessageIcon /> : <EditIcon />
                    }
                  </Button>
                </div>

                {this.state.completed < 100 ? (
                  <div>
                    <CircularProgress
                      className={classes.progress}
                      variant="static"
                      value={this.state.completed}
                      style={{ marginLeft: 10 }}
                      size={30}
                    />
                  </div>
                ) : null}
              </div>

              {this.state.comments
                .slice(0)
                .reverse()
                .map((c, index) => (
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
                        {c.comment.from}
                        {/* <span style={{ fontSize: 12 }}> Now</span> */}
                      </Typography>
                      {c.comment.type.split("/")[0] == "application" ? (
                        <div style={{ margin: 10 }}>
                          {/* <img src={PDFIcon} width={100} height={100} /> */}
                          <a target="blank" href={c.url}>
                            <img src={PDFIcon} width={100} height={100} />
                          </a>
                        </div>
                      ) : c.comment.type.split("/")[0] == "image" ? (
                        <div style={{ margin: 10 }}>
                          <img src={c.comment.url} width={100} height={100} />
                        </div>
                      ) : (
                            <Typography style={{ margin: 10 }} component="p">
                              {c.comment.text}
                            </Typography>
                          )}
                      <Typography
                        style={{ margin: 10, fontSize: 9 }}
                        component="p"
                      >
                        {Date(c.comment.createdAt)}
                      </Typography>

                      {
                        c.comment.type == 'text' ?
                          <Button
                            edit={true}
                            color="success"
                            onClick={() => this.updateComment(c)}
                            simple
                          >
                            <Edit color="success" />
                          </Button>
                          :
                          null
                      }

                      <Button
                        color="danger"
                        simple
                        onClick={() => this.deleteComment(c, index)}
                      >
                        <Close color="danger" />
                      </Button>

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
                    return (
                      <MenuItem value={project}>
                        {project.ProjectCode}
                      </MenuItem>
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
                disabled={true}
                id="required"
                labelText="Task Code"
                formControlProps={{
                  fullWidth: true
                }}
                value={number}
                onChange={this.handlenumberChange}
                inputProps={{
                  type: "text"
                }}
              />
            </FormControl>
            {/* <FormControl
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
            </FormControl> */}
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
                {this.state.allDevs.map((prop, key) => {
                  return <MenuItem value={prop}>{prop.name}</MenuItem>;
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
                  {this.state.allCustomers.map(c => {
                    return <MenuItem value={c}>{c.customer}</MenuItem>;
                  })}
                </Select>
              </FormControl> */}

              <FormControl>

                <TextField
                  disabled
                  id="outlined-disabled"
                  label={'Customer'}
                  value={customer ? customer.customer : 'Customer'}
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                />
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
