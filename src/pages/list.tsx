import React from 'react'
import Layout from '../components/Layout'
import EvictorProfile from '../components/Evictor'
import type {EvictorProps} from '../queries/list'
import useListQuery from '../queries/list'
import Header from '../components/Header'
import Footer from '../components/Footer'

import '../styles/list.scss'
import {sortEvictors} from '../utils/misc'

const CitywideEvictorsListPage = () => {
  const data = useListQuery()
  const evictors = sortEvictors(
    data.allEvictor.nodes
  ) as EvictorProps[]

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
        {Object.entries({
          sf: 'San Francisco',
          oakland: 'Oakland',
        }).map(([abbrev, city], i) => {
          const cityEvictors = evictors.filter(
            (evictor) => evictor.city === abbrev
          )
          const sortedByNonProfit =
            city === 'Oakland'
              ? cityEvictors
              : cityEvictors.sort(
                (a, b) =>
                  Number(a.nonprofitOrLowIncome) -
                    Number(b.nonprofitOrLowIncome)
              )
          return (
            <div
              className="city-section"
              id={city.toLowerCase().replace(' ', '-')}
              key={i}
            >
              <div>
                {sortedByNonProfit.map((e, i) => {
                  return (
                    <EvictorProfile content={e} city={city} key={i} />
                  )
                })}
              </div>
              )
            </div>
          )
        })}
        <Footer />
      </div>
    </Layout>
  )
}

export default CitywideEvictorsListPage
