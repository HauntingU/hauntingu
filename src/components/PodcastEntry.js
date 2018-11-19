import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';

const styles = theme => ({
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flex: 1
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    height: '100%',
    width: 151,
  },
});


class PodcastEntry extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  handleOnClick = (slug) => {
    this.setState({redirect: `/podcasts/episode/${slug}`});
  }

  render() {
    const {redirect} = this.state
    const { classes, theme, podcast } = this.props;
    const {title, summary, image} = podcast

    return redirect ? (<Redirect push to={redirect} />) : (
      <Card className={classes.card}>
        <CardActionArea className={classes.details} onClick={() => this.handleOnClick(podcast.slug)}>
          <CardMedia
            className={classes.cover}
            image={image}
            title={title}
          />
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography variant="h5">
                {title}
              </Typography>
              <Typography color="textSecondary">
                {summary}
              </Typography>
            </CardContent>
          </div>
        </CardActionArea>
      </Card>
    );
  }
}

PodcastEntry.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  podcast: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(PodcastEntry);
