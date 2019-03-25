import React from 'react'
import { Link, graphql } from 'gatsby';
import Avatar from '../components/Avatar';
import ContactMe from '../components/ContactMe';
import Header from '../components/header';
import Layout from '../components/Layout';

class BlogPageHome extends React.Component{
  constructor(props) {
    super(props);
    this.themer = this.themer.bind(this);
    this.state = {
      theme: this.themer()
    }
  }

  themer() {
    /*  During initialization */
    if (!this.state && typeof(window) !== 'undefined') {
      const themeName = window.localStorage.getItem('dkBlogTheme');
      if (!themeName || (themeName !== 'light' && themeName !=='dark')) {
        console.log('log1 set light');
        window.localStorage.setItem('dkBlogTheme', 'light');
        document.body.classList.add('light');
        return 'light'
      }
      document.body.classList.add(themeName);
      return themeName;
    }
    /* All other calls to themer */
    if (this.state) {
      console.log('log2 set');
      const oldTheme = this.state.theme;
      const newTheme = (oldTheme === 'dark') ? 'light' : 'dark';
      if (oldTheme && typeof(window) !== 'undefined') {
        console.log('log3 set');
        const {body} = document;
        body.classList.add(newTheme);
        body.classList.remove(oldTheme);
        this.setState({ theme: newTheme});
        window.localStorage.setItem('dkBlogTheme', newTheme);
        return newTheme;
      }
    }
    console.log('log4 set');
  }

  render() {
    const {data} = this.props;
    return (
      <Layout>
        <div className="mw960">
          <div className=" margin10">
            <Header theme={this.state.theme} themer={this.themer}/>
          </div>
          <div className="mh60vh">
            <Avatar/>
            <ContactMe theme={this.state.theme}/>
          </div>
          <div className="margin20 lh2em mt50">
            {data.allMarkdownRemark.edges.map(post => (
              <Link to={post.node.frontmatter.path}>
                <div key={post.node.id} className="marginB70">
                  <header className="blogHeading blogTopicTxtColor">{post.node.frontmatter.title}</header>
                  <div className="descriptionTxtColor">
                    <span className="inbl fs16">{post.node.frontmatter.date}{' '}</span>
                    <span className="inbl padL20 fs16">{'  ~ ' + post.node.frontmatter.timeToRead + ' min read'}</span>
                  </div>
                  <div className="descriptionTxtColor padT15">{post.node.frontmatter.description}</div>
                  <div className="padT15"><div className="descriptionTxtColor fs16">Read More</div></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Layout>
    );
  }
}
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
            date
            author
            timeToRead
            description
          }
        }
      }
    }
  }
`

export default BlogPageHome;