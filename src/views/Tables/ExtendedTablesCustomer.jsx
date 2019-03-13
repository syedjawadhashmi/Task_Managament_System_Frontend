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
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
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
    <GridContainer>
      <GridItem xs={12}>
        <Card>
          <CardBody>
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
                            {prop.all_customers.customer}
                          </TableCell>
                          <TableCell
                            className={classes.tableCell}
                            colSpan={prop.colspan}
                          >
                            {prop.all_customers.email}
                          </TableCell>
                          {/*   */}
                          <TableCell
                            className={classes.tableCell}
                            colSpan={prop.colspan}
                          >
                            {prop.all_customers.type}
                          </TableCell>
                          <TableCell
                            className={classes.tableCell}
                            colSpan={prop.colspan}
                          >
                            {prop.all_customers.status}
                          </TableCell>
                          <TableCell
                            className={classes.tableCell}
                            colSpan={prop.colspan}
                          >
                            <EditButton
                              _route={"customer-form"}
                              _param={prop}
                            />
                            <DeleteButton
                              asd={prop.key}
                              v={key}
                              deleteUser={deleteUser}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </div>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

class EditButton extends React.Component {
  render() {
    const { _param, _route } = this.props;
    console.log("parm", _param);
    return (
      <Link
        to={{
          pathname: _route,
          state: {
            _param
          }
        }}
      >
        <Button edit={true} color="success" simple>
          <Edit color="success" />
        </Button>
      </Link>
    );
  }
}

class DeleteButton extends React.Component {
  render() {
    // debugger
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

export default withStyles(tableStyle)(CustomTable);
