import React from 'react';
import { graphql, Link } from 'gatsby';
import Toggle from '../components/Toggle';
import BlogFooter from '../components/BlogFooter';

export default function Template({ data }) {
  const post = data.markdownRemark;
  const otherPosts = data.allMarkdownRemark.edges;
  return (
    <div className="blogText lh2em lr05">
      <div className="mw960 pad10">
        <Link to="/" className="backHomeHeader top38 themeColor fb"><span className="backIcon">{'<'}</span>Dhilip's Blogs</Link>
          <Toggle/>
          <div className="marginB20">
            <h1>{post.frontmatter.title}</h1>
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
