import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
};

class PodcastCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  handleOnClick = (slug) => {
    this.setState({redirect: `/podcasts/episode/${slug}`});
  }

  render() {
    const {classes, podcast} = this.props
    const {redirect} = this.state
    return redirect ? (<Redirect push to={redirect} />) : (
      <Card className={classes.card}>
        <CardActionArea onClick={() => this.handleOnClick(podcast.slug)}>
          <CardMedia
            className={classes.media}
            image={podcast.image || '/images/podcast-default.jpg'}
            title={podcast.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {podcast.title}
            </Typography>
            <Typography component="p">
              {podcast.summary}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
    );
  }
}

PodcastCard.propTypes = {
  classes: PropTypes.object.isRequired,
  podcast: PropTypes.object.isRequired
};

export default withStyles(styles)(PodcastCard);
