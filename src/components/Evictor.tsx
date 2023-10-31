import React, { useState } from "react"
import renderContent from "../utils/contentful-render"
import { OutboundLink } from "./OutboundLink"
import type { EvictorProps } from "../queries/list"
import { getImage } from "gatsby-plugin-image"
import {
  FormatBusinessAddress,
  formatNumber,
  titleCase,
} from "../utils/string"
import EvictorImage from "./EvictorImage"
import pin from "../images/pin.svg"
import { formatLink } from "../utils/string"

import "../styles/list.scss"

const EvictorProfile: React.FC<{
  content: EvictorProps
  city: string
}> = ({ content, city }) => {
  const { networkDetails, details } = content.ebData[0]
  const activeSince = content.activeSince

  const [showFormer, setShowFormer] = useState(false)

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
            {content.shellCompanies?.length && (
              <p>
                Also known as{" "}
                {new Intl.ListFormat("en", {
                  style: "long",
                  type: "conjunction",
                }).format(
                  content.shellCompanies.slice(0, 4).map(titleCase)
                )}
              </p>
            )}
            <div className="city-name">
              <img src={pin} />
              <span>
                {city}{" "}
                {content.nonprofitOrLowIncome
                  ? "nonprofit and low-income housing evictor"
                  : "corporate evictor"}
              </span>
            </div>
            {content.tags && (
              <div className="tags">
                {content.tags.map((tag, index) => {
                  return tag === "Former Evictor" ? (
                    <span
                      className="tag"
                      onClick={() => setShowFormer((val) => !val)}
                      key={index}
                      style={{
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                    >
                      {tag}
                      {index === content.tags.length - 1 ? "" : " ⋅ "}
                    </span>
                  ) : (
                    <span className="tag" key={index}>
                      {tag}
                      {index === content.tags.length - 1 ? "" : " ⋅ "}
                    </span>
                  )
                })}
                {showFormer && (
                  <p>
                    <em>
                      This evictor is categorized as a Former Evictor
                      because of inactivity in recent years, often
                      following major tenant organizing campaigns.
                    </em>
                  </p>
                )}
              </div>
            )}
            {content.localFile?.childImageSharp && (
              <>
                <EvictorImage
                  image={getImage(content.localFile)}
                  name={content.photoCaption}
                  hideEyebrow
                />
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
                {content.ebData.map((evictor, i) => (
                  <OutboundLink
                    key={i}
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
            {content.pullQuote && renderContent(content.pullQuote)}
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
