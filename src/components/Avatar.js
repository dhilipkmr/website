import React from 'react';
import { relative } from 'path';
import './componentCss.css';
import FadeIn from './FadeIn';

const Avatar = () => {
  return(
    <div className="margin40">
      <div className="posRel h120p">
        <a href="https://www.linkedin.com/in/dhilipkmr" target="_blank">
          <img className="posAbs avatarImg " src="https://pbs.twimg.com/profile_images/1108510685510524929/FDY-SGHa_400x400.jpg"/>
        </a>
      </div>
      <div className="textcenter white padT20 avatarInto lh2em">
        <FadeIn className="padT10" style={{ animationDelay: '1s', lineHeight: '2em'}}>hi there...!</FadeIn>
        <FadeIn className="padT10" style={{ animationDelay: '1.6s', lineHeight: '2em'}}>front-end developer @<a href="https://www.linkedin.com/company/goibibo/" target="_blank"><span>goibibo</span></a></FadeIn>
        <FadeIn className="padT10" style={{ animationDelay: '2s', lineHeight: '2em'}}>accidental blogger | empath | mr.sings a lot | occsasional traveller</FadeIn>
      </div>
    </div>
  );
}
export default Avatar;
