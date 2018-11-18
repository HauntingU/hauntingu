import React from 'react'
import ReactMarkdown from 'react-markdown'
import htmlParser from 'react-markdown/plugins/html-parser'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import HtmlToReact from 'html-to-react';

const parser = new HtmlToReact.Parser()

const styles = theme => ({
  listItem: {
    marginTop: theme.spacing.unit,
  },
})
const parseHtml = htmlParser({
  isValidNode: node => node.type !== 'script',
})

const renderers = {
  heading: ({ level, ...props }) => {
    let variant

    switch (level) {
      case 1:
        variant = 'h4'
        break
      case 2:
        variant = 'h5'
        break
      case 3:
        variant = 'h6'
        break
      default:
        variant = 'body1'
        break
    }

    return <Typography {...props} gutterBottom variant={variant} />
  },
  html: ({value}) => {
    return parser.parse(value);
  },
  listItem: withStyles(styles)(({ classes, tight, ...props }) => (
    <li className={classes.listItem}>
      <Typography component="span" {...props} />
    </li>
  )),
  paragraph: props => <Typography {...props} paragraph />,
}

export default function Markdown({children, ...props}) {
  return [children, (<ReactMarkdown renderers={renderers} {...props} />)]
}
