import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { globalHistory } from "@reach/router"
import Toggle from './Toggle';

class LayoutHeader extends React.Component{

  componentDidMount() {
    var header = this.refs.headerContainer;
    
    // if (typeof(window) !== 'undefined') {
    //   window.onscroll = () => {
    //     var sticky = header.offsetTop;
    //     if (window.pageYOffset > sticky) {
    //       header.classList.add("posSticky");
    //     } else {
    //       header.classList.remove("posSticky");
    //     }
    //   }
    // }
  }

  render() {
    const { children, data, className="" , theme, themer} = this.props;
    const currPath = globalHistory.location.pathname;
    return (
      <div className={className}>
        <div ref="headerContainer">
          <div className="loaderTransition"></div>
          <div className="layoutHeaderwrap marginR5p op0 opAnimator fadeInWord posSticky" style={{ 'animationDelay': '0s'}}>
            <Link className={'inbl marginR5p ' + (currPath === '/' ? 'fb' : '')} to="/"><div className="">Home</div></Link>
            <Link className={'inbl marginR5p ' + (currPath === '/blogs' ? 'fb' : '')} to="/blogs"><div className="">Blogs</div></Link>
            <Link className={'inbl marginR5p ' + (currPath === '/portfolio' ? 'fb' : '')} to='/portfolio'><div className="">Portfolio</div></Link>
            <Link className={'inbl marginR5p ' + (currPath === '/aboutme' ? 'fb' : '')} to='/aboutme'><div className="">About Me</div></Link>
            <Toggle theme={theme} themer={themer}/>
          </div>
        </div>
        {children}
      </div>
    );
  }
}


LayoutHeader.propTypes = {
  children: PropTypes.object,
};

export default LayoutHeader;
