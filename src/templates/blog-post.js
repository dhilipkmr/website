import React from 'react';
import { graphql, Link } from 'gatsby';
import Toggle from '../components/Toggle';
import BlogFooter from '../components/BlogFooter';

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
    const {theme} = this.state;
    return (
      <div className="blogText lh2em lr05">
        <div className="mw960 pad10">
          <Link to="/" className="backHomeHeader top38 themeColor fb opAnimator"><span className="backIcon">{'<'}</span>Dhilip's Blogs</Link>
            <Toggle theme={theme} themer={this.themer} />
            <div className="marginB20">
              <h1 className="opAnimator">{post.frontmatter.title}</h1>
            </div>
            <div  className="marginB20">
              <i className="ico13">Published on {post.frontmatter.date}</i>
            </div>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
        <BlogFooter posts={otherPosts}/>
        {/* <div className="marginB20">
          <Link to="/" className="backHomeHeader marginB20 themeColor"><span className="backIcon">{'<'}</span>Dhilip's Blogs</Link>
        </div> */}
      </div>
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
        date
      }
    }
    allMarkdownRemark(filter: {frontmatter:{ path: { ne: $path } }}){
      edges{
        node{
          frontmatter {
            title
            date
            description
            timeToRead
            path
          }
        }
      }
    }
  }
`
