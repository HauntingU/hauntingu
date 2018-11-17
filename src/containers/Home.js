import React from 'react'
import { withRouteData } from 'react-static'
//
import Typography from '@material-ui/core/Typography'
import logoImg from '../images/halloween-background-wide-1.jpg'
import PodcastCard from '../components/PodcastCard'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});

export default withRouteData(({episodes}) => (
  <div style={{margin: '-1rem'}}>
    <img src={logoImg} alt="" style={{ display: 'block', width: '100%' }} />
    <Grid container justify="center" spacing={16} style={{padding: '1rem 0 1rem 1rem', margin: -16}}>
      <Grid item xs={12} lg={10}>
        <Grid container justify="center">
          <Grid item xs={12} md={8} lg={9}>
            <Grid container justify="space-evenly" spacing={16}>
              {episodes.slice(0,6).map(episode => (
                <Grid item key={episode.slug}>
                  <PodcastCard podcast={episode}/>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Grid container justify="center" spacing={16}>
              <Grid item>
                <Paper>
                  <Typography variant="h5" component="h3">
                    This will be an advertisement
                  </Typography>
                  <Typography component="p">
                    Yay advertisements!

                    Much awesome, so wow
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </div>
))
