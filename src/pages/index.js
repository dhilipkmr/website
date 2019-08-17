import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '../components/Avatar';
import ContactMe from '../components/ContactMe';
import Layout from '../components/Layout';
import FadeIn from '../components/FadeIn';
import SEO from '../components/seo';

class BlogPageHome extends React.Component{
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

  render() {
    const {title, description, lang, keywords, ogUrl, ogType} = this.props;
    return (
      <Layout className="mh100" theme={this.state.theme} themer={this.themer}>
        <SEO title={title} description={description} lang={lang}keywords={keywords} ogUrl={ogUrl} ogType={ogType}/>
        <div className="mw960">
          <div className=" margin10 textcenter">
            <div className="mB10 width100 textcenter oh">
              <FadeIn className="ico20 inline " style={{ animationDelay: '0.1s', lineHeight: '1.7em'}}>hey,</FadeIn>
              <FadeIn className="ico20 inline " style={{ animationDelay: '0.15s', lineHeight: '1.7em'}}>{' I\'m'}</FadeIn>
            </div>
            <div className="mB25 width100 textcenter oh">
              <FadeIn className="fs40 inbl " style={{ animationDelay: '0.2s', lineHeight: '1.7em'}}>Dhilip</FadeIn>
            </div>
          </div>
          <div className="mt35">
            <Avatar/>
            <ContactMe theme={this.state.theme}/>
          </div>
        </div>
      </Layout>
    );
  }
}

BlogPageHome.propTypes = {
  data: PropTypes.object,
};

export default BlogPageHome;

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title,
        description,
        keywords,
        ogUrl,
        ogType
      }
    }
  }
`
