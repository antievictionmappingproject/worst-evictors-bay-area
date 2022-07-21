import {useStaticQuery, graphql} from 'gatsby'
export default function useIndexQuery() {
  const data = useStaticQuery(graphql`
    query {
      allEvictor {
        nodes {
          name
          localFile {
            childImageSharp {
              gatsbyImageData(width: 250, height: 250)
            }
          }
          ebData {
            evictions {
              evict_id
            }
          }
        }
      }
      contentfulLandingPage {
        mapTitle
        mapButton
        kyrTitle
        kyrDescription {
          raw
        }
        kyrContent {
          raw
        }
        mapDescription {
          raw
        }
        openingTitle {
          raw
        }
        openingSubtitle {
          raw
        }
      }
    }
  `)

  return data
}
