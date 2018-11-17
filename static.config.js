import jdown from 'jdown'
import chokidar from 'chokidar'
import { reloadRoutes } from 'react-static/node'
import React, { Component } from 'react'
import { SheetsRegistry } from 'react-jss/lib/jss'
import JssProvider from 'react-jss/lib/JssProvider'
import { MuiThemeProvider, createMuiTheme, createGenerateClassName } from '@material-ui/core/styles'

chokidar.watch('content').on('all', () => reloadRoutes())

// Your Material UI Custom theme
import theme from './src/theme'

export default {
  getSiteData: () => ({
    title: 'The Haunting U Podcast',
  }),
  getRoutes: async () => {
    const { episodes, hosts, about, ghoulbox } = await jdown('content', {parseMd: false})
    //Always sort in reverse order by slug. Slug must be numeric
    episodes.sort((a,b) => b.slug - a.slug)
    return [
      {
        path: '/',
        component: 'src/containers/Home',
        getData: () => ({
          episodes
        }),
      },
      {
        path: '/about',
        component: 'src/containers/Page',
        getData: () => ({
          content: about
        }),
      },
      {
        path: '/ghoulbox',
        component: 'src/containers/Page',
        getData: () => ({
          content: ghoulbox
        }),
      },
      {
        path: '/hosts',
        component: 'src/containers/Hosts',
        getData: () => ({
          hosts
        }),
      },
      {
        path: '/podcasts',
        component: 'src/containers/Podcasts',
        getData: () => ({
          episodes
        }),
        children: episodes.map(episode => ({
          path: `/episode/${episode.slug}`,
          component: 'src/containers/Episode',
          getData: () => ({
            episode
          })
        }))
      },
      {
        is404: true,
        component: 'src/containers/404',
      },
    ]
  },
  renderToHtml: (render, Comp, meta) => {
    // Create a sheetsRegistry instance.
    const sheetsRegistry = new SheetsRegistry()

    // Create a MUI theme instance.
    const muiTheme = createMuiTheme(theme)

    const generateClassName = createGenerateClassName()

    const html = render(
      <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
        <MuiThemeProvider theme={muiTheme} sheetsManager={new Map()}>
          <Comp />
        </MuiThemeProvider>
      </JssProvider>
    )

    meta.jssStyles = sheetsRegistry.toString()

    return html
  },
  Document: class CustomHtml extends Component {
    render () {
      const {
        Html, Head, Body, children, renderMeta,
      } = this.props

      return (
        <Html>
          <Head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link
              href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
              rel="stylesheet"
            />
          </Head>
          <Body>
            {children}
            <style id="jss-server-side">{renderMeta.jssStyles}</style>
          </Body>
        </Html>
      )
    }
  },
}
