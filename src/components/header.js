import React from 'react';
import Toggle from './Toggle';
import FadeIn from './FadeIn';

const Header = ({theme, themer}) => {
  return (
    <div>
      <div className="">
        <div className="mB10 width100 textcenter oh">
          <FadeIn className="fs40 inline marginR10" style={{ animationDelay: '0.1s', lineHeight: '1.7em'}}>A Series</FadeIn>
          <FadeIn className="fs40 inline " style={{ animationDelay: '0.25s', lineHeight: '1.7em'}}>of</FadeIn>
        </div>
        <div className="mB25 width100 textcenter oh">
          <FadeIn className="fs40 inbl" style={{ animationDelay: '0.40s', lineHeight: '1.7em'}}>Accidental Blogs</FadeIn>
        </div>
        <Toggle theme={theme} themer={themer} move/>
      </div>
    </div>
  )
}

export default Header;
