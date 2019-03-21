import React from 'react';
import { relative } from 'path';
import './componentCss.css'

const Avatar = () => {
  return(
    <div className="margin40">
      <div className="posRel h120p">
        <a href="https://www.linkedin.com/in/dhilipkmr" target="_blank">
          <img className="posAbs avatarImg " src="https://pbs.twimg.com/profile_images/1108510685510524929/FDY-SGHa_400x400.jpg"/>
        </a>
      </div>
      <div className="textcenter white padT20 avatarInto lh2em">
        <div>hi there...!</div>
        <div>Front-End Developer @<a href="https://www.linkedin.com/company/goibibo/" target="_blank"><span>goibibo</span></a> | Js Lover</div>
        <div> Accidental Blogger | Empath | Mr.Sings a Lot | Occsasional Traveller</div>
      </div>
    </div>
  );
}
export default Avatar;
