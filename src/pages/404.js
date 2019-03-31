import React from "react"

import {Link} from 'gatsby';
import Layout from "../components/Layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <div className="posRel">
      <div className="marginT50">
        <h1 className="">NOT FOUND</h1>
        <div className="textcenter">
          <h2>Please choose a Page to Go to:</h2>
          <Link to='/' className="dbl pad10 linkHand">Home</Link>
          <Link to='/blogs' className="dbl pad10 linkHand">Blogs</Link>
          <Link to='/portfolio' className="dbl pad10 linkHand">Portfolio</Link>
          <Link to='/skills' className="dbl pad10 linkHand">Skills</Link>
        </div>
      </div>
    </div>
  </Layout>
)

export default NotFoundPage
