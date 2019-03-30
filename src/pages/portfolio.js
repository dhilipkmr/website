import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import Layout from '../components/Layout';
import {portfolioDetails} from '../components/constants';
import FadeIn from '../components/FadeIn';


class BlogPageHome extends React.Component{
  constructor(props) {
    super(props);
    this.themer = this.themer.bind(this);
    this.getPrevTheme = this.getPrevTheme.bind(this);
    this.state = {
      theme: null,
      show: false
    }
  }

  componentDidMount() {
    const theme = this.getPrevTheme();
    this.setState({ theme });
    setTimeout(()=>{ this.setState({show: true})}, 650);
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
    const {data} = this.props;
    return (
      <Layout theme={this.state.theme} themer={this.themer}>
        {!this.state.show && <div ref="ff">
          <div className="sideFill"></div>
          <div className="sideFill" style={{ animationDelay: '0.2s'}}></div>
          <div className="sideFill" style={{ animationDelay: '0.4s'}}></div>
        </div>}
        {this.state.show && <div className="themeColorBackground">
          <div className="mw960" ref="content">
            <div className="mB25 padT10 width100 textcenter oh">
              <FadeIn className="fs35 white padT20 inline ">My Journey as </FadeIn>
              <FadeIn className="fs35 white padT20 inline " style={{ 'animationDelay': '0.5s'}}>{ 'a Front-end Engineer'}</FadeIn>
            </div>
            <div className="op0 opAnimator" style={{ 'animationDelay': '1s'}}>
              {Object.keys(portfolioDetails).map((projectType) => (
                <div>
                  <div className="white fb">{projectType}</div>
                  <div className="projectContainer">
                    {portfolioDetails[projectType].map((project) => (
                      <div className="projectCard">
                        <div className="headingTxtColor textcenter fb padB10">{project[0]}</div>
                        {/* <div>{project[1]}</div> */}
                        <div className=" textcenter descriptionTxtColor txtOverflow">{project[2]}</div>
                        <div className="headingTxtColor padT10 textcenter">{project[3]}</div>
                      </div> 
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>}
      </Layout>
    );
  }
}

BlogPageHome.propTypes = {
  data: PropTypes.object,
};

export default BlogPageHome;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC}
    ) {
      edges {
        node {
          id
          frontmatter {
            path
            title
            date(formatString: "MMM DD, YYYY")
            author
            timeToRead
            description
          }
        }
      }
    }
  }
`;