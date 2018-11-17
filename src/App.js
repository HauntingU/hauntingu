import React, { PureComponent } from 'react'
import { Router, Link } from 'react-static'
import { hot } from 'react-hot-loader'
//
import Routes from 'react-static-routes'

import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { withStyles } from '@material-ui/core/styles'

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

    return (
      <Router>
        <div className={classes.container}>
          <CssBaseline />
          <div style={{textAlign: 'center', background: '#111111', padding: '2rem 1rem'}}>
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
                <Tab component={Link} to="/about" label="About Us" />
                <Tab component={Link} to="/podcasts" label="Podcasts" />
                <Tab component={Link} to="/ghoulbox" label="Haunter's Ghoulbox" />
              </Tabs>
            </nav>
          </AppBar>
          <div className={classes.content}>
            <Routes />
          </div>
        </div>
      </Router>
    )
  }
}

const AppWithStyles = withStyles(styles)(App)

export default hot(module)(AppWithStyles)
