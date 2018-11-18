import React from 'react'
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
  handleOnClick = (slug) => {
    this.setState({redirect: `/about#${slug}`});
  }
  getHostChips = () => {
    if (this.props.episode.hosts) {
      return this.props.episode.hosts.map(slug => {
        const host = this.props.hosts.find(h => h.slug === slug)
        return (
          <Chip
            key={host.slug}
            avatar={<Avatar alt={host.name} src={host.image} />}
            label={host.name}
            onClick={() => this.handleOnClick(host.slug)}
            style={{margin: 8}}
          />
        )
      })
    }
    else
      return null
  }
  render() {
    const { episode } = this.props
    const { redirect } = this.state
    return redirect ? (<Redirect push to={redirect} />) : (
      <Grid item xs={12}>
        <Grid container justify="center" spacing={16}>
          <Grid item xs={6}>
            <Typography variant="h3" gutterBottom>
              {episode.title}
            </Typography>
            <Typography variant="h5" gutterBottom>
              Hosts
            </Typography>
            {this.getHostChips()}
            <Markdown source={episode.contents}/>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}
export default withRouteData(Episode)
