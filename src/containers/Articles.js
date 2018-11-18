import React from 'react'
import { withRouteData, Link } from 'react-static'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import ArticleEntry from '../components/ArticleEntry'

export default withRouteData(({ articles }) => (
  <div>
    <Grid item xs={12}>
      <Grid container justify="center">
        <Grid item xs={12} md={8} lg={6}>
          <Typography variant="h4" gutterBottom>
            Articles
          </Typography>
        </Grid>
      </Grid>
      <Grid container justify="center">
        <Grid item xs={12} md={8} lg={6}>
          <Grid container justify="center">
            {articles.map(article => (
              <Grid item xs={12} key={article.slug}>
                <ArticleEntry article={article} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </div>
))
