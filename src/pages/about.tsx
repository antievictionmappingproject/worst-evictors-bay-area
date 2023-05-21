import React from 'react'
import {StaticQuery, graphql} from 'gatsby'

import renderContent from '../utils/contentful-render'
import Layout from '../components/Layout'
import '../styles/infopage.scss'
import Header from '../components/Header'

type InfoPageProps = {
  title: string
  subtitle?: {
    raw: string
  }
  description: {
    raw: string
  }
}

export const InfoPage: React.FC<InfoPageProps> = ({
  title,
  subtitle,
  description,
}) => (
  <Layout customTitle={title}>
    <div className="page">
      <div className="container">
        <div>
          <div className="header-container">
            <Header isDescription={false} hideCity />
          </div>
          <div>
            <h1>{title}</h1>
          </div>
          {subtitle && (
            <div>{subtitle && renderContent(subtitle)}</div>
          )}
        </div>
        <div>
          <div>{renderContent(description)}</div>
        </div>
      </div>
    </div>
  </Layout>
)

const AboutPage = () => (
  <StaticQuery
    query={graphql`
      query {
        contentfulAboutPage {
          title
          description {
            raw
          }
        }
      }
    `}
    render={(data) => {
      return <InfoPage {...data.contentfulAboutPage} />
    }}
  />
)

export default AboutPage
