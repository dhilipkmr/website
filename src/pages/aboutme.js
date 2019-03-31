import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/Layout';
import FadeIn from '../components/FadeIn';
import {introduction} from '../components/constants';

class AboutMe extends React.Component{
  constructor(props) {
    super(props);
    this.themer = this.themer.bind(this);
    this.getPrevTheme = this.getPrevTheme.bind(this);
    this.loadIntro = this.loadIntro.bind(this);
    this.loadSentence = this.loadSentence.bind(this);
    this.loadCursorBlink = this.loadCursorBlink.bind(this);
    this.ttw = 0;
    this.state = {
      theme: null,
      mounted: false
    };
  }

  componentDidMount() {
    const theme = this.getPrevTheme();
    this.setState({ theme, mounted: true });
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

  loadCursorBlink(ref, ttw) {
    let reference = ref;
    let that = this;
    setTimeout(() => {
      that.interval = setInterval(() => {
        if (reference.innerText === '|') {
          reference.innerText = '';
        } else if (reference.innerText === '') {
          reference.innerText = '|';
        }
      }, 120);
    }, ttw * 50);
  }

  loadLetter(sentence, refName) {
    let sentenceLength = sentence.length;
    sentence.split('').map((letter, index) => {
      let nextLetter = letter;
      let ttw = this.ttw++;
      let reference = refName;
      let that = this;
      if (index === 0) {
        this.loadCursorBlink(that.refs[reference], this.ttw);
        this.ttw = this.ttw + 10;
        ttw = this.ttw;
      }
      setTimeout(() => {
        if (that.interval) {
          clearInterval(that.interval);
          that.interval = null;
        }
        if (nextLetter === ' ') {
          return that.refs[reference].innerHTML = that.refs[reference].innerHTML + '&nbsp;';
        }
        return that.refs[reference].innerText = that.refs[reference].innerText + nextLetter;
      }, ttw * 50);
      if (index === sentenceLength - 1) {
        this.ttw = this.ttw + 15;
      }
    })
  }

  loadSentence(sentence, index) {
    return(
      <div ref={'line_' + index} className="pad10">
        {this.state.mounted && this.loadLetter(sentence, 'line_'+ index)}
      </div>
    )
  }

  loadIntro() {
    return(
      <div className="textleft fadeInWord">
        {
          introduction.description.map((sentence, index) => {
            return (<div>{this.loadSentence(sentence, index)}</div>)
          })
        }
      </div>
    )
  }

  render() {
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
            <div>
              {this.loadIntro()}
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
