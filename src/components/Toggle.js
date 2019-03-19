import React from 'react';
import './toggle.css'

export default class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.enableDarkmode = this.enableDarkmode.bind(this);
    this.enableLightmode = this.enableLightmode.bind(this);
  }
  enableDarkmode() {
    document.body.classList.toggle('dark');
    document.body.classList.toggle('light');
    localStorage.setItem('dkBlogTheme', 'dark');
  }

  enableLightmode() {
    document.body.classList.toggle('dark');
    document.body.classList.toggle('light');
    localStorage.setItem("dkBlogTheme", "light");
  }

  render() {
    return(
      <div className="mw960">
        <div className="toggleBtnWrap inbl fr marginR20">
          <div className="inbl white toggleBtn toggleBtnBgDark" onClick={this.enableDarkmode}>Dark</div>
          <div className="inbl white toggleBtn toggleBtnBgLight" onClick={this.enableLightmode}>Light</div>
        </div>
      </div>
    );
  }
}