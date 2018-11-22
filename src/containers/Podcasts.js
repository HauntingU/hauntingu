import React from 'react'
import { Redirect } from 'react-router';
import { withRouteData, Link } from 'react-static'
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/ListItemAvatar';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import PodcastEntry from '../components/PodcastEntry'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';


class Podcasts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  handleOnClick = (slug) => {
    this.setState({redirect: `/podcasts/episode/${slug}`});
  }
  cancelClick =(e) => {
    console.log("Don't follow")
    e.stopPropagation();
  }
  render() {
    const {redirect} = this.state
    const {episodes} = this.props

    return redirect ? (<Redirect push to={redirect} />) : (
      <div>
        <Grid item xs={12}>
          <Grid container justify="center">
            <Grid item xs={12} md={8} lg={6}>
              <Typography variant="h4" gutterBottom>
                Podcasts
              </Typography>
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Grid item xs={12} md={8} lg={6}>
              <Grid container justify="center" spacing={16}>
                <List style={{display: 'flex', alignItems: 'stretch', flexDirection: 'column'}}>
                  {episodes.map(episode => (
                    [
                      (<ListItem button key="item" onClick={() => this.handleOnClick(episode.slug)} style={{minHeight: 100, maxHeight: 200, display: 'flex'}}>
                        <CardMedia
                          style={{width: 151, height: '100%'}}
                          image={episode.image}
                          title={episode.title}
                        />
                        <ListItemText style={{flex: 1, maxHeight: 200, overflow: 'hidden'}}>
                          <Typography variant="subtitle1">
                            {episode.title}
                          </Typography>
                          <Typography variant="caption">(Episode {episode.slug})</Typography>
                          <Typography color="textSecondary" variant="body1">{episode.summary}</Typography>
                          <ListItemSecondaryAction onClick={this.cancelClick}>
                            <IconButton aria-label="Download" component="a" href={episode.file} download>
                              <CloudDownloadIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItemText>
                      </ListItem>),
                      (<Divider key="divider" inset={true} component="li" />)
                    ]
                  ))}
                </List>
                {/*episodes.map(episode => (
                  <Grid item xs={12} key={episode.slug}>
                    <PodcastEntry podcast={episode} />
                  </Grid>
                ))*/}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }
}
export default withRouteData(Podcasts)
