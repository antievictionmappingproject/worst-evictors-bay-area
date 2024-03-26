import React from 'react'
import Layout from '../../components/Layout'
import EvictorProfile from '../../components/Evictor'
import type { EvictorProps } from '../../queries/list'
import useListQuery from '../../queries/list'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { renderToString } from 'react-dom/server';

import '../../styles/list.scss'
import { sortEvictors } from '../../utils/misc'
import renderContent from '../../utils/contentful-render'

const SingleEvictorPage = (props) => {
  // pull the evictor ID populated through Gatsby's "collection route" setup for dynamic pages
  // See more here: https://www.gatsbyjs.com/docs/reference/routing/file-system-route-api
  const evictorId = props.pageContext.id

  const data = useListQuery() // pull the full list of evictors
  const evictors = sortEvictors(
    data.allEvictor.nodes
  ) as EvictorProps[]

  /* Because static GraphQL queries don't allow for variables / dynamic searches, easiest to 
  * pull the full list of evictors and then filter here to the evictor for this page.
  *
  * TODO - if this becomes a performance issue, can restructure around a dynamic query
  */

  const evictorToDisplay = evictors.filter((evictor) => evictor.id == evictorId)[0]
  const evictorCity = evictorToDisplay.city == "sf" ? 'San Francisco' : 'Oakland'

  return (
    <Layout
      customTitle={`${evictorToDisplay.name} | The Worst Evictors of San Francisco and Oakland`}
      customDescription={evictorToDisplay.citywideListDescription &&
        renderToString(renderContent(evictorToDisplay.citywideListDescription))}
      customImage={evictorToDisplay.localFile.childImageSharp.gatsbyImageData.images.fallback.src}
      className="page"
      hideFooter
    >
      <div className="header-container">
        <Header isDescription={false} />
      </div>
      <div className="scroll-container">
        <EvictorProfile content={evictorToDisplay} city={evictorCity} />
        <Footer />
      </div>
    </Layout>
  )
}

export default SingleEvictorPage
