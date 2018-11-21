import jdown from 'jdown'
import chokidar from 'chokidar'
import { reloadRoutes } from 'react-static/node'
import React, { Component } from 'react'
import { SheetsRegistry } from 'react-jss/lib/jss'
import JssProvider from 'react-jss/lib/JssProvider'
import { MuiThemeProvider, createMuiTheme, createGenerateClassName } from '@material-ui/core/styles'
import Podcast from 'podcast';
import fs from 'fs';
import theme from './src/theme'

chokidar.watch('content').on('all', () => reloadRoutes())

const pubDate = new Date();
const year = pubDate.getUTCFullYear();
const siteRoot = "http://www.hauntingu.com"
const getSiteData = () => ({
  title: 'Haunting U',
  pubDate
})
const getPodcastData = () => ({
  ...getSiteData(),
  description: "A podcast by home-haunters for home haunters.  Let us help you take your home based haunted house to the next level.",
  feedUrl: `${siteRoot}/feed.xml` ,
  siteUrl: `${siteRoot}`,
  imageUrl: `${siteRoot}/images/podcast-default.jpg`,
  author: "John Schelt, Keoni Hutton & Leslie Reed",
  copyright: `Copyright ${year} Rocky Mountain Home Haunters. All rights reserved.`,
  categories: ["Games", "Hobbies:Hobbies"],
  itunesAuthor: "",
  itunesExplicit: false,
  itunesSubtitle: "",
  itunesSummary: `Do you love Halloween? Do you like to scare your trick-or-treaters? Have you been looking for a way to make your house more frightening? Then this is the podcast for you!

unting U is an educational and entertaining podcast for Halloween enthusiasts everywhere. We will explore all aspects of designing, building and running your own haunted attraction right from your own home. 

in us every episode as we explore a topic in depth and answer questions from our listeners.`,
  itunesOwner: {
    name: "John Schelt, Keoni Hutton & Leslie Reed",
    email: "dktpmn@gmail.com"
  },
  itunesCategories: [{text: "Games"}, {text: "Hobbies", subcats: ["Hobbies"]}],
  itunesType: 'episodic',
  itunesImage: `${siteRoot}/images/podcast-default.jpg`
  
})
export default {
  siteRoot,
  getSiteData,
  getRoutes: async () => {
    const { about, articles, episodes, highlights, hosts } = await jdown('content', {parseMd: false})
    //Always sort in reverse order by slug. Slug must be numeric
    episodes.sort((a,b) => b.slug - a.slug)
    hosts.sort((a,b) => a.order - b.order)

    const feed = new Podcast(getSiteData())
    for (const item of episodes) {
      feed.addItem({
        title: item.title,
        date: item.date, 
        link: `${siteRoot}/podcasts/episode/${item.slug}`,
        enclosure: {
          url: `${siteRoot}/${item.file}`
        },
        itunesDuration: item.duration,
        itunesExplicit: false,
        itunesEpisode: item.slug,
      })
    }
    fs.writeFileSync('./public/feed.xml', feed.buildXml())

    return [
      {
        path: '/',
        component: 'src/containers/Home',
        getData: () => ({
          episodes,
          highlights
        }),
      },
      {
        path: '/about',
        component: 'src/containers/Hosts',
        getData: () => ({
          hosts,
          about
        }),
      },
      {
        path: '/podcasts',
        component: 'src/containers/Podcasts',
        getData: () => ({
          episodes,
          hosts
        }),
        children: episodes.map(episode => ({
          path: `/episode/${episode.slug}`,
          component: 'src/containers/Episode',
          getData: () => ({
            episode,
            hosts
          })
        }))
      },
      {
        path: '/articles',
        component: 'src/containers/Articles',
        getData: () => ({
          articles,
          hosts
        }),
        children: articles.map(article => ({
          path: `/article/${article.slug}`,
          component: 'src/containers/Page',
          getData: () => ({
            content: article,
            hosts
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
