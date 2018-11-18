import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = theme => ({
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  progress: {
    flexGrow: 1
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
});

class MediaPlayer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {playing: false, completed: 0, duration: 0, currentTime: 0}
    this.audio = React.createRef()
  }
  componentDidMount() {
    const audio = this.audio.current
    if (audio) {
      audio.addEventListener('timeupdate', this.handleTimeUpdate);
      audio.addEventListener('play', this.handlePlay);
      audio.addEventListener('pause', this.handlePause);
      audio.addEventListener('ended', this.stop);
    }
  }
  componentWillUnmount() {
    const audio = this.audio.current
    if (audio) {
      audio.removeEventListener('timeupdate', this.handleTimeUpdate);
      audio.removeEventListener('play', this.handlePlay);
      audio.removeEventListener('pause', this.handlePause);
      audio.removeEventListener('ended', this.stop);
    }
  }
  handlePlay = () => {
    if (!this.state.playing) this.setState({playing: true})
  }
  handlePause = () => {
    if (this.state.playing) this.setState({playing: false})
  }
  handleTimeUpdate = (e) => {
    const {duration, currentTime } = e.srcElement
    const completed = (currentTime / duration) * 100
    this.setState({completed, duration, currentTime})
  }
  togglePlayback = () => {
    const audio = this.audio.current
    if (!audio) return
    this.state.playing ? audio.pause() : audio.play();
    this.setState({ playing : !this.state.playing })
    console.log("Playing?", this.state.playing)
  }
  setPosition = (e) => {
    const clickPos = e.clientX
    const offset = e.target.offsetLeft === 0 ? e.target.parentElement.offsetLeft : e.target.offsetLeft
    const width = e.target.clientWidth
    const percent = (clickPos - offset) / width
    const audio = this.audio.current
    if (!audio) return
    audio.currentTime = audio.duration * percent
  }
  stop = () => {
    this.setState({playing: false})
  }

  render() {
    const { classes, theme, content, defaultPlay } = this.props;
    const { title, slug, file, image } = content
    const { playing, completed } = this.state
    const PlaybackStatus = playing ? PauseIcon : PlayArrowIcon

    return (
      <Card className={classes.card}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Episode {slug}
            </Typography>
            <LinearProgress variant="determinate" value={completed} onClick={this.setPosition}/>
          </CardContent>
          <div className={classes.controls}>
            <IconButton aria-label="Previous">
              {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
            </IconButton>
            <IconButton aria-label="Play/pause" onClick={this.togglePlayback}>
              <PlaybackStatus className={classes.playIcon} />
            </IconButton>
            <IconButton aria-label="Next">
              {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
            </IconButton>
            <audio ref={this.audio} preload="metadata" autoPlay={defaultPlay}>
              <source src={file} type="audio/mp3" />
            </audio>
          </div>
        </div>
        <CardMedia
          className={classes.cover}
          image={image}
          title={title}
        />
      </Card>
    );
  }
}

MediaPlayer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  content: PropTypes.object.isRequired,
  defaultPlay: PropTypes.bool
};

export default withStyles(styles, { withTheme: true })(MediaPlayer);
