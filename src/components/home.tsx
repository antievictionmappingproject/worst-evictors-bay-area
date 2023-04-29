import React from 'react'
import {getImage} from 'gatsby-plugin-image'
import Header from './Header'
import EvictorImage from './image'
import pin from '../images/pin.svg'
import useIndexQuery from '../queries/index'
import {formatLink} from '../utils/string'
import {Link} from 'gatsby'
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
  const {allEvictor} = useIndexQuery()
  const evictors: EvictorDetails[] = allEvictor.nodes
  /* temp measure */
  const fallback = evictors.filter(
    (evictor) => evictor.localFile?.childImageSharp
  )[0]

  return (
    <div className="homepage">
      <Header isDescription />
      <div>
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
                      evictor.nonprofitOrLowIncome === isNonprofit
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
                                    {(i + 1).toString().length > 1
                                      ? i + 1
                                      : '0' + (i + 1).toString()}
                                  </span>
                                  <Link
                                    to={`/list#${formatLink(e.name)}`}
                                  >
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
                              to={`/list#${formatLink(e.name)}`}
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
