import React from 'react'
import Layout from '../../components/Layout'
import EvictorProfile from '../../components/Evictor'
import type { EvictorProps } from '../../queries/list'
import useListQuery from '../../queries/list'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

import '../../styles/list.scss'
import { sortEvictors } from '../../utils/misc'

const SingleEvictorPage = (props) => {
  // pull the evictor name populated through Gatsby's "collection route" setup for dynamic pages
  // See more here: https://www.gatsbyjs.com/docs/reference/routing/file-system-route-api
  const evictorName = props.params.nameFormatted
  const data = useListQuery() // pull the full list of evictors
  const evictors = sortEvictors(
    data.allEvictor.nodes
  ) as EvictorProps[]

  /* Because static GraphQL queries don't allow for variables / dynamic searches, easiest to 
  * pull the full list of evictors and then filter here to the evictor for this page.
  *
  * TODO - if this becomes a performance issue, can restructure around a dynamic query
  */
  const evictor_to_display = evictors.filter((evictor) => evictor.nameFormatted == evictorName)[0]
  const evictor_city = evictor_to_display.city == "sf" ? 'San Francisco' : 'Oakland'

  return (
    <Layout
      customTitle="The Worst Evictors of San Francisco and Oakland"
      customDescription={data.contentfulCitywideListPage.title}
      className="page"
      hideFooter
    >
      <div className="header-container">
        <Header isDescription={false} />
      </div>
      <div className="scroll-container">
        <EvictorProfile content={evictor_to_display} city={evictor_city} />
        <Footer />
      </div>
    </Layout>
  )
}

export default SingleEvictorPage
