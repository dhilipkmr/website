import React from 'react';
import Link from 'gatsby-link';
import Toggle from './Toggle';

const Header = ({ siteTitle }) => (
  <div>
    <h1 className="textcenter ">
      <Link to="/" className="headingTxtColor">{siteTitle}</Link>
    </h1>
    <Toggle/>
  </div>
)

export default Header
