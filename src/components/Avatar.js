import React from 'react';
import { relative } from 'path';
import './componentCss.css';
import FadeIn from './FadeIn';
const LINKEDIN_URL = 'https://www.linkedin.com/in/dhilipkmr';
const GI_LINKEDIN_URL = 'https://www.linkedin.com/company/goibibo/';
const Avatar = () => {
  return (
    <div className="margin40">
      <div className="posRel h120p">
        <a href={LINKEDIN_URL} target="_blank">
          <img className="posAbs avatarImg " src="https://pbs.twimg.com/profile_images/1108510685510524929/FDY-SGHa_400x400.jpg"/>
        </a>
      </div>
      <div className="textcenter white padT20 avatarInto lh2em">
        <FadeIn className="padT10" style={{ animationDelay: '0.6s', lineHeight: '2em'}}>a blog by <span><a href={LINKEDIN_URL} target="_blank" className="themeColor linkHand">dhilip</a></span></FadeIn>
        <FadeIn className="padT10" style={{ animationDelay: '0.8s', lineHeight: '2em'}}>front-end developer @<a href={GI_LINKEDIN_URL} target="_blank"><span className="linkHand">goibibo</span></a></FadeIn>
        <FadeIn className="padT10" style={{ animationDelay: '1s', lineHeight: '2em'}}>accidental blogger | empath | mr.sings a lot | occsasional traveller</FadeIn>
      </div>
    </div>
  );
}
export default Avatar;
