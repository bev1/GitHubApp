import React from 'react';
import Repo from './Repo'
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';


const ReposList = (props) => {
    return(
        <Container maxWidth='lg'>
            <Grid container spacing={3}>
                {
                    props.repos.map((repo, i) =>{
                        return (
                            <Repo key={i} repoName={repo.name} rating={repo.stargazers_count} created_at={repo.created_at} image={repo.owner.avatar_url} description={repo.description} repoId={repo.id} addToFavorites={props.addToFavorites} removeFromFavorites={props.removeFromFavorites} viewRepoInfo={props.viewRepoInfo} />
                        )
                    })
                }
            </Grid>
        </Container>
    )
}

export default ReposList