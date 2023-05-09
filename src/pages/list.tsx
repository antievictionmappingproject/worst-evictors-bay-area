import React from 'react'
import Layout from '../components/Layout'
import EvictorProfile from '../components/Evictor'
import type {EvictorProps} from '../queries/list'
import useListQuery from '../queries/list'
import Header from '../components/Header'
import Footer from '../components/Footer'

import '../styles/list.scss'

const CitywideEvictorsListPage = () => {
  const data = useListQuery()
  const evictors: EvictorProps[] = data.allEvictor.nodes

  return (
    <Layout
      customTitle="The Worst Evictors of San Francisco and Oakland"
      customDescription={data.contentfulCitywideListPage.title}
      customUrl="https://www.worstevictorsnyc.org/list"
      className="page"
      hideFooter
    >
      <div className="header-container">
        <Header isDescription={false} />
      </div>
      <div className="scroll-container">
      {Object.entries({
        sf: 'San Francisco',
        oakland: 'Oakland',
      }).map(([abbrev, city]) => {
        const cityEvictors = evictors.filter(
          (evictor) => evictor.city === abbrev
        )
        return (
          <div
            className="city-section"
            id={city.toLowerCase().replace(' ', '-')}
          >
            {[false, true].map((isNonprofit) => {
              const typeEvictors = cityEvictors.filter(
                (evictor) =>
                  evictor.nonprofitOrLowIncome === isNonprofit
              )
              return typeEvictors.map((e) => {
                return <EvictorProfile content={e} city={city} />
              })
            })}
          </div>
        )
      })}
      <Footer />
      </div>
    </Layout>
  )
}

/*
  {evictorsContentList.map((content: any, i: number) => (
    <EvictorProfile content={content} key={i} />
  ))}
*/

export default CitywideEvictorsListPage
