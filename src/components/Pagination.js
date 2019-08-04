import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const Pagination = (props) => {
    return (
        <Grid container justify="center" style={{margin: '20px 0 20px'}}>
        <Button variant="contained" color="secondary" onClick={props.showMoreSearch}>
          Show More
        </Button>
        </Grid>
    )
}


export default Pagination