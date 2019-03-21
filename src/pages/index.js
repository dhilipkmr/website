import React from 'react'
import Link from 'gatsby-link'

const BlogPage = ({ data }) => (
  <div>
    <div className="margin20 mt10 lh2em">
      {/* <h1 className="headingTxtColor">Recent Posts</h1> */}
      {data.allMarkdownRemark.edges.map(post => (
        <div key={post.node.id} className="marginB70">
          <header className="blogHeading blogTopicTxtColor">{post.node.frontmatter.title}</header>
          <small className="descriptionTxtColor">
            {post.node.frontmatter.date}{' '}{post.node.frontmatter.timeToRead + ' min read'} 
          </small>
          <div className="descriptionTxtColor padT15">{post.node.frontmatter.description}</div>
          <div><Link to={post.node.frontmatter.path} className="readMoreLink">Read More</Link></div>
        </div>
      ))}
    </div>
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
