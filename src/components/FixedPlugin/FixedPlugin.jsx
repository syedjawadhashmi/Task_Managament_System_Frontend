/*eslint-disable*/
import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import withStyles from "@material-ui/core/styles/withStyles";
import Switch from "@material-ui/core/Switch";

import styles from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import FormControl from "@material-ui/core/FormControl";
import MessageIcon from "@material-ui/icons/MessageRounded";
import CircularProgress from "@material-ui/core/CircularProgress";
import classNames from "classnames";
import profile from "../../assets/img/default-avatar.png";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";

import InputAdornment from "@material-ui/core/InputAdornment";
import EditIcon from "@material-ui/icons/Edit";
import TextField from "@material-ui/core/TextField";
import Button from "components/CustomButtons/Button.jsx";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import firebase from "../../constant/api/firebase";

class FixedPlugin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: "dropdown show",
      bg_checked: true,
      bgImage: this.props.bgImage,
      showImage: true
    };
    // this.handleClick = this.handleClick.bind(this);
  }
  // handleClick() {
  //   this.props.handleFixedClick();
  // }
  // handleChange = name => event => {
  //   switch (name) {
  //     case "miniActive":
  //       this.props.sidebarMinimize();
  //       break;
  //     case "image":
  //       if (event.target.checked) {
  //         this.props.handleImageClick(this.state.bgImage);
  //       } else {
  //         this.props.handleImageClick();
  //       }
  //       this.setState({ showImage: event.target.checked });
  //       break;
  //     default:
  //       break;
  //   }
  // };
  render() {
    const { classes,loading } = this.props;
    return (
      <div
        className={
          "fixed-plugin" + (this.props.rtlActive ? " fixed-plugin-rtl" : "")
        }
      >
        <div id="fixedPluginClasses"  className={this.props.fixedClasses}>
          {/* <div onClick={this.handleClick}>
            <i className="fa fa-cog fa-2x" />
          </div> */}
          <ul className="dropdown-menu">
            <li className="header-title">Comments</li>
            <FormControl id="commentDiv" className={[classes.margin,"commentDiv"]}>
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
                value={this.props.text}
                onChange={this.props.handleInputChange}
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
                      onChange={this.props.handleFileChange}
                    />
                  </label>
                </div>

                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={this.props.handleMessaging}
                  >
                    {!this.props.editComment ? 'Send' : 'Update'}

                    {
                      !this.props.editComment ?
                        <MessageIcon /> : <EditIcon />
                    }
                  </Button>
                </div>

                {this.props.completed < 100 ? (
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

              {this.props.comments
                .slice(0)
                .reverse()
                .map((c, index) => (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                     
                    }}
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src={profile}
                      className={classes.avatar}
                      style={{margin:5}}
                    />
                    <Paper style={{margin:5}} className={classes.root} elevation={1}>
                      <Typography
                        style={{
                          margin: 10,
                          fontSize: 13
                        }}
                        variant="h6"
                        component="h4"
                      >
                        {c.comment.from}
                      </Typography>
                      {c.comment.type.split("/")[0] == "application" ? (
                        <div style={{ margin: 10 }}>
                          <a target="blank" href={c.url}>
                            <img src={PDFIcon} width={100} height={100} />
                          </a>
                        </div>
                      ) : c.comment.type.split("/")[0] == "image" ? (
                        <div style={{ margin: 10 }}>
                          <a href={c.comment.url} target="_blank" > <img src={c.comment.url} width={100} height={100} /></a>
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
                            // onClick={() => this.props.updateComment(c)}
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
                        // onClick={() => this.props.deleteComment(c, index)}
                      >
                        <Close color="danger" />
                      </Button>
                    </Paper>
                  </div>
                ))}
            </FormControl>
          </ul>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(FixedPlugin);
