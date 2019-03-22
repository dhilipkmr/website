import React from 'react'
import Link from 'gatsby-link'

export default function Template({ data }) {
  const post = data.markdownRemark

  return (
    <div className="blogText pad5 lh2em">
      <Link to="/">Go Back</Link>
      <hr />
      <h1>{post.frontmatter.title}</h1>
      <div>
        <i className="ico13">Published on {post.frontmatter.date}</i>
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
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
