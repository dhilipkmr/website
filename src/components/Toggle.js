import React from 'react';
import './toggle.css'

export default class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.toggleMode = this.toggleMode.bind(this);
  }
  toggleMode(mode) {
    if (typeof window !== 'undefined' && window.localStorage.getItem('dkBlogTheme') !== mode) {
      window.localStorage.setItem('dkBlogTheme', mode);
      document.body.classList.toggle('dark');
      document.body.classList.toggle('light');
    }
  }

  render() {
    return(
      <div className="mw960">
        <div className="toggleBtnWrap inbl fr marginR20">
          <div className="inbl white toggleBtn toggleBtnBgDark hand noselect" onClick={() => this.toggleMode('dark')}>Dark</div>
          <div className="inbl white toggleBtn toggleBtnBgLight hand noselect" onClick={() => this.toggleMode('light')}>Light</div>
        </div>
      </div>
    );
  }
}