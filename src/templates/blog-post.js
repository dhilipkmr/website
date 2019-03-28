import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout';
import Toggle from '../components/Toggle';
import BlogFooter from '../components/BlogFooter';
import EndOfBlogOptions from '../components/EndOfBlogOptions';

export default class Template extends React.Component {
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
        window.localStorage.setItem('dkBlogTheme', 'light');
        document.body.classList.add('light');
        return 'light'
      }
      document.body.classList.add(themeName);
      return themeName;
    }
    /* All other calls to themer */
    if (this.state) {
      const oldTheme = this.state.theme;
      const newTheme = (oldTheme === 'dark') ? 'light' : 'dark';
      if (oldTheme && typeof(window) !== 'undefined') {
        const {body} = document;
        body.classList.add(newTheme);
        body.classList.remove(oldTheme);
        this.setState({ theme: newTheme});
        window.localStorage.setItem('dkBlogTheme', newTheme);
        return newTheme;
      } 
    }
  }

  render() {
    const post = this.props.data.markdownRemark;
    const otherPosts = this.props.data.allMarkdownRemark.edges;
    const blogEndData = {
      title: post.frontmatter.title,
      path: post.frontmatter.path
    };
    const {theme} = this.state;
    return (
      <Layout>
        <div className="blogText lh2em lr05">
          <div className="mw960 pad10 ">
            <Link to="/" className="backHomeHeader top38 themeColor fb opAnimator"><span className="backIcon">{'<'}</span>Dhilip's Blogs</Link>
              <Toggle theme={theme} themer={this.themer} />
              <div className="marginB20">
                <h1 className="opAnimator">{post.frontmatter.title}</h1>
              </div>
              <div  className="marginB20">
                <i className="ico13 descriptionTxtColor">Published on {post.frontmatter.date}</i>
              </div>
              <div className="descriptionTxtColor">
                <div dangerouslySetInnerHTML={{ __html: post.html }} />
              </div>
          </div>
          <EndOfBlogOptions data={blogEndData}/>
          <BlogFooter posts={otherPosts}/>
          {/* <div className="marginB20">
            <Link to="/" className="backHomeHeader marginB20 themeColor"><span className="backIcon">{'<'}</span>Dhilip's Blogs</Link>
          </div> */}
        </div>
      </Layout>
    )
  }
}

export const postQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
        author
        date(formatString: "MMM DD, YYYY")
      }
    }
    allMarkdownRemark(limit:3, filter: {frontmatter:{ path: { ne: $path } }}){
      edges{
        node{
          frontmatter {
            title
            date(formatString: "MMM DD, YYYY")
            description
            timeToRead
            path
          }
        }
      }
    }
  }
`
