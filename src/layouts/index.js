import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Header from '../components/header'
// import Menu from '../components/menu'
import './index.css';
import './darkmode.css';
import './lightmode.css';
import './common.css';

if (typeof window !== 'undefined' && typeof document !== 'undefined' && window.localStorage.getItem('dkBlogTheme') && window.localStorage.getItem('dkBlogTheme') === 'dark') {
  document.body.classList.add('dark');
} else if (typeof document !== 'undefined') {
  document.body.classList.add('light');
}

const Layout = ({ children, data }) => (
  <div className="mw960 lr05">
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        {
          name: 'description',
          content: 'A Personal blog on React, javascript, frontend development',
        },
        { name: 'keywords', content: 'gatsby, react, blog, dhilipkmr, casualblogger' },
      ]}
    />
    <Header siteTitle={data.site.siteMetadata.title} />
    {/* <Menu /> */}
    <div className="mw960">
      {children()}
    </div>
  </div>
)

Layout.propTypes = {
  children: PropTypes.func,
}

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
