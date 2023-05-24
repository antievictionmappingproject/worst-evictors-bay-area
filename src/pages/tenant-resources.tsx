import React from 'react'
import {StaticQuery, graphql} from 'gatsby'
import {InfoPage} from './about'

const TenantResourcesPage = () => (
  <StaticQuery
    query={graphql`
      query {
        contentfulTenantResourcesPage {
          title
          description {
            raw
          }
        }
      }
    `}
    render={(data) => {
      const {title, description} =
        data.contentfulTenantResourcesPage
      return <InfoPage title={title} description={description} />
    }}
  />
)

export default TenantResourcesPage
