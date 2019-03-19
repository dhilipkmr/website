import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Header from '../components/header'
// import Menu from '../components/menu'
import './index.css';
import './darkmode.css';
import './lightmode.css';
import './common.css';

if (localStorage.getItem('dkBlogTheme') && localStorage.getItem('dkBlogTheme') === 'dark') {
  document.body.classList.add('dark');
} else {
  document.body.classList.add('light');
}

const Layout = ({ children, data }) => (
  <div>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        {
          name: 'description',
          content: 'This is a sample website for the Gatsby crash course',
        },
        { name: 'keywords', content: 'gatsby, react, tutorial' },
      ]}
    />
    <Header siteTitle={data.site.siteMetadata.title} />
    {/* <Menu /> */}
    <div className="mw960 mt50">
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
