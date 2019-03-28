import React from 'react';
import {FaShare, FaWhatsapp, FaTwitter} from 'react-icons/fa';
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
    <div className="margin30">
      <div className="rightAlign">
        <div>
          <FaShare className="marginR10" onClick={() => shareBlog(props)}/>
          <a className="marginR10 white" href={'whatsapp://send?text=<%=' +  window.location.origin + props.data.path + ' %>'}><FaWhatsapp/></a>
          <FaTwitter/>
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
