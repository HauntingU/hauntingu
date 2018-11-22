import React from 'react'
import { withRouteData, Link } from 'react-static'
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/ListItemAvatar';
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
            <List style={{display: 'flex', alignItems: 'stretch', flexDirection: 'column'}}>
              {articles.map(article => (
                [
                  (<ListItem button key="item" onClick={() => this.handleOnClick(article.slug)} style={{minHeight: 100, maxHeight: 200, display: 'flex'}}>
                    <CardMedia
                      style={{width: 151, height: '100%'}}
                      image={article.image}
                      title={article.title}
                    />
                    <ListItemText
                      primary={article.title}
                      secondary={article.summary}
                      style={{flex: 1, maxHeight: 200, overflow: 'hidden'}}
                    />
                  </ListItem>),
                  (<Divider key="divider" inset={true} component="li" />)
                ]
              ))}
            </List>
            {/*articles.map(article => (
              <Grid item xs={12} key={article.slug}>
                <ArticleEntry article={article} />
              </Grid>
            ))*/}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </div>
))
