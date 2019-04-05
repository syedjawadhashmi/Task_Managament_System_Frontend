import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import EditIcon from "@material-ui/icons/Edit";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import MessageIcon from "@material-ui/icons/MessageRounded";
import CircularProgress from "@material-ui/core/CircularProgress";
import classNames from "classnames";
import profile from "../../assets/img/default-avatar.png";
import PDFIcon from "../../assets/img/pdficon.png";

import PropTypes from "prop-types";
const styles = theme => ({});
class Comments extends React.Component {
  state = {
    right: false
  };
  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };
  render() {
    const { draweropen, classes, handleClose, loading } = this.props;
    const sideList = (
      <div className={[classes.list]}>
      <div className="header-title commentDiv">Comments</div>
        <FormControl className={[classes.margin,"commentDiv"]}>
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
                {!this.props.editComment ? "Send" : "Update"}

                {!this.props.editComment ? <MessageIcon /> : <EditIcon />}
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
                  flexDirection: "row"
                }}
              >
                <Avatar
                  alt="Remy Sharp"
                  src={profile}
                  className={classes.avatar}
                  style={{ margin: 5 }}
                />
                <Paper
                  style={{ margin: 5 }}
                  className={classes.root}
                  elevation={1}
                >
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
                      <a href={c.comment.url} target="_blank">
                        {" "}
                        <img src={c.comment.url} width={100} height={100} />
                      </a>
                    </div>
                  ) : (
                    <Typography style={{ margin: 10 }} component="p">
                      {c.comment.text}
                    </Typography>
                  )}
                  <Typography style={{ margin: 10, fontSize: 9 }} component="p">
                    {Date(c.comment.createdAt)}
                  </Typography>

                  {c.comment.type == "text" ? (
                    <Button
                      edit={true}
                      color="success"
                      onClick={() => this.props.updateComment(c)}
                      simple
                    >
                      <Edit color="success" />
                    </Button>
                  ) : null}

                  <Button
                    color="danger"
                    simple
                    onClick={() => this.props.deleteComment(c, index)}
                  >
                    <Close color="danger" />
                  </Button>
                </Paper>
              </div>
            ))}
        </FormControl>
      </div>
    );

    return (
      <Drawer anchor="right" open={draweropen} onClose={handleClose}>
        <div
          tabIndex={0}
          role="button"
          // // onClick={handleClose}
          // onKeyDown={handleClose}
        >
          {sideList}
        </div>
      </Drawer>
    );
  }
}
Comments.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Comments);
