import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';

import firebase from "../../constant/api/firebase";


const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 350,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});

class AddTask extends React.Component {
    state = {
        open: false,
        projects: [],
        developers: [],
        lastUpdated: Date.now(),
        assigned: 'developer@gmail.com',
        customer: 'customer@hotmain.com',
        number: 'ABC123'
    };

    componentDidMount() {
        this.getProjects()
        this.getDevelopers()
    }

    snapshotToArray = snapshot => Object.entries(snapshot).map(e => Object.assign(e[1], { id: e[0] }));


    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        // this.setState({ open: false });
        this.props.handleClose()
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleAddTask = () => {
        console.log('payload', this.state);
        const { ticketSummary, status, number, lastUpdated, assigned, devName, priority, deadline, customer,
            ProjectCode, category, est_dev_efforts, act_dev_efforts, rate_unit_dev, dev_efforts_amt, dev_paid_on,
            est_cus_efforts, act_cus_efforts, rate_unit_cus, cus_efforts_amt, cus_paid_on
        } = this.state;

        const taskPayload = {
            ticketSummary,
            status,
            number,
            lastUpdated,
            assigned,
            devName,
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
        }

        const ref = firebase.database().ref("Tasks/");
        ref.push(taskPayload)
            .then(res => {
                this.setState({ open: false });
                alert('Task added successfuly')
            })
            .catch(error => {
                this.setState({ open: false });
                alert("Error during user creating on firebase", error);
            });
    };

    getProjects() {
        firebase
            .database()
            .ref("Projects")
            .on("value", data => {
                if (data.val()) {
                    let projects = this.snapshotToArray(data.val())
                    this.setState({ projects })
                }
            });
    }

    getDevelopers() {
        firebase
            .database()
            .ref("Developer")
            .on("value", data => {
                if (data.val()) {
                    let developers = this.snapshotToArray(data.val())
                    this.setState({ developers })
                }
            });
    }

    render() {
        const { classes, open } = this.props
        const { projects, developers } = this.state
        debugger

        return (
            <div>
                <Dialog
                    open={open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Add Task</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Pleas fill the below field to create a task
                        </DialogContentText>

                        <div>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel
                                    ref={ref => {
                                        this.InputLabelRef = ref;
                                    }}
                                    htmlFor="outlined-age-simple"
                                >
                                    Project Code
                            </InputLabel>
                                <Select
                                    value={this.state.ProjectCode}
                                    onChange={this.handleChange}
                                    input={
                                        <OutlinedInput
                                            labelWidth={100}
                                            name="ProjectCode"
                                            id="outlined-age-simple"
                                        />
                                    }
                                >
                                    {
                                        projects.map(x => {
                                            return (
                                                <MenuItem value={x.ProjectCode}>{x.ProjectCode}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </div>

                        <div>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel
                                    ref={ref => {
                                        this.InputLabelRef = ref;
                                    }}
                                    htmlFor="outlined-age-simple"
                                >
                                    Category
                            </InputLabel>
                                <Select
                                    value={this.state.category}
                                    onChange={this.handleChange}
                                    input={
                                        <OutlinedInput
                                            labelWidth={50}
                                            name="category"
                                            id="outlined-age-simple"
                                        />
                                    }
                                >
                                    <MenuItem value={'Dev'}>Dev</MenuItem>
                                    <MenuItem value={'Support'}>Support</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <div>
                            <TextField
                                id="outlined-full-width"
                                label="Label"
                                style={{ margin: 8, minWidth: 350 }}
                                name="ticketSummary"
                                onChange={this.handleChange}
                                placeholder="TicketSummary"
                                margin="normal"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>

                        <div>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel
                                    ref={ref => {
                                        this.InputLabelRef = ref;
                                    }}
                                    htmlFor="outlined-age-simple"
                                >
                                    Status
                            </InputLabel>
                                <Select
                                    value={this.state.status}
                                    onChange={this.handleChange}
                                    input={
                                        <OutlinedInput
                                            labelWidth={25}
                                            name="status"
                                            id="outlined-age-simple"
                                        />
                                    }
                                >
                                    <MenuItem value={'Open'}>Open</MenuItem>
                                    <MenuItem value={'Close'}>Close</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <div>
                            <TextField
                                disabled
                                style={{ margin: 8, minWidth: 350 }}
                                id="outlined-disabled"
                                name="number"
                                onChange={this.handleChange}
                                label="Disabled"
                                defaultValue={this.state.number}
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                            />
                        </div>

                        <div>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel
                                    ref={ref => {
                                        this.InputLabelRef = ref;
                                    }}
                                    htmlFor="outlined-age-simple"
                                >
                                    Assigned
                            </InputLabel>
                                <Select
                                    value={this.state.devName}
                                    onChange={this.handleChange}
                                    input={
                                        <OutlinedInput
                                            labelWidth={25}
                                            name="devName"
                                            id="outlined-age-simple"
                                        />
                                    }
                                >
                                    {
                                        developers.map(x => {
                                            return (
                                                <MenuItem value={x.name}>{x.name}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </div>

                        <div>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel
                                    ref={ref => {
                                        this.InputLabelRef = ref;
                                    }}
                                    htmlFor="outlined-age-simple"
                                >
                                    Priority
                            </InputLabel>
                                <Select
                                    value={this.state.priority}
                                    onChange={this.handleChange}
                                    input={
                                        <OutlinedInput
                                            labelWidth={25}
                                            name="priority"
                                            id="outlined-age-simple"
                                        />
                                    }
                                >
                                    <MenuItem value={'High'}>High</MenuItem>
                                    <MenuItem value={'Medium'}>Medium</MenuItem>
                                    <MenuItem value={'Low'}>Low</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <div>
                            <TextField
                                style={{ margin: 8, minWidth: 350 }}
                                onChange={this.handleChange}
                                name="deadline"
                                id="outlined-disabled"
                                type="date"
                                label="Deadline"
                                defaultValue="2017-05-24"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                            />
                        </div>

                        <div>
                            <TextField
                                disabled
                                style={{ margin: 8, minWidth: 350 }}
                                id="outlined-disabled"
                                label="Customer"
                                defaultValue="Customer"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                            />
                        </div>

                        <div>
                            <TextField
                                style={{ margin: 8, minWidth: 350 }}
                                id="outlined-disabled"
                                type="number"
                                name="est_dev_efforts"
                                onChange={this.handleChange}
                                label="Estimated Developer Effort"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                            />
                        </div>

                        <div>
                            <TextField
                                style={{ margin: 8, minWidth: 350 }}
                                id="outlined-disabled"
                                type="number"
                                name="act_dev_efforts"
                                onChange={this.handleChange}
                                label="Actual Developer Effort"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                            />
                        </div>

                        <div>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel
                                    ref={ref => {
                                        this.InputLabelRef = ref;
                                    }}
                                    htmlFor="outlined-age-simple"
                                >
                                    Rate Unit
                            </InputLabel>
                                <Select
                                    value={this.state.rate_unit_dev}
                                    onChange={this.handleChange}
                                    input={
                                        <OutlinedInput
                                            labelWidth={25}
                                            name="rate_unit_dev"
                                            id="outlined-age-simple"
                                        />
                                    }
                                >
                                    <MenuItem value={'Hourly'}>Hourly</MenuItem>
                                    <MenuItem value={'Daily'}>Daily</MenuItem>
                                    <MenuItem value={'Weekly'}>Weekly</MenuItem>
                                    <MenuItem value={'Monthly'}>Monthly</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <div>
                            <TextField
                                style={{ margin: 8, minWidth: 350 }}
                                id="outlined-disabled"
                                type="number"
                                name="dev_efforts_amt"
                                onChange={this.handleChange}
                                label="Developer Effort Amount"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                            />
                        </div>

                        <div>
                            <TextField
                                style={{ margin: 8, minWidth: 350 }}
                                id="outlined-disabled"
                                type="date"
                                name="dev_paid_on"
                                onChange={this.handleChange}
                                label="Developer Paid On"
                                defaultValue="2017-05-24"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                            />
                        </div>

                        <div>
                            <TextField
                                style={{ margin: 8, minWidth: 350 }}
                                id="outlined-disabled"
                                type="number"
                                name="est_cus_efforts"
                                onChange={this.handleChange}
                                label="Efforts Estimated to Customer"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                            />
                        </div>

                        <div>
                            <TextField
                                style={{ margin: 8, minWidth: 350 }}
                                id="outlined-disabled"
                                type="number"
                                name="act_cus_efforts"
                                onChange={this.handleChange}
                                label="Efforts Adjusted to Customer"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                            />
                        </div>

                        <div>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel
                                    ref={ref => {
                                        this.InputLabelRef = ref;
                                    }}
                                    htmlFor="outlined-age-simple"
                                >
                                    Rate Unit
                            </InputLabel>
                                <Select
                                    value={this.state.rate_unit_cus}
                                    onChange={this.handleChange}
                                    input={
                                        <OutlinedInput
                                            labelWidth={25}
                                            name="rate_unit_cus"
                                            id="outlined-age-simple"
                                        />
                                    }
                                >
                                    <MenuItem value={'Hourly'}>Hourly</MenuItem>
                                    <MenuItem value={'Daily'}>Daily</MenuItem>
                                    <MenuItem value={'Weekly'}>Weekly</MenuItem>
                                    <MenuItem value={'Monthly'}>Monthly</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <div>
                            <TextField
                                style={{ margin: 8, minWidth: 350 }}
                                id="outlined-disabled"
                                type="number"
                                name="cus_efforts_amt"
                                onChange={this.handleChange}
                                label="To Invoice Amount"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                            />
                        </div>

                        <div>
                            <TextField
                                style={{ margin: 8, minWidth: 350 }}
                                id="outlined-disabled"
                                type="date"
                                name="cus_paid_on"
                                onChange={this.handleChange}
                                label="Paid by Customer On"
                                defaultValue="2017-05-24"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                            />
                        </div>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleAddTask} color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}


export default withStyles(styles)(AddTask);