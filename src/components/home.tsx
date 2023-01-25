import React from 'react'
import {Link} from 'gatsby'
import {getImage} from 'gatsby-plugin-image'
import renderContent from '../utils/contentful-render'
import EvictorImage from './image'

import useIndexQuery from '../queries/index'

const aempLogo = require('../images/AEMP_logo.png')

type EvictorDetails = {
  name: string
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
  const fallback = evictors.filter(
    (evictor) => evictor.localFile?.childImageSharp
  )[0]

  return (
    <div className="homepage">
      <div className="columns bg-primary text-secondary">
        <div className="column col-6 col-lg-12 sticky-column-desktop full-height-container-desktop">
          <div className="full-height-container-desktop d-flex intro-text">
            <div>
              <h1 className="immediate-fade-in">
                {contentfulLandingPage.openingTitle}
              </h1>
              <h2 className="immediate-fade-in">
                {contentfulLandingPage.openingSubtitle}
              </h2>
              <div className="subtitle delayed-fade-in">
                {renderContent(
                  contentfulLandingPage.openingDescription
                )}
              </div>
            </div>
            <div className="evictor-names-list">
              <ol>
                {evictors.map(
                  (evictor: EvictorDetails, i: number) => {
                    return (
                      <li key={i}>
                        <Link to={`/list#${i + 1}`}>
                          {evictor.name}
                        </Link>
                      </li>
                    )
                  }
                )}
              </ol>
            </div>
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
        <div className="column col-6 col-lg-12 evictors">
          <div className="columns columns-end">
            {evictors.map((evictor: EvictorDetails, i: number) => {
              const image = evictor.localFile?.childImageSharp
                ? getImage(evictor?.localFile)
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
                    name={evictor.name}
                    image={image}
                  />
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
