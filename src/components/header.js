import React from 'react';
import Toggle from './Toggle';
import FadeIn from './FadeIn';

const Header = () => {
  return (
    <div>
      <div className="">
        <div className="mB25 width100">
          <FadeIn className="fs45 inbl" style={{ lineHeight: '1.7em'}}>A Series of</FadeIn>
          <FadeIn className="fs45 inbl" style={{ animationDelay: '0.5s', lineHeight: '1.7em'}}>Accidental Blogs</FadeIn>
        </div>
        <Toggle/>
      </div>
    </div>
  )
}

export default Header;
