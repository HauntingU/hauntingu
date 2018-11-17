import axios from 'axios'
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
    const { data: posts } = await axios.get('https://jsonplaceholder.typicode.com/posts')
    const { episodes } = await jdown('content', {parseMd: false})
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
        component: 'src/containers/About',
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
        path: '/blog',
        component: 'src/containers/Blog',
        getData: () => ({
          posts,
        }),
        children: posts.map(post => ({
          path: `/post/${post.id}`,
          component: 'src/containers/Post',
          getData: () => ({
            post,
          }),
        })),
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
