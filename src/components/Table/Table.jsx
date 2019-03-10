/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "components/CustomButtons/Button.jsx";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import tableStyle from "assets/jss/material-dashboard-pro-react/components/tableStyle";
import { Link } from "react-router-dom";

function CustomTable({ ...props }) {
  const {
    classes,
    tableHead,
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
    customHeadClassesForCells
  } = props;

  // var editButton = index =>
  //   (<Button
  //       simple
  //       className={classes.actionButton}
  //       color="success"  onClick={() => console.log("editButton")}>
  //     {/* <Edit color="secondary" /> */}
  //     edit
  //   </Button>
  // );

  // var deleteButton = index =>
  //   (<Button color="danger"
  //     simple
  //     className={classes.actionButton}
  //     onClick={() => console.log("delete")}>
  //     {/* <Close color="danger" /> */}
  //     delete
  //   </Button>
  // );

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
                  <TableCell className={tableCellClasses} key={key}>
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData &&
            tableData.map((prop, key) => {
              // debugger
              var rowColor = "";
              var rowColored = false;
              if (prop.color !== undefined) {
                rowColor = prop.color;
                rowColored = true;
                prop = prop.data;
              }
              console.log("Keyy", key);
              const tableRowClasses = cx({
                [classes.tableRowHover]: hover,
                [classes[rowColor + "Row"]]: rowColored,
                [classes.tableStripedRow]: striped && key % 2 === 0
              });
              if (prop.role === "Developer") {
                return (
                  <TableRow key={key} hover={hover} className={tableRowClasses}>
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
                      {prop.firstName}
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      colSpan={prop.colspan}
                    >
                      {prop.lastName}
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      colSpan={prop.colspan}
                    >
                      {prop.email}
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      colSpan={prop.colspan}
                    >
                      {prop.status}
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      colSpan={prop.colspan}
                    >
                      {prop.rate}
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      colSpan={prop.colspan}
                    >
                      {prop.rate_unit}
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      colSpan={prop.colspan}
                    >
                      {prop.currency}
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      colSpan={prop.colspan}
                    >
                      <EditButton />
                      <DeleteButton deleteUser={deleteUser} />
                      {/* {editButton}{deleteButton} */}
                    </TableCell>
                  </TableRow>
                );
              } 
              else {
                // console.log('props_data', prop.key)
                return (
                  <TableRow key={prop.key} hover={hover} className={tableRowClasses}>
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
                      {prop.all_customers.customer}
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      colSpan={prop.colspan}
                    >
                      {prop.all_customers.email}
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      colSpan={prop.colspan}
                    >
                      {prop.all_customers.phone}
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      colSpan={prop.colspan}
                    >
                      {prop.all_customers.city}
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      colSpan={prop.colspan}
                    >
                      {prop.all_customers.address}
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      colSpan={prop.colspan}
                    >
                      {prop.all_customers.contact}
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      colSpan={prop.colspan}
                    >
                      {prop.all_customers.zip_code}
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      colSpan={prop.colspan}
                    >
                      {/* {editButton}{deleteButton} */}
                      <EditButton prop={prop} />
                      <DeleteButton asd={prop.key} v={key} deleteUser={deleteUser} />
                    </TableCell>
                  </TableRow>
                );
              }
            })}
        </TableBody>
      </Table>
    </div>
  );
}

class EditButton extends React.Component {
  render() {
    return (
      // <Link to={{ pathname: "customer-form", state: { edit: true } }} prop={this.props.prop} >
        <Button component={Link} to="customer-form" edit= {true} color="success" simple onClick={() => console.log("delete")}>
          <Edit color="success" />
        </Button>
      // </Link>
    );
  }
}

class DeleteButton extends React.Component {
  render() {
    // debugger
    const { asd, v } = this.props;
    console.log("key", asd);
    return (
      <Button color="danger" simple onClick={() => this.props.deleteUser(asd, v)}>
        <Close color="danger" />
        {/* delete */}
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

export default withStyles(tableStyle)(CustomTable);
