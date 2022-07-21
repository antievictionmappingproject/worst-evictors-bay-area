import React from "react";
import { Link } from "gatsby";
import renderContent from "../utils/contentful-render";

import { OutboundLink } from "../components/outbound-link";
import type { EvictorProps } from "../queries/list";
import "../styles/evictors-list.scss";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { FormatBusinessAddress, FormatDate } from "../utils/string";

const EvictorProfile: React.FC<EvictorProps> = ({ content }) => {
  const { details, evictions, networkDetails, portfolio } = content.ebData;

  const totalUnits = portfolio.property_portfolio.reduce(
    (prev, curr) => prev + curr.units,
    0
  );

  const activeSince = details.creation_date.toString().slice(0, 4);

  const evictionsByCategory = Object.entries(
    evictions.reduce((prev, curr) => {
      typeof prev[curr.type] === "undefined"
        ? (prev[curr.type] = 1)
        : (prev[curr.type] = prev[curr.type] + 1);
      return prev;
    }, {} as { [key: string]: number })
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <section
      className="bg-primary evictor-profile"
      key={content.rank}
      id={content.rank.toString()}
    >
      <div className="columns text-secondary">
        <div className="column col-4 col-xl-6 col-lg-12 sticky-column-desktop full-height-container-desktop">
          <div className="full-height-container-desktop">
            <div className="eyebrow rank">{content.rank}.</div>
            <span className="text-bold">
              <h1>{content.name}</h1>
              <h2>{content.corporation}</h2>
              {activeSince ? <em>Active since {activeSince}</em> : undefined}
              <p></p>
              <br />
              <br />
              {content.totalEvictions ? (
                <>
                  <h2>{content.totalEvictions} households sued for eviction</h2>
                  <p>
                    Including <br />
                    {evictionsByCategory.map((category, i) => {
                      const [type, number] = category;
                      const filings = number === 1 ? "filing" : "filings";
                      return (
                        <li>
                          {number} {filings} under <em>{type}</em>
                        </li>
                      );
                    })}
                  </p>
                </>
              ) : undefined}
            </span>
            <p>{totalUnits} units owned total</p>
          </div>
          <OutboundLink href={content.ebData.ebUrl} className="btn btn-primary">
            See if your building is in this portfolio
          </OutboundLink>
        </div>
        <div className="column col-8 col-xl-6 col-lg-12">
          {content.localFile?.childImageSharp && (
            <>
              <GatsbyImage
                image={getImage(content.localFile?.childImageSharp)}
                className="background-cover-photo"
                alt={content.photoCaption}
              />
              <div className="eyebrow text-right">
                <p>Photo: {content.photoCaption}</p>
              </div>
              <br />
            </>
          )}
          {content.banks?.length ? (
            <p>
              <span className="text-bold text-uppercase">Funded By</span>
              <br />
              {content.banks.map((bank: string, i: number) => (
                <li key={i}>{bank}</li>
              ))}
            </p>
          ) : undefined}
          {details.office_addresses.length ? (
            <p>
              <span className="text-bold text-uppercase">
                Primary business address
              </span>
              <br />
              {FormatBusinessAddress(details.office_addresses[0])}
              <br />
            </p>
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
          {content.pullQuote && (
            <>
              <br />
              {renderContent(content.pullQuote)}
            </>
          )}
          <br />
          {content.citywideListDescription &&
            renderContent(content.citywideListDescription)}
          <br />
          <Link to="/#evictors" className="btn btn-primary">
            Back to worst evictors list
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EvictorProfile;
