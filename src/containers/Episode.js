import React from 'react'
import convert from 'htmr'
import { withRouteData, Link } from 'react-static'
import { Redirect } from 'react-router';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip'
import Markdown from '../components/Markdown'
import { withStyles } from '@material-ui/core/styles'

class Episode extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  handleOnClick = () => {
    this.setState({redirect: true});
  }
  render() {
    const { episode } = this.props
    const { redirect } = this.state
    return redirect ? (<Redirect push to="/" />) : (
      <Grid item xs={12}>
        <Grid container justify="center" spacing={16}>
          <Grid item xs={6}>
            <Typography variant="h3" gutterBottom>
              {episode.title}
            </Typography>
            <Typography variant="h5" gutterBottom>
              Hosts
            </Typography>
            <Chip
              avatar={<Avatar alt="John" src="/images/podcast-default.jpg" />}
              label="John"
              onClick={this.handleOnClick}
              style={{margin: 8}}
            />
            <Chip
              avatar={<Avatar alt="Keoni" src="/images/podcast-default.jpg" />}
              label="Keoni"
              onClick={this.handleOnClick}
              style={{margin: 8}}
            />
            <Chip
              avatar={<Avatar alt="Leslie" src="/images/podcast-default.jpg" />}
              label="Leslie"
              onClick={this.handleOnClick}
              style={{margin: 8}}
            />
            <Markdown source={episode.contents}/>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}
export default withRouteData(Episode)
