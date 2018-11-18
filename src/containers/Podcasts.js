import React from 'react'
import { withRouteData, Link } from 'react-static'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import PodcastEntry from '../components/PodcastEntry'

export default withRouteData(({ episodes }) => (
  <div>
    <Grid item xs={12}>
      <Grid container justify="center">
        <Grid item xs={12} md={8} lg={6}>
          <Typography variant="h4" gutterBottom>
            Podcasts
          </Typography>
        </Grid>
      </Grid>
      <Grid container justify="center">
        <Grid item xs={12} md={8} lg={6}>
          <Grid container justify="center" spacing={16}>
            {episodes.map(episode => (
              <Grid item xs={12} key={episode.slug}>
                <PodcastEntry podcast={episode} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </div>
))
