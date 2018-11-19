import React from 'react'
import { withRouteData, Link } from 'react-static'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import Markdown from '../components/Markdown'

export default withRouteData(({content}) => (
  <Grid item xs={12}>
    <Grid container justify="center" spacing={16}>
      <Grid item xs={12} sm={10} md={8} lg={6} >
        <Markdown source={content.contents}/>
      </Grid>
    </Grid>
  </Grid>
))
