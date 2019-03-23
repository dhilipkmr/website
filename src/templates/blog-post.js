import React from 'react';
import { graphql, Link } from 'gatsby';
import Toggle from '../components/Toggle';

export default function Template({ data }) {
  const post = data.markdownRemark

  return (
    <div className="blogText pad5 lh2em mw960 lr05">
      <Link to="/" className="backHomeHeader top38 themeColor"><span className="backIcon">{'<'}</span>Dhilip's Blogs</Link>
      <Toggle/>
      <div className="marginB20">
        <h1>{post.frontmatter.title}</h1>
      </div>
      <div  className="marginB20">
        <i className="ico13">Published on {post.frontmatter.date}</i>
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
      <div className="marginB20">
        <Link to="/" className="backHomeHeader marginB20 themeColor"><span className="backIcon">{'<'}</span>Dhilip's Blogs</Link>
      </div>
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
  }
`
