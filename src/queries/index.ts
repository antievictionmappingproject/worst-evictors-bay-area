import {useStaticQuery, graphql} from 'gatsby'

export default function useIndexQuery() {
  const data = useStaticQuery(graphql`
    query {
      allEvictor {
        nodes {
          name
          corporation
          city
          rank
          tags
          nonprofitOrLowIncome
          rank
          localFile {
            childImageSharp {
              gatsbyImageData(
                width: 250
                height: 250
                layout: CONSTRAINED
              )
            }
          }
          ebData {
            evictions {
              evict_id
            }
          }
          rank
        }
      }
      contentfulLandingPage {
        openingTitle
        openingSubtitle
        openingDescription {
          raw
        }
      }
    }
  `)

  return data as IndexQuery
}

export type IndexQuery = {
  allEvictor: {
    nodes: {
      name: string
      city: string
      tags: string[]
      corporation: string
      rank: number
      nonprofitOrLowIncome: boolean
      localFile: any
      ebData: {
        evictions: {
          evict_id: number
        }[]
      }
    }[]
  }
}
