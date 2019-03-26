import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
// import moon from '../assets/moon.png';
// import sun from '../assets/sun.png';

const Toggle = ({theme, themer, move}) => {
  return(
    <div>
      <Helmet  meta={[{ name: 'theme-color', content: (theme === 'dark' ? '#1f1f1f': '#296be4')}]}/>
      <div className="mw960">
        <div className="width100 mh30">
          <div className={'toggleBtnWrap inbl fr marginR10 posRel toggleFader hand '+ (move ? 'moveUp75': '') } style={{ animationDelay: move ? '1s' : '0'}}>
            <div className="inbl white toggleBtnBg toggleBtn " onClick={themer}>
              {/* <img src={this.getImage()} type="image/png" style={{ 'paddingLeft': '26px', height: '20px', paddingTop: '2px'}}/> */}
            </div>
            <div className={'toggler togglerBg ' + (theme === 'dark' ? '' : 'moveRight')}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

Toggle.propTypes = {
  theme: PropTypes.string,
  themer: PropTypes.func,
  move: PropTypes.bool
};

export default Toggle;