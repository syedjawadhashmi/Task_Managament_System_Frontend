/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import firebase from "../../constant/api/firebase";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "components/CustomButtons/Button.jsx";
import Edit from "@material-ui/icons/Edit";
import Check from "@material-ui/icons/Check";
import Close from "@material-ui/icons/Close";
import { Add } from "@material-ui/icons";
import tableStyle from "assets/jss/material-dashboard-pro-react/components/tableStyle";
import { Link } from "react-router-dom";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";

class ExtendedTablesCustomer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      type: "",
      status: "",
      allcustomers: [],
      users: []
    };
    this.deleteCustomer = this.deleteCustomer.bind(this);
  }
  componentDidMount() {
    // firebase
    //   .database()
    //   .ref("Users")
    //   .on("child_added", customer => {
    //     let currentpost = this.state.allcustomers;
    //     let obj = {
    //       all_customers: customer.val(),
    //       key: customer.key
    //     };
    //     currentpost.push(obj);
    //     this.setState({
    //       allcustomers: currentpost,
    //       posts: ""
    //     });
    //   });
  }
  handleNameChange = e => {
    this.setState({ name: e.target.value });
  };
  handleEditNameChange = e => {
    this.setState({ editname: e.target.value });
  };

  handleEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  handleTypeChange = e => {
    this.setState({ type: e.target.value });
  };
  handleEditTypeChange = e => {
    this.setState({ edittype: e.target.value });
  };

  handleStatusChange = e => {
    this.setState({ status: e.target.value });
  };
  handleEditStatusChange = e => {
    this.setState({ editstatus: e.target.value });
  };

  // editUser = () => {
  //   this.setState({
  //     editing: true
  //   });
  // };
  edit = (id, values) => {
    this.setState(prevState => {
      // you shouldn't mutate, this is just an example.
      prevState.data[id] = values;
      return prevState;
    });
  };
  editUser = userObj => {
    console.log("update keyy", userObj);

    this.setState({
      editing: userObj.key
    });
  };
  updateUser = UserObj => {
    debugger;
    const { editname, edittype, editstatus } = this.state;
    // firebase
    //   .database()
    //   .ref("Users/" + UserObj.key)
    //   .update({
    //     name: editname,
    //     type: edittype,
    //     status: editstatus
    //   })
    //   .then(() => {
    //     alert("user updated successfully");
    //     this.setState({
    //       allcustomers: []
    //     });
    //     firebase
    //       .database()
    //       .ref("Users")
    //       .on("child_added", customer => {
    //         let currentpost = this.state.allcustomers;

    //         let obj = {
    //           all_customers: customer.val(),
    //           key: customer.key
    //         };

    //         currentpost.push(obj);
    //         this.setState({
    //           allcustomers: currentpost,
    //           posts: ""
    //         });
    //       });
    //   })
    //   .catch(error => {
    //     alert(error);
    //   });
    // this.setState({
    //   editing: "",
    //   editname: "",
    //   edittype: "",
    //   editstatus: ""
    // });
  };
  deleteCustomer(key, index) {
    console.log("key", key, index);
    let customers = this.state.allcustomers.splice(index, 1);
    if (customers.length == 1) {
      customers = [];
    }
    this.setState({
      allcustomers: customers
    });
    this.state.allcustomers.splice(index, 1)
    let fetchpost = this.state.allcustomers;
    firebase
      .database()
      .ref("Users")
      .child(key)
      .remove()
      .then(() => {
        fetchpost.splice(index, 1);
        this.setState({
          allcustomers: fetchpost
        });
        this.setState({
          allcustomers: []
        });
        firebase
          .database()
          .ref("Users")
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
      });
  }
  addProductOwnerOrConsultant = userObj => {
    // e.preventDefault();
    let key = 0;
    const { name, email, password, type, status } = userObj;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        var userId = firebase.auth().currentUser.uid;
        var user = firebase.auth().currentUser;
        console.log("user", user);
        const ref = firebase
          .database()
          .ref(`Users/`)
          .push();
        ref
          .set({
            uid: userId,
            name: name,
            email: email,
            type: type,
            status: status
          })
          .then(res => {
            // debugger;
          })
          .catch(error => {
            // debugger;
            console.log("Error during user creating on firebase", error);
          });
        alert("Add Registered Successfully");
        this.setState({
          name: "",
          email: "",
          password: "",
          type: "",
          state: ""
          //   allcustomers: []
        });

        ++key;

        let currentpost = this.state.allcustomers;

        let obj = {
          all_customers: userObj,
          key: key
        };

        currentpost.push(obj);
        this.setState({
          allcustomers: currentpost,
          posts: ""
        });
        let allusers = [];

        this.state.allcustomers.map(cust => {
          allusers.push(cust.all_customers);
        });
        this.props.onAdd(allusers);
      })
      .catch(error => {
        alert(error);
      });
  };

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
      status,
      editrow,
      allcustomers
    } = this.state;

    let userObj = {
      name: name,
      email: email,
      password: password,
      type: type,
      status: status
    };

    // console.log("ddd", this.state.users);
    // editrow = tableData;

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
                      <TableRow className={[classes.tableRow]}>
                        <TableCell className={classes.tableCell}>0</TableCell>
                        <TableCell className={classes.tableCell}>
                          <CustomInput
                            labelText="Name *"
                            // id="registeremail"
                            formControlProps={{
                              fullWidth: true
                            }}
                            onChange={this.handleNameChange}
                            value={name}
                            inputProps={{
                              type: "name"
                            }}
                          />
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          <CustomInput
                            labelText="Email*"
                            // id="registeremail"
                            formControlProps={{
                              fullWidth: true
                            }}
                            onChange={this.handleEmailChange}
                            value={email}
                            inputProps={{
                              type: "email"
                            }}
                          />
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          <CustomInput
                            labelText="Password*"
                            // id="registeremail"
                            formControlProps={{
                              fullWidth: true
                            }}
                            onChange={this.handlePasswordChange}
                            value={password}
                            inputProps={{
                              type: "password"
                            }}
                          />
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          <Select
                            value={type}
                            onChange={this.handleTypeChange}
                            inputProps={{
                              name: "age",
                              id: "age-simple"
                            }}
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value={"Consultant"}>Consultant</MenuItem>
                            <MenuItem value={"Product Owner"}>
                              Product Owner
                            </MenuItem>
                          </Select>
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          <Select
                            value={status}
                            onChange={this.handleStatusChange}
                            inputProps={{
                              name: "age",
                              id: "age-simple"
                            }}
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value={"Active"}>Active</MenuItem>
                            <MenuItem value={"Suspended"}>Suspended</MenuItem>
                          </Select>
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          <Button
                            color="danger"
                            simple
                            onClick={() =>
                              this.addProductOwnerOrConsultant(userObj)
                            }
                          >
                            <Add color="success" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                  ) : null}
                  <TableBody>
                    {allcustomers &&
                      allcustomers.map((prop, key) => {
                        // debugger
                        var rowColor = "";
                        var rowColored = false;
                        if (prop.color !== undefined) {
                          rowColor = prop.color;
                          rowColored = true;
                          prop = prop.data;
                        }
                        // const row = prop.all_customers[key];
                        // console.log("Keyy", row);
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
                              {!(this.state.editing == prop.key) ? (
                                prop.all_customers.name
                              ) : (
                                <CustomInput
                                  labelText="Name *"
                                  // id="registeremail"
                                  formControlProps={{
                                    fullWidth: true
                                  }}
                                  de
                                  // labelText={prop.all_customers.name}
                                  onChange={this.handleEditNameChange}
                                  value={this.state.editname}
                                  inputProps={{
                                    type: "name"
                                  }}
                                />
                              )}
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
                              *****
                            </TableCell>
                            <TableCell
                              className={classes.tableCell}
                              colSpan={prop.colspan}
                            >
                              {!(this.state.editing == prop.key) ? (
                                prop.all_customers.type
                              ) : (
                                <Select
                                  value={this.state.edittype}
                                  displayEmpty={prop.all_customers.type}
                                  onChange={this.handleEditTypeChange}
                                  inputProps={{
                                    name: "age",
                                    id: "age-simple"
                                  }}
                                >
                                  <MenuItem value="" disabled>
                                    <em>{prop.all_customers.type}</em>
                                  </MenuItem>
                                  <MenuItem value={"Consultant"}>
                                    Consultant
                                  </MenuItem>
                                  <MenuItem value={"Product Owner"}>
                                    Product Owner
                                  </MenuItem>
                                </Select>
                              )}
                            </TableCell>
                            <TableCell
                              className={classes.tableCell}
                              colSpan={prop.colspan}
                            >
                              {!(this.state.editing == prop.key) ? (
                                prop.all_customers.status
                              ) : (
                                <Select
                                  value={this.state.editstatus}
                                  displayEmpty={prop.all_customers.status}
                                  onChange={this.handleEditStatusChange}
                                  inputProps={{
                                    name: "age",
                                    id: "age-simple"
                                  }}
                                >
                                  <MenuItem value="" disabled>
                                    <em>{prop.all_customers.status}</em>
                                  </MenuItem>
                                  <MenuItem value={"Active"}>Active</MenuItem>
                                  <MenuItem value={"Suspended"}>
                                    Suspended
                                  </MenuItem>
                                </Select>
                              )}
                            </TableCell>
                            <TableCell
                              className={classes.tableCell}
                              colSpan={prop.colspan}
                            >
                              {/* {!(this.state.editing == prop.key) ? (
                                <Button
                                  edit={true}
                                  color="success"
                                  onClick={() => this.editUser(prop)}
                                  simple
                                >
                                  <Edit color="success" />
                                </Button>
                              ) : (
                                <Button
                                  edit={true}
                                  color="success"
                                  onClick={() => this.updateUser(prop)}
                                  simple
                                >
                                  <Check color="success" />
                                </Button>
                              )} */}
                              {/* <EditButton
                                _route={"customer-form"}
                                _param={prop}
                              /> */}
                              <Button
                                color="danger"
                                simple
                                onClick={() =>
                                  this.deleteCustomer(prop.key, key)
                                }
                              >
                                <Close color="danger" />
                              </Button>
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
      <Button color="danger" simple onClick={() => this.props.addUser(user)}>
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
