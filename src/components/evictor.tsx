import React from 'react'
import renderContent from '../utils/contentful-render'
import {OutboundLink} from '../components/outbound-link'
import type {EvictorProps} from '../queries/list'
import '../styles/evictors-list.scss'
import {getImage} from 'gatsby-plugin-image'
import {FormatBusinessAddress} from '../utils/string'
import EvictorImage from './image'
import pin from '../images/pin.svg'
import {formatLink} from '../utils/string'

const EvictorProfile: React.FC<{
  content: EvictorProps
  city: string
}> = ({content, city}) => {
  const {details, evictions, networkDetails, portfolio} =
    content.ebData

  const totalUnits = portfolio.reduce(
    (prev, curr) => prev + curr.units,
    0
  )

  const activeSince = details[0].creation_date.toString().slice(0, 4)

  const evictionsByCategory = Object.entries(
    evictions.reduce((prev, curr) => {
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
            {content.localFile?.childImageSharp && (
              <>
                <EvictorImage
                  width={450}
                  image={getImage(content.localFile)}
                  name={content.photoCaption}
                  hideEyebrow
                />
                <br />
            {content.tags?.length && (
              <div className="tags">{content.tags.join(', ')}</div>
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
            {networkDetails.total_addrs && (
              <p>
                <span className="text-bold text-uppercase">
                  In an ownership network with
                </span>
                <li>{networkDetails.total_addrs} properties</li>
                <li>{networkDetails.total_bes} businesses</li>
                <li>{networkDetails.total_owners} other owners</li>
              </p>
            )}
            <br />
              <OutboundLink
                href={content.ebData.ebUrl}
                className="btn btn-primary"
              >
                See if your building is in this portfolio
              </OutboundLink>
              </>
            )}
          </div>
        </div>
        <div className="right">
          <div className="right-width-constrainer">
            <div className="summary">
              <span>
                {content.totalEvictions ? (
                  <>
                    <h2>
                      {content.totalEvictions} households sued for
                      eviction
                    </h2>
                    <p>
                      Including <br />
                      {evictionsByCategory.map((category) => {
                        const [type, number] = category
                        const filings =
                          number === 1 ? 'filing' : 'filings'
                        return (
                          <li>
                            {number} {filings} under <em>{type}</em>
                          </li>
                        )
                      })}
                    </p>
                  </>
                ) : undefined}
              </span>
              <p>{totalUnits} units owned total</p>
            </div>
            {content.pullQuote && (
              <>
                <br />
                {renderContent(content.pullQuote)}
              </>
            )}
                {content.citywideListDescription &&
                  renderContent(content.citywideListDescription)}
        </div>
      </div>
      </div>
      <div className="spacer" />
    </section>
  )
}

export default EvictorProfile
