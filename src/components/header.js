import React from 'react';
import Link from 'gatsby-link';
import Toggle from './Toggle';
import Avatar from './Avatar';

const Header = ({ siteTitle }) => (
  <div>
    <div className="mh90vh">
      <h1 className="pad20 textcenter lh2em ">
        <Link to="/" className="headingTxtColor">{siteTitle}</Link>
      </h1>
      <Toggle/>
      <Avatar/>
    </div>
  </div>
)

export default Header
