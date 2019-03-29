import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import ContactMe from '../components/ContactMe';
import Header from '../components/header';
import Layout from '../components/Layout';

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
          <div className=" margin10">
            <Header/>
          </div>
          {/* <div className="mh60vh">
            <ContactMe theme={this.state.theme}/>
          </div> */}
          <div className="moveInAnimate  margin20 lh2em opAnimator mt50" style={{ 'animationDelay': '0.5s'}}>
            {data.allMarkdownRemark.edges.map(post => (
              <Link to={post.node.frontmatter.path} key={post.node.frontmatter.path}>
                <div key={post.node.id} className="marginB70">
                  <header className="blogHeading blogTopicTxtColor">{post.node.frontmatter.title}</header>
                  <div className="blogDesc">
                    <div className="descriptionTxtColor">
                      <span className="inbl fs16 blogDesc">{post.node.frontmatter.date}{' '}</span>
                      <span className="inbl padL20 fs16 blogDesc">{'  ~ ' + post.node.frontmatter.timeToRead + ' min read'}</span>
                    </div>
                    <div className="descriptionTxtColor padT15 ">{post.node.frontmatter.description}</div>
                    <div className="padT15"><div className="descriptionTxtColor fs16 blogDesc">Read More</div></div>
                  </div>
                </div>
              </Link>
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