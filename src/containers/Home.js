import React from 'react'
import { withRouteData } from 'react-static'
import Typography from '@material-ui/core/Typography'
import logoImg from '../images/halloween-background-wide-1.jpg'
import PodcastCard from '../components/PodcastCard'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MediaPlayer from '../components/MediaPlayer'
import Carousel from '../components/Carousel'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {currentEpisode: props.episodes[0], defaultPlay: false}
  }
  setEpisode = (currentEpisode) => {
    this.setState({currentEpisode, defaultPlay: true})
  }

  render() {
    const { episodes, highlights } = this.props
    const { currentEpisode, defaultPlay } = this.state
    return (
      <div style={{margin: '-1rem'}}>
        <Carousel hightlights={highlights} />
        <Grid container justify="center" spacing={16} style={{padding: '1rem 0 1rem 1rem', margin: -16}}>
          <Grid item xs={12} lg={10}>
            <Grid container justify="center" spacing={16}>
              <Grid item xs={12} md={8} lg={9}>
                <Grid container justify="flex-start" alignItems="stretch" spacing={16}>
                  <Grid item xs={12}>
                    <Typography variant="h4">
                      Recent Episodes
                    </Typography>
                  </Grid>
                  {episodes.slice(0,6).map(episode => (
                    <Grid item key={episode.slug} xs={12} md={6} lg={4}>
                      <PodcastCard podcast={episode} setEpisode={this.setEpisode} />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Grid container justify="center" spacing={16}>
                  <Grid item xs={12}>
                    <Typography variant="h4">
                      Now Playing
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <MediaPlayer key={currentEpisode.slug} content={currentEpisode} defaultPlay={defaultPlay} />
                  </Grid>
                  <Grid item xs={12}>
                    <Paper>
                      <Typography variant="h5" component="h3">
                        This will be an advertisement
                      </Typography>
                      <Typography component="p">
                        Yay advertisements!
    
                        Much awesome, so wow
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withRouteData(Home)
