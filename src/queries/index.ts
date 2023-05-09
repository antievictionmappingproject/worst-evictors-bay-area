import { useStaticQuery, graphql } from "gatsby"
export default function useIndexQuery() {
  const data = useStaticQuery(graphql`
    query {
      allEvictor(sort: { rank: ASC }) {
        nodes {
          name
          corporation
          city
          nonprofitOrLowIncome
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

  return data
}
