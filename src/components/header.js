import React from 'react';
import Link from 'gatsby-link';
import Toggle from './Toggle';
import FadeIn from './FadeIn';

const Header = ({ siteTitle }) => {
  return (
    <div>
      <div className="">
        {/* <h1 className="pad20 textcenter lh2em ">
          <Link to="/" className="headingTxtColor">{siteTitle}</Link>
        </h1> */}
        <div className="mB25 width100">
          <FadeIn className="fs45 inbl" style={{ lineHeight: '1.7em'}}>A Series of</FadeIn>
          <FadeIn className="fs45 inbl" style={{ animationDelay: '0.5s', lineHeight: '1.7em'}}>Accidental Blogs</FadeIn>
        </div>
        <Toggle/>
      </div>
    </div>
  )
}

export default Header
