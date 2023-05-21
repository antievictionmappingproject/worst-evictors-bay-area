import type {GatsbyConfig} from 'gatsby'
import * as dotenv from 'dotenv'

if (process.env.ENVIROMENT !== 'production') {
  dotenv.config()
}

const contentfulConfig = {
  spaceId: process.env.SPACE_ID,
  accessToken: process.env.ACCESS_TOKEN,
  host: process.env.CONTENTFUL_HOST || 'cdn.contentful.com',
}

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'The Worst Evictors of San Francisco and Oakland',
  },
  plugins: [
    'data-fetch', // our custom fetch plugin to integrate evictorbook and contentful
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    'gatsby-plugin-typescript',
    'gatsby-transformer-sharp',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'The Worst Evictors of San Francisco and Oakland',
        short_name: 'The Worst Evictors',
        start_url: '/',
        background_color: '#242323',
        theme_color: '#242323',
        display: 'minimal-ui',
        icon: 'src/images/favicon.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-source-contentful',
      options: contentfulConfig,
    },
  ],
  trailingSlash: 'always',
}

export default config
