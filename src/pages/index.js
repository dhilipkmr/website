import React from 'react'
import { Link, graphql } from 'gatsby';
import Avatar from '../components/Avatar';
import ContactMe from '../components/ContactMe';
import Header from '../components/header';
import Layout from '../components/Layout';

const BlogPageHome = ({ data }) => (
  <Layout>
    <div>
      <div className=" margin10">
        <Header />
      </div>
      <div className="mh60vh">
        <Avatar/>
        <ContactMe/>
      </div>
      <div className="margin20 mt10 lh2em">
        {data.allMarkdownRemark.edges.map(post => (
          <div key={post.node.id} className="marginB70">
            <header><Link to={post.node.frontmatter.path} className="blogHeading blogTopicTxtColor">{post.node.frontmatter.title}</Link></header>
            <div className="descriptionTxtColor">
              <span className="inbl fs16">{post.node.frontmatter.date}{' '}</span>
              <span className="inbl padL20 fs16">{'  ~ ' + post.node.frontmatter.timeToRead + ' min read'}</span>
            </div>
            <div className="descriptionTxtColor padT15">{post.node.frontmatter.description}</div>
            <div className="padT15"><Link to={post.node.frontmatter.path} className="readMoreLink fs16">Read More</Link></div>
          </div>
        ))}
      </div>
    </div>
  </Layout>
)

export const pageQuery = graphql`
  query {
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

export default BlogPageHome;