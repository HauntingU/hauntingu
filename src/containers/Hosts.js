import React from 'react'
import { withRouteData, Link } from 'react-static'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import Markdown from '../components/Markdown'

const custom = {
  profile: {
    classes: 'profile'
  },
}

export default withRouteData(({ hosts, about }) => (
  <Grid container justify="center" spacing={16}>
    <Grid item xs={12}>
      <Grid container justify="center" spacing={16}>
        <Grid item xs={12} md={8} lg={6}>
          <Markdown source={about.contents}/>
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Grid container justify="center">
        <Grid item xs={12} md={8} lg={6}>
          <Typography variant="h4" gutterBottom>
            Hosts
          </Typography>
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12} md={8} lg={6}>
      <Grid container spacing={16}>
        {hosts.map(host => (
          <Grid item id={host.slug} key={host.slug} xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {host.name}
            </Typography>
            <Markdown source={host.contents} >
              <img src={host.image} style={{maxWidth: 128, float: 'left', padding: 8}} />
            </Markdown>
          </Grid>
        ))}
      </Grid>
    </Grid>
  </Grid>
))
