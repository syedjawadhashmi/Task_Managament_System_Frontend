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
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        // this.setState({ open: false });
        this.props.handleClose()
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const { classes, open } = this.props
        return (
            <div>
                <Dialog
                    open={open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
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
                                    Age
                            </InputLabel>
                                <Select
                                    value={this.state.age}
                                    onChange={this.handleChange('age')}
                                    input={
                                        <OutlinedInput
                                            labelWidth={25}
                                            name="age"
                                            id="outlined-age-simple"
                                        />
                                    }
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
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
                                    Age
                            </InputLabel>
                                <Select
                                    value={this.state.age}
                                    onChange={this.handleChange}
                                    input={
                                        <OutlinedInput
                                            labelWidth={25}
                                            name="age"
                                            id="outlined-age-simple"
                                        />
                                    }
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <div>
                            <TextField
                                id="outlined-full-width"
                                label="Label"
                                style={{ margin: 8, minWidth: 350 }}
                                placeholder="Placeholder"
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
                                    Age
                            </InputLabel>
                                <Select
                                    value={this.state.age}
                                    onChange={this.handleChange}
                                    input={
                                        <OutlinedInput
                                            labelWidth={25}
                                            name="age"
                                            id="outlined-age-simple"
                                        />
                                    }
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <div>
                            <TextField
                                disabled
                                style={{ margin: 8, minWidth: 350 }}
                                id="outlined-disabled"
                                label="Disabled"
                                defaultValue="Hello World"
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
                                    Age
                            </InputLabel>
                                <Select
                                    value={this.state.age}
                                    onChange={this.handleChange}
                                    input={
                                        <OutlinedInput
                                            labelWidth={25}
                                            name="age"
                                            id="outlined-age-simple"
                                        />
                                    }
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
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
                                    Age
                            </InputLabel>
                                <Select
                                    value={this.state.age}
                                    onChange={this.handleChange}
                                    input={
                                        <OutlinedInput
                                            labelWidth={25}
                                            name="age"
                                            id="outlined-age-simple"
                                        />
                                    }
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <div>
                            <TextField
                                style={{ margin: 8, minWidth: 350 }}
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
                                label="Disabled"
                                defaultValue="Hello World"
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
                                label="Deadline"
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
                                label="Deadline"
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
                                    Age
                            </InputLabel>
                                <Select
                                    value={this.state.age}
                                    onChange={this.handleChange}
                                    input={
                                        <OutlinedInput
                                            labelWidth={25}
                                            name="age"
                                            id="outlined-age-simple"
                                        />
                                    }
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <div>
                            <TextField
                                style={{ margin: 8, minWidth: 350 }}
                                id="outlined-disabled"
                                type="number"
                                label="Deadline"
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
                                label="Deadline"
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
                                label="Deadline"
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
                                label="Deadline"
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
                                    Age
                            </InputLabel>
                                <Select
                                    value={this.state.age}
                                    onChange={this.handleChange}
                                    input={
                                        <OutlinedInput
                                            labelWidth={25}
                                            name="age"
                                            id="outlined-age-simple"
                                        />
                                    }
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <div>
                            <TextField
                                style={{ margin: 8, minWidth: 350 }}
                                id="outlined-disabled"
                                type="number"
                                label="Deadline"
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
                                label="Deadline"
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
                        <Button onClick={this.handleClose} color="primary">
                            Subscribe
            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}


export default withStyles(styles)(AddTask);