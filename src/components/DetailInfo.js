import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles({
    title: {
        fontFamily: 'Acme',
        fontSize: '20px',
        margin: '0',
    },
    text: {
        marginTop: '5px',
    },
    repoImage: {
        maxWidth: '100%',
    },
    closeInfo: {
        display: 'inline-block',
        padding: '15px',
        cursor: 'pointer',
        transition: '.3s',
        '&:hover': {
            transform: 'scale(1.2)',
        }
    },
    heart: {
        transition: '.3s',
        cursor: 'pointer',
        display: 'block',
        width: '30px',
        textAlign: 'left',
        '&:hover': {
            transform: 'scale(1.2)',
        }
    }
  });

const DetailInfo = (props) => {
    const classes = useStyles();
    const favoritRepos = localStorage.getItem('favoritesId')
    return (
        <Container maxWidth='lg'>
            <div className={classes.closeInfo} onClick={props.closeInfo}>
                <i className="fas fa-arrow-left"></i> Back
            </div>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4} style={{textAlign: 'center'}}>
                    <img className={classes.repoImage} src={props.currentRepo.owner.avatar_url} alt={props.repoName}/>
                    {favoritRepos != null && favoritRepos.includes(props.currentRepo.id) ?
                    <div className={classes.heart} onClick={() => props.removeFromFavorites(props.currentRepo.id)}>
                    <i className="fas fa-heart" style={{fontSize: '25px', color: 'red'}} ></i>
                    </div> :
                    <div className={classes.heart} onClick={() => props.addToFavorites(props.currentRepo.id)}>
                    <i className="far fa-heart" style={{fontSize: '25px'}} ></i>
                    </div>}
                </Grid>
                <Grid item xs={12} sm={8}>
                    <p className={classes.title}>Full name:</p>
                    <p className={classes.text}>{props.currentRepo.full_name}</p>
                    <p className={classes.title}>Create at:</p>
                    <p className={classes.text}>{props.currentRepo.created_at.substring(0,10)}</p>
                    <p className={classes.title}>Autor:</p>
                    <p className={classes.text}>{props.currentRepo.owner.login}</p>
                    <p className={classes.title}>Description:</p>
                    <p className={classes.text}>{props.currentRepo.description}</p>
                    <p className={classes.title}>View on GitHub:</p>
                    <p className={classes.text}><a href={props.currentRepo.html_url} target='blank'>{props.currentRepo.html_url}</a></p>
                </Grid>
            </Grid>
        </Container>
    )
}

export default DetailInfo