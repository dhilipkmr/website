import React from 'react';
import FadeIn from './FadeIn';
const GOOGLE_ME_URL = 'https://www.google.com/search?q=dhilipkmr';

const GoogleMe = () => {
  return (
    <div className="fadeInWord textcenter padT20">
      <FadeIn className="lh2em" style={{ animationDelay: '0.3s' }}><a rel="noopener nofollow" className="atagHighlight" href={GOOGLE_ME_URL} target="_blank">google me</a></FadeIn>
    </div>
  );
}
export default GoogleMe;
