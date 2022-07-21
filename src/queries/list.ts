import { useStaticQuery, graphql } from "gatsby";
import { ImageDataLike } from "gatsby-plugin-image";

export default function useIndexQuery() {
  const data = useStaticQuery(graphql`
    query {
      contentfulCitywideListPage {
        title
      }
      allEvictor {
        nodes {
          name
          corporation
          photoCaption
          localFile {
            childImageSharp {
              gatsbyImageData(width: 250, height: 250)
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
            evictions {
              type
            }
            networkDetails {
              total_addrs
              total_bes
              total_owners
            }
            portfolio {
              property_portfolio {
                units
                addr
              }
            }
            ebUrl
          }
          totalEvictions
          pullQuote {
            raw
          }
          rank
        }
      }
    }
  `);

  return data;
}

/** might as well define some proptypes */
export type EvictorProps = {
  content: {
    name: string;
    corporation: string;
    localFile: { childImageSharp: ImageDataLike };
    citywideListDescription: { raw: string };
    banks: null | string[];
    ebData: {
      details: {
        creation_date: string;
        name: string;
        be_specific_details: { llc_type_of_business: string };
        office_addresses: string[];
      };
      evictions: {
        type: string;
      }[];
      networkDetails: {
        total_addrs: number;
        total_bes: number;
        total_owners: number;
      };
      portfolio: {
        property_portfolio: {
          units: number;
          addr: string;
          num_evictions: number;
        }[];
      };
      ebUrl: string;
    };
    totalEvictions: string;
    pullQuote: {
      raw: string;
    };
    photoCaption: string;
    rank: number;
  };
};
