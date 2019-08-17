/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ description, lang, meta, keywords, title, ogUrl, ogType, image }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author,
            keywords,
            ogUrl,
            ogType,
            image,
            lang
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description
  const metaTitle = title || site.siteMetadata.title;
  const metaType = ogType || site.siteMetadata.ogType;
  const metaUrl = ogUrl || site.siteMetadata.ogUrl;
  const metaImage = image || site.siteMetadata.image;
  const metaLang = site.siteMetadata.lang || 'en';
  return (
    <Helmet
      htmlAttributes={{
        lang: metaLang
      }}
      title = {metaTitle}
      meta={[
        { name: `description`, content: metaDescription },
        { property: `og:title`, content: metaTitle },
        { property: `og:description`, content: metaDescription },
        { property: `og:type`, content: metaType },
        { property: `og:url`, content: metaUrl },
        { property: 'og:image', content: metaImage },
        { property: `twitter:title`, content: metaTitle },
        { property: 'twitter:description',content: metaDescription },
        { name: 'robots', content: 'index, follow'}
      ].concat(
        keywords.length > 0 ?
        {
          name: `keywords`,
          content: keywords.join(`, `),
        }
        : []
        )
        .concat(meta)
      }
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
}

export default SEO
