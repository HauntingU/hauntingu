import React from 'react'
import { withRouteData, Link } from 'react-static'
import { Redirect } from 'react-router';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip'
import Markdown from '../components/Markdown'
import { withStyles } from '@material-ui/core/styles'
import MediaPlayer from '../components/MediaPlayer.js'

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
            style={{margin: 4}}
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
    const { title, slug, contents} = episode

    return redirect ? (<Redirect push to={redirect} />) : (
      <Grid item xs={12}>
        <Grid container justify="center" spacing={16}>
          <Grid item xs={12} sm={10} md={8} lg={6} >
            <Typography variant="h3" gutterBottom>
              {title}
            </Typography>
            <Grid container justify="center" style={{marginBottom: 16}}>
              <Grid item xs={12} md={8}>
                {this.getHostChips()}
              </Grid>
              <Grid item xs={12} md={8}>
                <MediaPlayer key={slug} content={episode} defaultPlay={false} />
              </Grid>
            </Grid>
            <Markdown source={contents}/>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}
export default withRouteData(Episode)
