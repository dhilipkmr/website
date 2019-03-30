import React from 'react';
import {FaShare, FaTwitter} from 'react-icons/fa';
import {IoLogoWhatsapp} from 'react-icons/io';
import profilePic from '../assets/profilePic.png';

const LINKEDIN_URL = 'https://www.linkedin.com/in/dhilipkmr';
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
      <div className="textcenter ico24 themeColor marginB20">
        <div>
          <FaShare className="marginLR20 hand" onClick={() => shareBlog(props)}/>
          <a className="white hand" rel="noopener noreferrer" href={'whatsapp://send?text=<%=https://the-accidental-blogger.netlify.com' + props.data.path + ' %>'}><IoLogoWhatsapp className=" marginLR20 themeColor"/></a>
          <a target="_blank" rel="noopener noreferrer" href={'http://twitter.com/share?text=' + props.data.title + '&url=https://the-accidental-blogger.netlify.com' + props.data.path + '&hashtags=javacript'}><FaTwitter className="marginLR20 hand themeColor"/></a>
        </div>
      </div>
      <div className="posRel h120p textcenter">
        <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
          <img alt="profileImg" className="footerAvatar marginL15" style={{ margin: 'inherit' }} width="75" height="75" src={profilePic}/>
        </a>
        <div className="posAbs descriptionTxtColor" style={{top: '20px', left: '115px'}}>A blog by <a rel="noopener noreferrer" href={LINKEDIN_URL} target="_blank" className="themeColor">Dhilip kumar</a></div>
      </div>
    </div>
  );
}
export default Avatar;
