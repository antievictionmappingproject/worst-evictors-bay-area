import {useStaticQuery, graphql} from 'gatsby'
export default function useIndexQuery() {
  const data = useStaticQuery(graphql`
    query {
      allEvictor(sort: { rank: ASC }) {
        nodes {
          name
          city
          nonprofitOrLowIncome
          localFile {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, aspectRatio: 1)
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

  return data
}
