import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import moon from '../assets/moon.png';
import sun from '../assets/sun.png';
import {FaMoon, FaSun} from 'react-icons/fa';

const Toggle = ({theme, themer, move}) => {
  return(
    <div>
      <Helmet  meta={[{ name: 'theme-color', content: (theme === 'dark' ? '#1f1f1f': '#296be4')}]}/>
      <div className="">
        <div className="">
          {(theme !== 'dark') && <FaMoon className="hand ico25 " onClick={themer} src={sun}></FaMoon>}
          {(theme === 'dark') && <FaSun className="hand  ico25 " onClick={themer} src={moon}></FaSun>}
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