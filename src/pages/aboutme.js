import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/Layout';
import FadeIn from '../components/FadeIn';
import {introduction} from '../components/constants';
import CursorImitator from '../components/CursorImitator';

class AboutMe extends React.Component{
  constructor(props) {
    super(props);
    this.themer = this.themer.bind(this);
    this.getPrevTheme = this.getPrevTheme.bind(this);
    this.state = {
      theme: null
    };
  }

  componentDidMount() {
    const theme = this.getPrevTheme();
    this.setState({ theme });
    setTimeout(() => {
      this.setState({ mounted: true });
    }, 700)
  }

  getPrevTheme() {
    return window.__dkBlogTheme;
  }
  
  themer() {
    /* All other calls to themer */
    const oldTheme = this.state.theme;
    const newTheme = (oldTheme === 'dark') ? 'light' : 'dark';
    if (typeof(window) !== 'undefined') {
      this.setState({ theme: newTheme});
      document.body.className = newTheme;
      window.__dkBlogTheme = newTheme;
      window.localStorage.setItem('dkBlogTheme', newTheme);
    }
  }

  render() {
    const {mounted} = this.state;
    return (
      <Layout className="mh100" theme={this.state.theme} themer={this.themer}>
        <div>
          <div className="mw960">
            <div className="width100 textcenter oh" style={{ lineHeight: '1.7em'}}>
              <FadeIn className=" fs35 fadeInWord ">Let Me</FadeIn>
            </div>
            <div className="width100 textcenter oh" style={{animationDelay: '4s', lineHeight: '1.7em'}}>
              <FadeIn className=" fs35 fadeInWord lh2em ">Introduce</FadeIn>
            </div>
            <div class="terminal">
              {mounted && <CursorImitator className="pad10 textleft white" content={introduction.description} letterWrapClass="pad5 lh2em" style={{ fontSize: '20px'}}/>}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

AboutMe.propTypes = {
  data: PropTypes.object,
};

export default AboutMe;
