import React from 'react'
import { graphql } from 'gatsby';
import PropTypes from 'prop-types'
import Helmet from 'react-helmet';
import favicon16 from '../assets/me16.png';
import favicon32 from '../assets/me32.png';
import './style/index.css';
import './style/darkmode.css';
import './style/lightmode.css';
import './style/common.css';

if (typeof window !== 'undefined' && typeof document !== 'undefined' && window.localStorage.getItem('dkBlogTheme') && window.localStorage.getItem('dkBlogTheme') === 'dark') {
  document.body.classList.add('dark');
} else if (typeof document !== 'undefined') {
  document.body.classList.add('light');
}

const Layout = ({ children, data }) => (
  <div className="mw960 lr05">
    <Helmet
      title="Dhilip's Blog"
      meta={[
        {
          name: 'description',
          content: 'A Personal blog on React, javascript, frontend development',
        },
        { name: 'keywords', content: 'gatsby, react, blog, dhilipkmr, casualblogger' },
      ]}
      link={[
        { rel: 'icon', type: 'image/png', sizes: "16x16", href: `${favicon16}` },
        { rel: 'icon', type: 'image/png', sizes: "32x32", href: `${favicon32}` }
      ]}
    />
    {children}
  </div>
);


Layout.propTypes = {
  children: PropTypes.func,
};

export default Layout

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
