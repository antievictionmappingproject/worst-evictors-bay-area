import React from 'react'
import {Link} from 'gatsby'
import {getImage} from 'gatsby-plugin-image'
import renderContent from '../utils/contentful-render'

import EvictorImage from './image'
import building from '../images/building.svg'
import down from '../images/down.svg'
import pin from '../images/pin.svg'

import useIndexQuery from '../queries/index'

const aempLogo = require('../images/AEMP_logo.png')

type EvictorDetails = {
  name: string
  city: string
  nonprofitOrLowIncome: boolean
  localFile: any
  ebData: {
    evictions: {
      evict_id: number
    }[]
  }
}

const LandingPage = () => {
  const {allEvictor, contentfulLandingPage} = useIndexQuery()
  const evictors: EvictorDetails[] = allEvictor.nodes
  /* temp measure */
  const fallback = evictors.filter(
    (evictor) => evictor.localFile?.childImageSharp
  )[0]

  return (
    <div className="homepage">
      <div>
        <div className="header">
          <div className="title-links">
            <div className="title">
              <h1 className="immediate-fade-in">
                {contentfulLandingPage.openingTitle}
              </h1>
              <img src={building} />
            </div>
            <div className="links">
              <a href="#san-francisco">
                <img src={down} />
                San Francisco
              </a>
              <a href="#oakland">
                <img src={down} />
                Oakland
              </a>
              <a href="#resources">
                <img src={down} />
                Resources
              </a>
            </div>
          </div>
          <div className="description delayed-fade-in">
            {renderContent(contentfulLandingPage.openingDescription)}
          </div>
        </div>
        <div className="evictor-names-list">
          {Object.entries({
            sf: 'San Francisco',
            oakland: 'Oakland',
          }).map(([abbrev, city]) => {
            const cityEvictors = evictors.filter(
              (evictor) => evictor.city === abbrev
            )
            return (
              <div className="city-section">
                <div className="city-name">
                  <img src={pin} />
                  <h2>{city}</h2>
                </div>
                {[false, true].map((isNonprofit) => {
                  const typeEvictors = cityEvictors.filter(
                    (evictor) =>
                      (evictor.nonprofitOrLowIncome !== null) ===
                      isNonprofit
                  )
                  return (
                    <div className="type-list">
                      <div className="text">
                        <h3>
                          {isNonprofit
                            ? 'nonprofit + low-income housing evictors'
                            : 'corporate evictors'}
                        </h3>
                        <ol>
                          {typeEvictors.map(
                            (e: EvictorDetails, i: number) => {
                              return (
                                <li key={i}>
                                  <span className="counter">
                                    {i.toString().length > 1
                                      ? i + 1
                                      : '0' + (i + 1).toString()}
                                  </span>
                                  <Link to={`/list#${i + 1}`}>
                                    {e.name}
                                  </Link>
                                </li>
                              )
                            }
                          )}
                        </ol>
                      </div>
                      <div className="images">
                        {typeEvictors.map((e: EvictorDetails, i) => {
                          const image = e.localFile?.childImageSharp
                            ? getImage(e?.localFile)
                            : getImage(fallback?.localFile)
                          return (
                            <Link
                              key={`e-${i}`}
                              to={`/list#${i + 1}`}
                              className="evictor-container"
                            >
                              <EvictorImage
                                width={250}
                                rank={i}
                                name={e.name}
                                image={image}
                              />
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
        <div className="delayed-fade-in">
          <br />
          <div>Brought to you by</div>
          <img
            className="logo"
            src={aempLogo.default}
            alt="The Anti-Eviction Mapping Project"
          />
          <br />
        </div>
      </div>
    </div>
  )
}

export default LandingPage
