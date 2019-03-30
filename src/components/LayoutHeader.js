import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { globalHistory } from "@reach/router"
import Toggle from './Toggle';
import {TiThMenu} from 'react-icons/ti';
import {FaDownload} from 'react-icons/fa';
import {MdClose} from 'react-icons/md';

class LayoutHeader extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false
    }
    this.showMenu = this.showMenu.bind(this);
  }

  showMenu() {
    this.setState({ showMenu: true});
  }

  render() {
    const { children, className="" , theme, themer} = this.props;
    const currPath = globalHistory.location.pathname;
    return (
      <div className={className}>
        {this.state.showMenu &&
          <div className="posRel ">
            <div className="menuContainer">
              <div><MdClose className="themeHover hand menuFont lh2em closeBtn" onClick={()=>{ this.setState({ showMenu: false})}}/></div>
              <div className="transCenter menuHeadingContainer widthOptimize textcenter">
                <Link to='/'><div className={'themeHover hand menuFont fb lh2em ' + (currPath === '/' ? 'themeColor' : '')} >Home</div></Link>
                <Link to='/blogs'><div className={'themeHover hand menuFont fb lh2em ' + (currPath === '/blogs' ? 'themeColor' : '')}>Blogs</div></Link>
                <Link to='/portfolio'><div className={'themeHover hand menuFont fb lh2em ' + (currPath === '/portfolio' ? 'themeColor' : '')}>Portfolio</div></Link>
                <Link to='/skills'><div className={'themeHover hand menuFont fb lh2em ' + (currPath === '/skills' ? 'themeColor' : '')}>Skills</div></Link>
                <Link to='/aboutme'><div className={'themeHover hand menuFont fb lh2em ' + (currPath === '/aboutme' ? 'themeColor' : '')}>About Me</div></Link>
                <Link to='/contact'><div className={'themeHover hand menuFont fb lh2em ' + (currPath === '/contact' ? 'themeColor' : '')}>Contact</div></Link>
                <a href="https://drive.google.com/uc?export=download&id=1VwfM39_eH6ltBjDKqaWvzIhsNkMMiPv4">
                  <div className="themeHover hand menuFont lh2em fb "> Resume<FaDownload style={{ paddingTop: '15px'}}/></div>
                </a>
              </div>
            </div>
          </div>
          }
        <div ref="headerContainer">
          <div className="loaderTransition"></div>
          <div className="" style={{display: 'flex', alignContent: 'space-between'}}>
            <div style={{padding: '20px'}}>
              <TiThMenu className="hand fl marginR20 fadeInWord" onClick={this.showMenu}/>
            </div>
            <div className="layoutHeaderwrap marginR5p op0 opAnimator fadeInWord posSticky" style={{ 'animationDelay': '0s'}}>
              <Link className={'inbl marginR5p hideless500w ' + (currPath === '/' ? 'fb' : '')} to="/"><div className="">Home</div></Link>
              <Link className={'inbl marginR5p hideless500w ' + (currPath === '/blogs' ? 'fb' : '')} to="/blogs"><div className="">Blogs</div></Link>
              <Link className={'inbl marginR5p hideless500w ' + (currPath === '/portfolio' ? 'fb' : '')} to='/portfolio'><div className="">Portfolio</div></Link>
              {/* <Link className={'inbl marginR5p ' + (currPath === '/aboutme' ? 'fb' : '')} to='/aboutme'><div className="">About Me</div></Link> */}
              <Toggle theme={theme} themer={themer}/>
            </div>
          </div>
          </div>
          {/* <div className={(this.state.showMenu ? 'dn' : '')}> */}
            {children}
          {/* </div> */}
      </div>
    );
  }
}


LayoutHeader.propTypes = {
  children: PropTypes.object,
};

export default LayoutHeader;
