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
import { Add } from '@material-ui/icons';
import tableStyle from "assets/jss/material-dashboard-pro-react/components/tableStyle";
import { Link } from "react-router-dom";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CustomInput from 'components/CustomInput/CustomInput.jsx';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

class ExtendedTablesCustomer extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      name: '',
      email: '',
      password: '',
      type: '',
      status: '',
      edit_mode: false
    }
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  };

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  handleTypeChange = (e) => {
    this.setState({ type: e.target.value });
  };

  handleStatusChange = (e) => {
    this.setState({ status: e.target.value });
  };

  editUser = () => {
    this.setState({
      edit_mode: true
    })
  }

  render() {
    const {
      classes,
      tableHead,
      tableData,
      tableHeaderColor,
      hover,
      deleteUser,
      addUser,
      colorsColls,
      coloredColls,
      customCellClasses,
      customClassesForCells,
      striped,
      tableShopping,
      customHeadCellClasses,
      customHeadClassesForCells
    } = this.props;

    const {
      name,
      email,
      password,
      type,
      status
    } = this.state;

    console.log('ddd', tableData)

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
                      <TableRow className={classes.tableRow}>
                        <TableCell>
                        </TableCell>
                        <TableCell>
                          <CustomInput
                            labelText="Name *"
                            // id="registeremail"
                            formControlProps={{
                              fullWidth: true
                            }}
                            onChange={this.handleNameChange}
                            value={name}
                            inputProps={{
                              type: 'name'
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <CustomInput
                            labelText="Email*"
                            // id="registeremail"
                            formControlProps={{
                              fullWidth: true
                            }}
                            onChange={this.handleEmailChange}
                            value={email}
                            inputProps={{
                              type: 'email'
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <CustomInput
                            labelText="Password*"
                            // id="registeremail"
                            formControlProps={{
                              fullWidth: true
                            }}
                            onChange={this.handlePasswordChange}
                            value={password}
                            inputProps={{
                              type: 'password'
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Select
                            value={type}
                            onChange={this.handleTypeChange}
                            inputProps={{
                              name: 'age',
                              id: 'age-simple',
                            }}
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value={'Consultant'}>Consultant</MenuItem>
                            <MenuItem value={'Product Owner'}>Product Owner</MenuItem>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Select
                            value={status}
                            onChange={this.handleStatusChange}
                            inputProps={{
                              name: 'age',
                              id: 'age-simple',
                            }}
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value={'Active'}>Active</MenuItem>
                            <MenuItem value={'Suspended'}>Suspended</MenuItem>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <AddButton
                            user={this.state}
                            addUser={addUser} />
                        </TableCell>
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
                              {
                                !this.state.edit_mode ?
                                  prop.all_customers.name
                                  :
                                  <CustomInput
                                    labelText="Name *"
                                    // id="registeremail"
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                    onChange={this.handleNameChange}
                                    value={prop.all_customers.name}
                                    inputProps={{
                                      type: 'name'
                                    }}
                                  />
                              }

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
                            </TableCell>
                            {/*   */}
                            <TableCell
                              className={classes.tableCell}
                              colSpan={prop.colspan}
                            >
                              {
                                !this.state.edit_mode ?
                                  prop.all_customers.type
                                  :
                                  <Select
                                    value={prop.all_customers.type}
                                    onChange={this.handleTypeChange}
                                    inputProps={{
                                      name: 'age',
                                      id: 'age-simple',
                                    }}
                                  >
                                    <MenuItem value="">
                                      <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'Consultant'}>Consultant</MenuItem>
                                    <MenuItem value={'Product Owner'}>Product Owner</MenuItem>
                                  </Select>
                              }
                            </TableCell>
                            <TableCell
                              className={classes.tableCell}
                              colSpan={prop.colspan}
                            >
                              {
                                !this.state.edit_mode ?
                                  prop.all_customers.status
                                  :
                                  <Select
                                    value={prop.all_customers.status}
                                    onChange={this.handleStatusChange}
                                    inputProps={{
                                      name: 'age',
                                      id: 'age-simple',
                                    }}
                                  >
                                    <MenuItem value="">
                                      <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'Active'}>Active</MenuItem>
                                    <MenuItem value={'Suspended'}>Suspended</MenuItem>
                                  </Select>
                              }
                            </TableCell>
                            <TableCell
                              className={classes.tableCell}
                              colSpan={prop.colspan}
                            >
                              <Button
                                edit={true}
                                color="success"
                                onClick={this.editUser}
                                simple>
                                <Edit color="success" />
                              </Button>
                              {/* <EditButton
                                _route={"customer-form"}
                                _param={prop}
                              /> */}
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

class AddButton extends React.Component {
  render() {
    // debugger
    const { user } = this.props;
    console.log("user", user);
    return (
      <Button
        color="danger"
        simple
        onClick={() => this.props.addUser(user)}
      >
        <Add color="success" />

      </Button>
    );
  }
}

ExtendedTablesCustomer.defaultProps = {
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

ExtendedTablesCustomer.propTypes = {
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

export default withStyles(tableStyle)(ExtendedTablesCustomer);
