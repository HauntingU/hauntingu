import React from 'react'
import convert from 'htmr'
import { withRouteData, Link } from 'react-static'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid';

import Markdown from '../components/Markdown'
import { withStyles } from '@material-ui/core/styles'

export default withRouteData(({ episode }) => (
  <div>
    <Grid item xs={12}>
      <Grid container justify="center" spacing={16}>
        <Grid item xs={6}>
          <Typography variant="h3" gutterBottom>
            {episode.title}
          </Typography>
          <Markdown source={episode.contents}/>
        </Grid>
      </Grid>
    </Grid>
  </div>
))
