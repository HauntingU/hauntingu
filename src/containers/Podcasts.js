
import React from 'react'
import { withRouteData, Link } from 'react-static'
//
import Typography from '@material-ui/core/Typography'


export default withRouteData(({ episodes }) => (
  <div>
    <Typography type="headline" gutterBottom>
      It's blog time.
    </Typography>
    <Typography type="body1" component="div">
      All Posts:
      <ul>
        {episodes.map(episode => (
          <li key={episode.slug}>
            <Link to={`/podcasts/episode/${episode.slug}/`}>{episode.title}</Link>
          </li>
        ))}
      </ul>
    </Typography>
  </div>
))
