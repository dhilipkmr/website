import React from 'react';
import './toggle.css'

export default class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.enableDarkmode = this.enableDarkmode.bind(this);
    this.enableLightmode = this.enableLightmode.bind(this);
  }
  toggleMode(mode) {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('dkBlogTheme', mode);
      document.body.classList.toggle('dark');
      document.body.classList.toggle('light');
    }
  }

  render() {
    return(
      <div className="mw960">
        <div className="toggleBtnWrap inbl fr marginR20">
          <div className="inbl white toggleBtn toggleBtnBgDark" onClick={() => this.enableDarkmode('dark')}>Dark</div>
          <div className="inbl white toggleBtn toggleBtnBgLight" onClick={() => this.enableLightmode('light')}>Light</div>
        </div>
      </div>
    );
  }
}