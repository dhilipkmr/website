import React from 'react';
import './toggle.css'
import Helmet from 'react-helmet'

export default class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      themeColor: '#055171'
    }
    this.toggleMode = this.toggleMode.bind(this);
  }
  toggleMode(mode) {
    if (typeof window !== 'undefined' && window.localStorage.getItem('dkBlogTheme') !== mode) {
      this.setState({themeColor: mode === 'dark' ? '#000': '#055171'})
      window.localStorage.setItem('dkBlogTheme', mode);
      document.body.classList.toggle('dark');
      document.body.classList.toggle('light');
    }
  }

  render() {
    return(
      <React.Fragment>
        <Helmet  meta={[{ name: 'theme', content: this.state.themeColor}]}/>
        <div className="mw960">
          <div className="toggleBtnWrap inbl fr marginR20">
            <div className="inbl white toggleBtn toggleBtnBgDark hand noselect" onClick={() => this.toggleMode('dark')}>Dark</div>
            <div className="inbl white toggleBtn toggleBtnBgLight hand noselect" onClick={() => this.toggleMode('light')}>Light</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}