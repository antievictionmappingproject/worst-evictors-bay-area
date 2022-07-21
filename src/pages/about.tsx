import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";

import renderContent from "../utils/contentful-render";
import Layout from "../components/layout";

type InfoPageProps = {
  title: string;
  subtitle?: {
    raw: string;
  };
  description: {
    raw: string;
  };
};

export const InfoPage: React.FC<InfoPageProps> = ({
  title,
  subtitle,
  description,
}) => (
  <Layout
    customTitle={`${title} | NYC's Worst COVID Evictors`}
    customDescription={
      subtitle ? documentToPlainTextString(JSON.parse(subtitle.raw)) : undefined
    }
  >
    <div className="columns bg-primary text-secondary">
      <div className="column col-4 col-lg-12 bg-primary sticky-column-desktop">
        <div>
          <h1>{title}</h1>
        </div>
        <div>{subtitle && renderContent(subtitle)}</div>
      </div>
      <div className="column col-8 col-lg-12">
        <div className="rich-text-bulleted-list">
          {renderContent(description)}
        </div>
      </div>
    </div>
  </Layout>
);

const AboutPage = () => (
  <StaticQuery
    query={graphql`
      query {
        contentfulAboutPage {
          title
          subtitle {
            raw
          }
          description {
            raw
          }
        }
      }
    `}
    render={(data) => {
      return <InfoPage {...data.contentfulAboutPage} />;
    }}
  />
);

export default AboutPage;
