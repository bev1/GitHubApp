import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ReactTooltip from 'react-tooltip';
// import LinesEllipsis from 'react-lines-ellipsis';

const useStyles = makeStyles({
    repoImage: {
        maxWidth: '100%',
        height: 'auto',
        margin: '0',
    },
    repoTitle: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },
    repoContent: {
        minHeight: '139.39px',
    },
    heart: {
        transition: '.3s',
        cursor: 'pointer',
        '&:hover': {
            transform: 'scale(1.2)',
        }
    }
  });


const Repo = (props) => {
    const classes = useStyles();
    const favoritRepos = localStorage.getItem('favoritesId')
    return (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Card>
                <CardActionArea className={classes.repoContent} onClick={() => props.viewRepoInfo(props.repoId)}>
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Grid item xs={2}>
                            <CardMedia><img className={classes.repoImage} src={props.image} alt={props.repoName}/></CardMedia>
                        </Grid>
                        <Grid item xs={10}>
                            <CardContent>
                            <Typography gutterBottom color='primary' variant="h5" component="h2" data-tip={props.repoName} className={classes.repoTitle}>
                                {props.repoName}
                                <ReactTooltip place="bottom" type="info" effect="float" />
                            </Typography>
                            <Typography variant="caption" component="div" className={classes.repoTitle}>
                                Create: {props.created_at.substring(0,10)}
                            </Typography>
                            <Typography variant="caption" component="div" className={classes.repoTitle}>
                                Rating: {props.rating}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="div" className={classes.repoTitle}>
                                {props.description}
                            </Typography>
                            </CardContent>
                        </Grid>
                    </Grid>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary" onClick={() => props.viewRepoInfo(props.repoId)}>
                    View More
                    </Button>
                    {favoritRepos != null && favoritRepos.includes(props.repoId) ?
                    <div className={classes.heart} onClick={() => props.removeFromFavorites(props.repoId)}>
                    <i className="fas fa-heart" style={{fontSize: '25px', color: 'red'}} ></i>
                    </div> :
                    <div className={classes.heart} onClick={() => props.addToFavorites(props.repoId)}>
                    <i className="far fa-heart" style={{fontSize: '25px'}} ></i>
                    </div>}
                </CardActions>
            </Card>
        </Grid>
    )
}

export default Repo