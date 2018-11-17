
import React from 'react'
import { withRouteData, Link } from 'react-static'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import Markdown from '../components/Markdown'

export default withRouteData(({ hosts }) => (
  <div>
    <Grid item xs={12}>
      <Grid container justify="center" spacing={16}>
        <Grid item xs={12}>
          <Grid container justify="center">
            <Grid item xs={6}>
              <Typography variant="h3" gutterBottom>
                Hosts
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {hosts.map(host => (
          <Grid item key={host.slug} xs={12} md={8} lg={3}>
            <Typography variant="h4" gutterBottom>
              {host.name}
            </Typography>
            <Markdown source={host.contents}/>
          </Grid>
        ))}
      </Grid>
    </Grid>
  </div>
))
