import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles({
  searchInput: {
    margin: '0',
    width: '50%',
    background: 'white',
    borderRadius: '4px',
    marginRight: '10px',
  },
  searchForm: {
    textAlign: 'center',
    margin: '25px 0 10px',
  },
  searchWrapper: {
    textAlign: 'center',
  },
  searchButton: {
      padding: '8px',
  },
  sortSelect: {
    minWidth: '120px',
    marginBottom: '20px',
  }
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SearchArea = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }
    return(
      <div className={classes.searchWrapper}>
        <Grid container
          justify="center">
          <Grid item xs={12}>
            <form onSubmit={props.handleSubmit} className={classes.searchForm}>
              <TextField
                required={true}
                className={classes.searchInput}
                id="outlined-dense"
                label="Search repository"
                margin="dense"
                variant="outlined"
                onChange={props.handleChange}/>
              {props.searchValue.length > 0 ?
              <Button variant="contained" color="primary" className={classes.searchButton} onClick={props.handleSubmit}>
                Search
              </Button> :
              <Button variant="contained" color="primary" className={classes.searchButton} onClick={handleClickOpen}>
                Search
              </Button>}
            </form>
          </Grid>
        </Grid>
        {props.repos.length > 0 && props.currentRepo === null ? 
        <div>
          <span>SortBy</span>
          <Select
            className={classes.sortSelect}
            value={props.sortBy}
            onChange={props.sortRepos}>
            <MenuItem value={'name'}>Name</MenuItem>
            <MenuItem value={'stargazers_count'}>Rating</MenuItem>
            <MenuItem value={'created_at'}>Date</MenuItem>
          </Select>
        </div> : ''}
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          >
          <DialogTitle id="alert-dialog-slide-title">{"Please, enter search value"}</DialogTitle>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>

    )
}


export default SearchArea