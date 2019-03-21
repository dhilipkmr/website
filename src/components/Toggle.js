import React from 'react';
import './componentCss.css'
import Helmet from 'react-helmet'

export default class Toggle extends React.Component {
  constructor(props) {
    super(props);
    let theme = 'light';
    let themeColor = '#296be4';
    if (typeof window !== 'undefined') {
      theme = !window.localStorage.getItem('dkBlogTheme') ? 'light' : window.localStorage.getItem('dkBlogTheme')
      themeColor = theme === 'light' ? '#296be4' : '#1d1d1d';
    }
    this.state = {
      themeColor,
      theme
    }
    this.toggleMode = this.toggleMode.bind(this);
  }

  getImage() {
    if (this.state.theme === 'light') {
      return '../assets/moon.png';
    }
    return '../assets/sun.png';
  }

  toggleMode() {
    if (typeof window !== 'undefined') {
      this.refs.toggler.classList.toggle('moveRight');
      if (!window.localStorage.getItem('dkBlogTheme') || window.localStorage.getItem('dkBlogTheme') === 'light') {
        window.localStorage.setItem('dkBlogTheme', 'dark');
        this.setState({themeColor: '#1f1f1f', theme: 'dark'});
      } else {
        window.localStorage.setItem('dkBlogTheme', 'light');
        this.setState({themeColor: '#296be4', theme: 'light'});
      }
      document.body.classList.toggle('dark');
      document.body.classList.toggle('light');
      
    }
  }

  render() {
    return(
      <div>
        <Helmet  meta={[{ name: 'theme-color', content: this.state.themeColor}]}/>
        <div className="mw960">
          <div className="width100 mh30">
            <div className="toggleBtnWrap inbl fr marginR10 posRel">
              {/* <input checked={}/> */}
              <div className="inbl white toggleBtnBg toggleBtn" onClick={(e) => this.toggleMode(e)}>
                {/* <img src={this.getImage()}/> */}
              </div>
              <div ref="toggler" className="toggler togglerBg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}