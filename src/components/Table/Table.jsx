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
          {tableData && tableData.map((prop, key) => {
            var rowColor = "";
            var rowColored = false;
            if (prop.color !== undefined) {
              rowColor = prop.color;
              rowColored = true;
              prop = prop.data;
            }
            console.log('Keyy', key)
            const tableRowClasses = cx({
              [classes.tableRowHover]: hover,
              [classes[rowColor + "Row"]]: rowColored,
              [classes.tableStripedRow]: striped && key % 2 === 0
            });
            if (prop.role === "Developer") {
              return (
                <TableRow key={key} hover={hover} className={tableRowClasses}>
                  <TableCell className={classes.tableCell} colSpan={prop.colspan}>{key}</TableCell>
                  <TableCell className={classes.tableCell} colSpan={prop.colspan}>{prop.firstName}</TableCell>
                  <TableCell className={classes.tableCell} colSpan={prop.colspan}>{prop.lastName}</TableCell>
                  <TableCell className={classes.tableCell} colSpan={prop.colspan}>{prop.email}</TableCell>
                  <TableCell className={classes.tableCell} colSpan={prop.colspan}>{prop.status}</TableCell>
                  <TableCell className={classes.tableCell} colSpan={prop.colspan}>{prop.rate}</TableCell>
                  <TableCell className={classes.tableCell} colSpan={prop.colspan}>{prop.rate_unit}</TableCell>
                  <TableCell className={classes.tableCell} colSpan={prop.colspan}>{prop.currency}</TableCell>
                  <TableCell className={classes.tableCell} colSpan={prop.colspan}>
                    <EditButton/>
                    <DeleteButton deleteUser={deleteUser}/>
                    {/* {editButton}{deleteButton} */}
                   </TableCell>
                </TableRow>
              )
            } else if (prop.role === "Customer") {
              return (
                <TableRow key={key} hover={hover} className={tableRowClasses}>
                  <TableCell className={classes.tableCell} colSpan={prop.colspan}>{key}</TableCell>
                  <TableCell className={classes.tableCell} colSpan={prop.colspan}>{prop.customer}</TableCell>
                  <TableCell className={classes.tableCell} colSpan={prop.colspan}>{prop.email}</TableCell>
                  <TableCell className={classes.tableCell} colSpan={prop.colspan}>{prop.phone}</TableCell>
                  <TableCell className={classes.tableCell} colSpan={prop.colspan}>{prop.city}</TableCell>
                  <TableCell className={classes.tableCell} colSpan={prop.colspan}>{prop.address}</TableCell>
                  <TableCell className={classes.tableCell} colSpan={prop.colspan}>{prop.contact}</TableCell>
                  <TableCell className={classes.tableCell} colSpan={prop.colspan}>{prop.zip_code}</TableCell>
                  <TableCell className={classes.tableCell} colSpan={prop.colspan}>
                    {/* {editButton}{deleteButton} */}
                    <EditButton/>
                    <DeleteButton key={key} deleteUser={deleteUser}/>
                  </TableCell>
                </TableRow>
              )
            }
          })
          }
        </TableBody>
      </Table>
    </div>
  );
}

class EditButton extends React.Component {
  render(){
    return(
      <Button color="success"
        simple
          onClick={() => console.log("delete")}>
        <Edit color="success" />
      </Button>
    )
  }
}

class DeleteButton extends React.Component {
  render(){
    const { key } = this.props;
    console.log('key', key)
    return(
      <Button color="danger"
        simple
        onClick={() => this.props.deleteUser(key)}>
        <Close color="danger" />
        {/* delete */}
      </Button>
    )
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
  tableData: PropTypes.array,
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
