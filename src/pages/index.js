import React from 'react'
import Link from 'gatsby-link'

const BlogPage = ({ data }) => (
  <div>
    <h1>Recent Posts</h1>
    {data.allMarkdownRemark.edges.map(post => (
      <div key={post.node.id}>
        <header className="blogHeading">{post.node.frontmatter.title}</header>
        <small>
          {post.node.frontmatter.date}{' '}{post.node.frontmatter.timeToRead + ' min read'} 
        </small>
        <br />
        <br />
        <p>{post.node.frontmatter.description}</p>
        <div className="link"><Link to={post.node.frontmatter.path}>Read More</Link></div>
        <br />
        <br />
        <hr />
      </div>
    ))}
  </div>
)

export const pageQuery = graphql`
  query BlogIndexQuery {
    allMarkdownRemark {
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

export default BlogPage
