import React from 'react';
import Link from 'gatsby-link';
import Toggle from './Toggle';
import Avatar from './Avatar';
import FadeIn from './FadeIn';

const Header = ({ siteTitle }) => {
  return (
    <div>
      <div className="mh90vh  margin10">
        {/* <h1 className="pad20 textcenter lh2em ">
          <Link to="/" className="headingTxtColor">{siteTitle}</Link>
        </h1> */}
        <div className="mTB50">
          <FadeIn className="fs45">{siteTitle}</FadeIn>
        </div>
        <Toggle/>
        <Avatar/>
      </div>
    </div>
  )
}

export default Header
