import React from 'react'
import Link from 'gatsby-link'

const BlogPage = ({ data }) => (
  <div>
    <div className="margin20">
      {/* <h1 className="headingTxtColor">Recent Posts</h1> */}
      {data.allMarkdownRemark.edges.map(post => (
        <div key={post.node.id}>
          <header className="blogHeading blogTopicFont blogTopicTxtColor">{post.node.frontmatter.title}</header>
          <small className="descriptionTxtColor">
            {post.node.frontmatter.date}{' '}{post.node.frontmatter.timeToRead + ' min read'} 
          </small>
          <br />
          <br />
          <p className="descriptionTxtColor">{post.node.frontmatter.description}</p>
          <div><Link to={post.node.frontmatter.path} className="readMoreLink">Read More</Link></div>
          <br />
          <hr />
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
