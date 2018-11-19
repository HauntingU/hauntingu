import React, { PureComponent } from 'react'
import { Router, Link } from 'react-static'
import { hot } from 'react-hot-loader'
import Routes from 'react-static-routes'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { withStyles } from '@material-ui/core/styles'
import { FaFacebook, FaTwitter, FaRss } from 'react-icons/fa';

// Custom styles
const styles = {
  '@global': {
    img: {
      maxWidth: '100%',
    },
  },
  appBar: {
    flexWrap: 'wrap',
  },
  tabs: {
    width: '100%',
  },
  content: {
    padding: '1rem',
  },
}

class App extends PureComponent {
  // Remove the server-side injected CSS.
  componentDidMount () {
    const jssStyles = document.getElementById('jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }

  render () {
    const { classes } = this.props
    const date = new Date();
    const year = date.getUTCFullYear();

    return (
      <Router>
        <div className={classes.container} style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
          <CssBaseline />
          <div style={{textAlign: 'center', background: '#111111', padding: '2rem 1rem'}}>
            <ul style={{position: 'absolute', right: 8, top: 0}}>
              <li style={{display: 'inline'}}><a target="_blank" href='https://www.facebook.com/HauntingU/'><FaFacebook size='2.5em' style={{float: 'right', color: '#fff', padding: 8}}/></a></li>
              <li style={{display: 'inline'}}><a target="_blank" href='https://twitter.com/hauntinguniver1'><FaTwitter size='2.5em' style={{float: 'right', color: '#fff', padding: 8}}/></a></li>
              <li style={{display: 'inline'}}><a target="_blank" href='/feed.xml'><FaRss size='2.5em' style={{float: 'right', color: '#fff', padding: 8}}/></a></li>
            </ul>
            <header style={{textAlign: 'center', display: 'inline-block', fontSize: '1.35em', color: '#fff'}}>
              <span style={{textAlign: 'left', display: 'block'}}>The</span>
              <span style={{display: 'block', fontSize: '2.25em', color: '#fc8c54'}}>Haunting U</span>
              <span style={{textAlign: 'right', display: 'block'}}>Podcast</span>
            </header>
          </div>
          <AppBar className={classes.appBar} color="default" position="static">
            <nav>
              <Tabs className={classes.tabs} value={false} centered>
                <Tab component={Link} to="/" label="Home" />
                <Tab component={Link} to="/about" label="About" />
                <Tab component={Link} to="/podcasts" label="Episodes" />
                <Tab component={Link} to="/articles" label="Articles" />
              </Tabs>
            </nav>
          </AppBar>
          <div className={classes.content} style={{flex: 1}}>
            <Routes />
          </div>
          <div style={{height: 64, backgroundColor: '#111111', textAlign: 'center', verticalAlign: 'middle', fontSize: '1em', color: '#fff', padding: '1.25em'}}>
            &copy; {`${year} Rocky Mountain Home Haunters. All rights reserved.`}
          </div>
        </div>
      </Router>
    )
  }
}

const AppWithStyles = withStyles(styles)(App)

export default hot(module)(AppWithStyles)
