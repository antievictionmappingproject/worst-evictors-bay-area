import React from 'react'
import renderContent from '../utils/contentful-render'
import {OutboundLink} from './OutboundLink'
import type {EvictorProps} from '../queries/list'
import {getImage} from 'gatsby-plugin-image'
import {FormatBusinessAddress, titleCase} from '../utils/string'
import EvictorImage from './EvictorImage'
import pin from '../images/pin.svg'
import {formatLink} from '../utils/string'

import '../styles/list.scss'

const EvictorProfile: React.FC<{
  content: EvictorProps
  city: string
}> = ({content, city}) => {
  const {networkDetails, details} = content.ebData[0]
  const evictions = content.evictions || []
  const activeSince = content.activeSince

  const totalSince2019 = evictions.filter(
    (eviction) => eviction.evict_date.slice(0, 4) === '2019'
  ).length

  const evictionsByCategory = Object.entries(
    evictions.reduce((prev, curr) => {
      if (curr.type === null) return prev
      typeof prev[curr.type] === 'undefined'
        ? (prev[curr.type] = 1)
        : (prev[curr.type] = prev[curr.type] + 1)
      return prev
    }, {} as { [key: string]: number })
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)

  return (
    <section
      className="evictor-profile"
      id={formatLink(content.name)}
      key={formatLink(content.name)}
    >
      <div className="col-container">
        <div className="left">
          <div className="left-width-constrainer">
            <h1>{content.name}</h1>
            <h2>{content.corporation}</h2>
            <div className="city-name">
              <img src={pin} />
              <span>
                {city}{' '}
                {content.nonprofitOrLowIncome
                  ? 'nonprofit and low-income housing evictor'
                  : 'corporate evictor'}
              </span>
            </div>
            {content.tags && (
              <div className="tags">
                {content.tags.map((tag, index) => (
                  <span className="tag">
                    {tag}
                    {index === content.tags.length - 1 ? '' : ' ⋅ '}
                  </span>
                ))}
              </div>
            )}
            {content.localFile?.childImageSharp && (
              <>
                <EvictorImage
                  image={getImage(content.localFile)}
                  name={content.photoCaption}
                  hideEyebrow
                />
                <br />
                {content.tags?.length && (
                  <div className="tags">
                    {content.tags.join(', ')}
                  </div>
                )}

                {content.banks?.length ? (
                  <p>
                    <span className="stat-name">Funded By</span>
                    <br />
                    {content.banks.map((bank: string, i: number) => (
                      <li key={i}>{bank}</li>
                    ))}
                  </p>
                ) : undefined}
                {details[0].office_addresses.length ? (
                  <p>
                    <span className="stat-name">
                      Primary business address
                    </span>
                    <br />
                    {FormatBusinessAddress(
                      details[0].office_addresses[0]
                    )}
                    <br />
                  </p>
                ) : undefined}
                {activeSince ? (
                  <span>Active since {activeSince}</span>
                ) : undefined}
                {networkDetails[0].total_addrs && (
                  <p>
                    <span className="text-bold text-uppercase">
                      In an ownership network with
                    </span>
                    {networkDetails[0].total_addrs > 1 && (
                      <li>
                        {networkDetails[0].total_addrs} properties
                      </li>
                    )}
                    <li>{networkDetails[0].total_bes} businesses</li>
                    <li>
                      {networkDetails[0].total_owners} other owners
                    </li>
                  </p>
                )}
                <br />
                {content.ebData.length > 1 && (
                  <span>
                    This evictor is associated with multiple ownership
                    networks:
                  </span>
                )}
                {content.ebData.map((evictor) => (
                  <OutboundLink
                    href={evictor.ebUrl}
                    className="btn btn-primary"
                  >
                    See {titleCase(evictor.details[0].name)}
                    's portfolio
                  </OutboundLink>
                ))}
              </>
            )}
          </div>
        </div>
        <div className="right">
          <div className="right-width-constrainer">
            <div className="summary">
              <span>
                {content.totalEvictions > 5 ? (
                  <>
                    <h2>
                      {content.totalEvictions} households sued for
                      eviction
                    </h2>
                    {totalSince2019 > 5 && (
                      <em>
                        Of these, {totalSince2019} have been made
                        since 2019.
                      </em>
                    )}
                    <p style={{padding: '0 2rem'}}>
                      Including <br />
                      {evictionsByCategory.map((category, i) => {
                        const [type, number] = category
                        const filings =
                          number === 1 ? 'filing' : 'filings'
                        return (
                          <li key={i}>
                            {number} {filings} under <em>{type}</em>
                          </li>
                        )
                      })}
                    </p>
                  </>
                ) : undefined}
              </span>
              {content.totalUnits > 5 &&
                content.totalEvictions > 5 && (
                <h2>{content.totalUnits} units owned total</h2>
              )}
            </div>
            {content.pullQuote && renderContent(content.pullQuote)}
            {content.citywideListDescription &&
              renderContent(content.citywideListDescription)}
            {content.tags?.includes('Former Evictor') && (
              <em>
                This evictor is categorized as a Former Evictor
                because of inactivity in recent years, often following
                major tenant organizing campaigns.
              </em>
            )}
          </div>
        </div>
      </div>
      <div className="spacer" />
    </section>
  )
}

export default EvictorProfile
