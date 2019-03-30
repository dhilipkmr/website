import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import Layout from '../components/Layout';
import {ABOUTME, portfolioDetails} from '../components/constants';
import FadeIn from '../components/FadeIn';
import {TiThMenu} from 'react-icons/ti';

class Blogs extends React.Component{
  constructor(props) {
    super(props);
    this.themer = this.themer.bind(this);
    this.getPrevTheme = this.getPrevTheme.bind(this);
    this.state = {
      theme: null
    }
  }

  componentDidMount() {
    const theme = this.getPrevTheme();
    this.setState({ theme });
  }

  getPrevTheme() {
    return window.__dkBlogTheme;
  }
  
  themer() {
    /* All other calls to themer */
    const oldTheme = this.state.theme;
    const newTheme = (oldTheme === 'dark') ? 'light' : 'dark';
    if (typeof(window) !== 'undefined') {
      this.setState({ theme: newTheme});
      document.body.className = newTheme;
      window.__dkBlogTheme = newTheme;
      window.localStorage.setItem('dkBlogTheme', newTheme);
    }
  }

  updatePost() {

  }

  loadDetails(nodeId, postNumber, content) {
    const {data} = this.props;
    console.log(nodeId);
    this.setState({
      selectedId : nodeId,
      post: content
    });
  }
  render() {
    const {data} = this.props;
    const {selectedId = '', post} = this.state;
    console.log(post);
    return (
      <Layout className="mh100" theme={this.state.theme} themer={this.themer}>
        <div>
          <div className="mh100vh">
            <div className="inbl mh100vh"></div>
            <div className="inbl posRel width60 skillDesc fillUpFromZero mw100" style={{'animationDelay': '0.2s'}}>
              {/* <TiThMenu className=" posAbs themeBg mv" style={{"top":"20px", "left": "20px"}}/> */}
              <div className="posAbs transCenter mw90" style={{ 'maxWidth': '100%'}}>
                {post &&
                  <Link className="" to={post.path}>
                    <div className="themeBg padB10 fb fs35 lh2em textcenter " style={{ textAlign: 'left', textTransform: 'uppercase'}}>{post.title}</div>
                    <div className="themeBg padT10 padB10" style={{fontSize: '13px'}}>{post.description}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                      <div className="themeBg padL10" style={{fontSize: '13px'}}>{post.timeToRead + ' min read'}</div>
                      <div className="themeBg inbl padR10" style={{fontSize: '13px'}}>Read more</div>
                    </div>
                  </Link>
                }
              </div>
            </div>
            <div className="inbl posRel width40 fillUpFromZero mw100" style={{'animationDelay': '0s'}}>
              <div className="posAbs transCenter lh2em " style={{ 'width': '100%', 'margin': '10px'}}>
                <div className="posRel mh40scroll">
                  {
                    data.allMarkdownRemark.edges.map((post, index) => {
                      const { id, frontmatter} = post.node;
                      if (index === 0 && !this.state.post) {
                        this.setState({ post: frontmatter, selectedId: id });
                      }
                      return (
                        <div className={'themeColor padB10 hand textright padR20p  ' + ((selectedId === id) ? 'fb' : '')} onClick={() => {this.loadDetails(id, index + 1, frontmatter)}}>{frontmatter.smallTitle}</div>
                      )
                    })
                  }
                  </div>
                </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

Blogs.propTypes = {
  data: PropTypes.object,
};

export default Blogs;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC}
    ) {
      edges {
        node {
          id
          frontmatter {
            path
            title
            date(formatString: "MMM DD, YYYY")
            author
            timeToRead
            description
            smallTitle
          }
        }
      }
    }
  }
`;