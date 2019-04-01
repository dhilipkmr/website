import React from 'react';
import FadeIn from './FadeIn';
import profilePic from '../assets/profilePic.png';

const LINKEDIN_URL = 'https://www.linkedin.com/in/dhilipkmr';
const GI_LINKEDIN_URL = 'https://www.linkedin.com/company/goibibo/';

const Avatar = () => {
  return (
    <div className="margin30">
      <div className="posRel h145p op0 opAnimator " style={{ animationDelay: '0.3s'}}>
        <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
          <img alt="profileImg" className="posAbs avatarImg " width="400" height="400" src={profilePic}/>
        </a>
      </div>
      <div className="marginT20">
        {/* <div className="padT10 width100 textcenter avatarInto oh">
          <FadeIn className="lh2em" style={{ animationDelay: '0.6s' }}>a blog by <span><a href={LINKEDIN_URL} target="_blank" className="themeColor linkHand" rel="noopener noreferrer">dhilip</a></span></FadeIn>
        </div> */}
        <div className="padT10 width100 textcenter avatarInto oh">
          <FadeIn className="lh2em" style={{ animationDelay: '0.35s' }}>front-end developer @<a href={GI_LINKEDIN_URL} target="_blank" rel="noopener noreferrer"><span className="linkHand">goibibo</span></a></FadeIn>
        </div>
        <div className="padT10 width100 textcenter avatarInto oh">
          <FadeIn className="lh2em" style={{ lineHeight: '3em', animationDelay: '0.4s' }}>amateur blogger | empath | mr.sings a lot | occsasional traveller</FadeIn>
        </div>
      </div>
    </div>
  );
}
export default Avatar;
