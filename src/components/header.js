import React from 'react';
import FadeIn from './FadeIn';
import PropTypes from 'prop-types';

const Header = () => {
  return (
    <div>
      <div className="">
        <div className="mB10 width100 textcenter oh">
          <FadeIn className="fs35 inline " style={{ animationDelay: '0.1s', lineHeight: '1.7em'}}>A Series of </FadeIn>
          <FadeIn className="fs35 inline " style={{ animationDelay: '0.25s', lineHeight: '1.7em'}}>Accidental Blogs</FadeIn>
        </div>
      </div>
    </div>
  )
}

export default Header;
