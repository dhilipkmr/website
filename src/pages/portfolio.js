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
      theme: null
    }
  }

  componentDidMount() {
    const theme = this.getPrevTheme();
    this.setState({ theme });
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
        <div className="mw960">
          <div className="mB25 width100 textcenter oh">
            <FadeIn className="fs35 fadeInWord pad5 padT20" style={{ 'animationDelay': '0'}}>My Journey as a Front-end Engineer</FadeIn>
          </div>
          <div className=" op0 opAnimator" style={{ 'animationDelay': '0.5s'}}>
            {Object.keys(portfolioDetails).map((projectType) => (
              <div>
                <div>{projectType}</div>
                <div className="projectContainer">
                  {portfolioDetails[projectType].map((project) => (
                    <div className="projectCard">
                      <div className="themeColor textcenter fb padB10">{project[0]}</div>
                      {/* <div>{project[1]}</div> */}
                      <div className="textcenter descriptionTxtColor">{project[2]}</div>
                      <div className="textcenter descriptionTxtColor">{project[3]}</div>
                    </div> 
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
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