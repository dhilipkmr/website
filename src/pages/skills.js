import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/Layout';
import FadeIn from '../components/FadeIn';
import {technicalSkills1, technicalSkills2} from '../components/constants';

class Skills extends React.Component{
  constructor(props) {
    super(props);
    this.themer = this.themer.bind(this);
    this.getPrevTheme = this.getPrevTheme.bind(this);
    this.renderHalf = this.renderHalf.bind(this);
    this.state = {
      theme: null
    }
  }

  componentDidMount() {
    const theme = this.getPrevTheme();
    this.setState({ theme });
    setTimeout(() => {
      this.setState({loadWidth: true});
    }, 500);
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

  renderHalf(second) {
    const {loadWidth} = this.state;
    const toMap = second ? technicalSkills2 : technicalSkills1;
    return(
      <div>
        {toMap.map((skill) => {
          return (
            <div className="pad5 " key={skill[0]}>
              <div className="dflex flexspacebetween">
                <div>{skill[0]}</div>
                <div>{skill[1]}</div>
              </div>
              <div className="paddingTB10">
                <div className="whiteborder  posRel marginTB10"></div>
                <div className=" posRel blueborder zeroWidthAnimation" style={{bottom: '2px',width: (!loadWidth ? '0' : skill[1])}}></div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
  render() {
    return (
      <Layout className="mh100" theme={this.state.theme} themer={this.themer}>
        <div>
          <div className="mh90vh">
            <div className="width100 textcenter oh">
              <FadeIn className=" fs35 fadeInWord ">Technical Skills</FadeIn>
            </div>
            <div className="skillCard marginT50">
              <div className="widthhalf">
                {this.renderHalf()}
              </div>
              <div className="widthhalf">
                {this.renderHalf(true)}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

Skills.propTypes = {
  data: PropTypes.object,
};

export default Skills;
