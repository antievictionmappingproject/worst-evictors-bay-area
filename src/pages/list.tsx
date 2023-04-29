import React from 'react'
import Layout from '../components/layout'
import EvictorProfile from '../components/evictor'
import type {EvictorProps} from '../queries/list'
import useListQuery from '../queries/list'
import Header from '../components/Header'

import '../styles/evictors-list.scss'

const CitywideEvictorsListPage = () => {
  const data = useListQuery()
  const evictors: EvictorProps[] = data.allEvictor.nodes

  return (
    <Layout
      customTitle="The Worst Evictors of San Francisco and Oakland"
      customDescription={data.contentfulCitywideListPage.title}
      customUrl="https://www.worstevictorsnyc.org/list"
    >
      <div className="header-container">
        <Header isDescription={false} />
      </div>
      {Object.entries({
        sf: 'San Francisco',
        oakland: 'Oakland',
      }).map(([abbrev, city]) => {
        const cityEvictors = evictors.filter(
          (evictor) => evictor.city === abbrev
        )
        return (
          <div className="city-section">
            <div
              id={city.toLowerCase().replace(' ', '-')}
              className="link-target"
            />
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
    </Layout>
  )
}

/*
  {evictorsContentList.map((content: any, i: number) => (
    <EvictorProfile content={content} key={i} />
  ))}
*/

export default CitywideEvictorsListPage
