import React from 'react'
import '../styles/footer.scss'
import {FaGithub, FaTwitter} from 'react-icons/fa'
import {OutboundLink} from './OutboundLink'
import {IconType} from 'react-icons/lib/cjs'

const SocialLink = (props: {
  href: string
  icon: IconType
  title: string
}) => (
  <OutboundLink
    href={props.href}
    title={props.title}
    className="btn btn-link"
  >
    <props.icon className="icon" />
  </OutboundLink>
)

const Footer = () => (
  <footer className="Footer">
    <span>
      This resource is made &ldquo;by tenants for tenants&rdquo; and
      is maintained by the{' '}
      <OutboundLink href="https://www.righttocounselnyc.org/">
        Anti-Eviction Mapping Project
      </OutboundLink>
      .
      <br />
      <br />
      <OutboundLink href="https://docs.google.com/forms/d/e/1FAIpQLSesFbaDWKqv3ANxJomqfeOb6hRGzs6KoBA3dSQvIVM1-yRVsQ/viewform?usp=sf_link">
        Click here
      </OutboundLink>
      {'  '}
      to provide feedback about the website.
    </span>
    <div className="Footer_JustFix">
      <div>
        <SocialLink
          href="https://github.com/antievictionmappingproject/worst-evictors-bay-area"
          title="Fork us on GitHub"
          icon={FaGithub}
        />
        <SocialLink
          href="https://twitter.com/antievictionmap"
          title="Follow us on Twitter"
          icon={FaTwitter}
        />
      </div>
      Made by the{' '}
      <OutboundLink href="https://antievictionmap.com/">
        Anti&#8209;Eviction Mapping Project
      </OutboundLink>{' '}
      in partnership with the San Francisco Anti-Displacement
      Coalition. Many, many thanks to{' '}
      <OutboundLink href="https://www.justfix.org">
        JustFixNYC
      </OutboundLink>{' '}
      for creating the{' '}
      <OutboundLink href="https://www.worstevictorsnyc.org/">
        Worst Evictors of NYC
      </OutboundLink>{' '}
      project, which this project stems from and is modeled after.
    </div>
  </footer>
)

export default Footer
