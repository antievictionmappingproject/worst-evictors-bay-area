import {useStaticQuery, graphql} from 'gatsby'
import {ImageDataLike} from 'gatsby-plugin-image'

export default function useIndexQuery() {
  const data = useStaticQuery(graphql`
    query {
      contentfulCitywideListPage {
        title
      }
      allEvictor(sort: { rank: ASC }) {
        nodes {
          name
          city
          nonprofitOrLowIncome
          corporation
          photoCaption
          tags
          evictions {
            type
            evict_date
          }
          localFile {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED)
            }
          }
          citywideListDescription {
            raw
          }
          banks
          ebData {
            details {
              creation_date
              name
              be_specific_details {
                llc_type_of_business
              }
              office_addresses
            }
            networkDetails {
              total_addrs
              total_bes
              total_owners
            }
            ebUrl
          }
          activeSince
          totalEvictions
          totalUnits
          pullQuote {
            raw
          }
          rank
        }
      }
    }
  `)

  return data
}

/** might as well define some proptypes */
export type EvictorProps = {
  name: string
  corporation: string
  city: string
  tags?: string[]
  evictions: {
    type: string
    evict_date: string
  }[]
  nonprofitOrLowIncome: boolean
  localFile: { childImageSharp: ImageDataLike }
  citywideListDescription: { raw: string }
  banks: null | string[]
  ebData: {
    details: {
      creation_date: string
      name: string
      be_specific_details: { llc_type_of_business: string }
      office_addresses: string[]
    }
    networkDetails: {
      total_addrs: number
      total_bes: number
      total_owners: number
    }
    ebUrl: string
  }[]
  activeSince: number
  totalEvictions: number
  totalUnits: number
  pullQuote: {
    raw: string
  }
  photoCaption: string
  rank: number
}
