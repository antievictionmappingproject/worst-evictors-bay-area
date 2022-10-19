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
    title: 'NYC\'s Worst Evictors',
  },
  plugins: [
    'data-fetch', // our custom fetch plugin to integrate evictorbook and contentful
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-offline',
    'gatsby-plugin-sass',
    'gatsby-plugin-typescript',
    'gatsby-transformer-remark',
    'gatsby-transformer-sharp',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-plugin-emotion',
    'gatsby-plugin-client-side-redirect',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'NYC\'s Worst Evictors during COVID-19',
        short_name: 'Worst COVID Evictors',
        start_url: '/',
        background_color: '#242323',
        theme_color: '#242323',
        display: 'minimal-ui',
        icon: 'src/images/favicon.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://www.worstevictorsnyc.org/',
      },
    },
    {
      resolve: 'gatsby-source-contentful',
      options: contentfulConfig,
    },
  ],
  trailingSlash: 'always',
}

export default config
