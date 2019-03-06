import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import Icon from '@material-ui/core/Icon';
import FormControl from '@material-ui/core/FormControl';
import InputBase from '@material-ui/core/InputBase';
import Avatar from '@material-ui/core/Avatar';
import profile from '../../assets/img/faces/avatar.jpg'
const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});
const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit,
  },
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
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Project' },
  { id: 'calories', numeric: true, disablePadding: false, label: 'Category' },
  { id: 'fat', numeric: true, disablePadding: false, label: 'Total Summary' },
  { id: 'carbs', numeric: true, disablePadding: false, label: 'Status' },
  { id: 'protein', numeric: true, disablePadding: false, label: 'Last Updated' },
  { id: 'protein', numeric: true, disablePadding: false, label: 'Assigned' },
  { id: 'fat', numeric: true, disablePadding: false, label: 'Priority' },
  // { id: 'fat', numeric: true, disablePadding: false, label: 'Deadline' },
  // { id: 'carbs', numeric: true, disablePadding: false, label: 'Customer' },
  // { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

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
                align={row.numeric ? 'right' : 'left'}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
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
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes, handleClickOpen } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
            <Button variant="contained" color="primary" id="tableTitle" className={classes.button}>
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
  handleClickOpen: PropTypes.func.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  bootstrapInput: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    width: '500px',
    height: '50px',
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
  bootstrapFormLabel: {
    fontSize: 18,
  },
  avatar: {
    margin: 10,
    marginTop: 25
  },
});

class Tables extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'calories',
    open: false,
    selected: [],
    data: [
      createData('Cupcake', <span style={{ color: 'white', fontSize: 10, backgroundColor: 'grey', padding: 2 }}>agent created</span>, 3.7, 67, 4.3, 305, 3.7, 67, 4.3),
      createData('Donut', <span style={{ color: 'white', fontSize: 10, backgroundColor: 'grey', padding: 2 }}>agent created</span>, 25.0, 51, 4.9),
      createData('Eclair', <span style={{ color: 'white', fontSize: 10, backgroundColor: 'grey', padding: 2 }}>agent created</span>, 16.0, 24, 6.0),
      createData('Frozen yoghurt', <span style={{ color: 'white', fontSize: 10, backgroundColor: 'grey', padding: 2 }}>agent created</span>, 6.0, 24, 4.0),
      createData('Gingerbread', <span style={{ color: 'white', fontSize: 10, backgroundColor: 'grey', padding: 2 }}>agent created</span>, 16.0, 49, 3.9),
      createData('Honeycomb', <span style={{ color: 'white', fontSize: 10, backgroundColor: 'grey', padding: 2 }}>agent created</span>, 3.2, 87, 6.5),
      createData('Ice cream sandwich', <span style={{ color: 'white', fontSize: 10, backgroundColor: 'grey', padding: 2 }}>agent created</span>, 9.0, 37, 4.3),
      createData('Jelly Bean', <span style={{ color: 'white', fontSize: 10, backgroundColor: 'grey', padding: 2 }}>agent created</span>, 0.0, 94, 0.0),
      createData('KitKat', <span style={{ color: 'white', fontSize: 10, backgroundColor: 'grey', padding: 2 }}>agent created</span>, 26.0, 65, 7.0),
      createData('Lollipop', 392, <div><span>mandal</span><span>agent created</span></div>, 98, 0.0),
      createData('Marshmallow', <span style={{ color: 'white', fontSize: 10, backgroundColor: 'grey', padding: 2 }}>agent created</span>, 0, 81, 2.0),
      createData('Nougat', <span style={{ color: 'white', fontSize: 10, backgroundColor: 'grey', padding: 2 }}>agent created</span>, 19.0, 9, 37.0),
      createData('Oreo', <span style={{ color: 'white', fontSize: 10, backgroundColor: 'grey', padding: 2 }}>agent created</span>, 18.0, 63, 4.0),
    ],
    page: 0,
    rowsPerPage: 5,
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
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
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar handleClickOpen={this.handleClickOpen} numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      onClick={this.handleClickOpen}
                      // onClick={event => this.handleClick(event, n.id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {n.name}
                      </TableCell>
                      <TableCell align="right">{n.calories}</TableCell>
                      <TableCell align="right">{n.fat}</TableCell>
                      <TableCell align="right">{n.carbs}</TableCell>
                      <TableCell align="right">{n.carbs}</TableCell>
                      <TableCell align="right">{n.carbs}</TableCell>
                      {/* <TableCell align="right">{n.carbs}</TableCell>
                      <TableCell align="right">{n.carbs}</TableCell>
                      <TableCell align="right">{n.carbs}</TableCell> */}
                      <TableCell align="right">{n.protein}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            <Icon style={{ paddingTop: 5 }}>comment</Icon>Comments
            <p style={{ fontSize: 'x-small' }}>Hawaji Tourism</p>
          </DialogTitle>
          <DialogContent>
            <FormControl className={classes.margin}>
              <InputBase
                id="bootstrap-input"
                placeholder={"Enter your comments here, and @mention people to grab their attention."}
                defaultValue=""
                classes={{
                  root: classes.bootstrapRoot,
                  input: classes.bootstrapInput,
                }}
              />
              <div style={{ backgroundColor: '#eee', color: 'rgb(180, 182, 187)', padding: 5, width: 120, textAlign: 'center', marginTop: 5, marginLeft: '77%' }}>Post Comment</div>
              <div style={{
                display: 'flex',
                flexDirection: 'row',
              }}>
                <Avatar alt="Remy Sharp" src={profile} className={classes.avatar} />
                <Paper className={classes.root} elevation={1}>
                  <Typography style={{ margin: 10 }} variant="h6" component="h4">
                    Nikhil Gaekward <span style={{ fontSize: 12 }}> Now</span>
                  </Typography>
                  <Typography style={{ margin: 10 }} component="p">
                    why is there a drop in visitors going to the island?
                   <p style={{ color: 'rgb(0, 0, 255)' }}>@Alan Wright</p>
                  </Typography>
                  <Button><Icon>reply</Icon>reply</Button>
                </Paper>
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'row',
              }}>
                <Avatar alt="Remy Sharp" src={profile} className={classes.avatar} />
                <Paper className={classes.root} elevation={1}>
                  <Typography style={{ margin: 10 }} variant="h6" component="h4">
                    Nikhil Gaekward <span style={{ fontSize: 12 }}> 0 min ago</span>
                  </Typography>
                  <Typography style={{ margin: 10 }} component="p">
                    why is there a drop in visitors going to the island?
                   <p style={{ color: 'rgb(0, 0, 255)' }}>@Alan Wright</p>
                  </Typography>
                  <Button><Icon>reply</Icon>reply</Button>
                </Paper>
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'row',
              }}>
                <Avatar alt="Remy Sharp" src={profile} className={classes.avatar} />
                <Paper className={classes.root} elevation={1}>
                  <Typography style={{ margin: 10 }} variant="h6" component="h4">
                    Nikhil Gaekward <span style={{ fontSize: 12 }}> 2 days ago</span>
                  </Typography>
                  <Typography style={{ margin: 10 }} component="p">
                    why is there a drop in visitors going to the island?
                   <p style={{ color: 'rgb(0, 0, 255)' }}>@Alan Wright</p>
                  </Typography>
                  <Button><Icon>reply</Icon>reply</Button>
                </Paper>
              </div>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    );
  }
}

Tables.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Tables);
