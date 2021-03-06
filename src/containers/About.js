import React from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import Markdown from '../components/Markdown'

export default ({content}) => (
  <Grid item xs={12}>
    <Grid container justify="center" spacing={16}>
      <Grid item xs={6}>
        <Markdown source={content.contents}/>
      </Grid>
    </Grid>
  </Grid>
)
