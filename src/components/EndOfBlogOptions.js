import React from 'react';
import {FaShare, FaTwitter} from 'react-icons/fa';
import {IoLogoWhatsapp} from 'react-icons/io';
// import FadeIn from './FadeIn';
// import profilePic from '../assets/profilePic.png';

// const LINKEDIN_URL = 'https://www.linkedin.com/in/dhilipkmr';
// const GI_LINKEDIN_URL = 'https://www.linkedin.com/company/goibibo/';

const shareBlog = (props) => {
  const { title, path } = props.data;
  if (navigator.share) {
    navigator.share({
        title,
        url: typeof(window !== 'undefined') ? window.location.origin + path : ''
    })
    .then(() => console.log('Successful share'))
    .catch((error) => console.log('Error sharing', error));
  }
}
const Avatar = (props) => {
  return (
    <div className="mw960 pad10 ">
      <div className="rightAlign ico24 themeColor">
        <div>
          <FaShare className="marginR20 hand" onClick={() => shareBlog(props)}/>
          <a className="marginR20 white hand" href={'whatsapp://send?text=<%=https://the-accidental-blogger.netlify.com' + props.data.path + ' %>'}><IoLogoWhatsapp className="themeColor"/></a>
          <FaTwitter className="marginR20 hand"/>
        </div>
      </div>
      {/* <div className="posRel h120p leftAlign">
        <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
          <img alt="profileImg" className="posAbs avatarImg " width="400" height="400" src={profilePic}/>
        </a>
      </div> */}
    </div>
  );
}
export default Avatar;
