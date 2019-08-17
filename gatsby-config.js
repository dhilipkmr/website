module.exports = {
  siteMetadata: {
    title: `Dhilip's Journey | dhilipkmr`,
    description: `Dhilip's website. A developer's Journey -- dhilipkmr`,
    author: `dhilipkmr`,
    keywords: ['dhilipkmr', 'dhilip dev', 'dev dhilip', 'dhilip blog', 'react blogs', 'frontend blogs'],
    ogType: 'website',
    ogUrl: 'https://www.dhilipkmr.dev',
    lang: 'en'
  },
  pathPrefix: '/',
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      }
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Dhilip's Journey`,
        short_name: `Dhilip's Journey`,
        start_url: `/`,
        background_color: `#1f1f1f`,
        theme_color: `#235bc1`,
        display: `minimal-ui`,
        icon: `src/assets/profilePic.png`,
        theme_color_in_head: false,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          'gatsby-remark-copy-images',
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              inlineCodeMarker: '÷',
            },
          },
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
            }
          }
        ]
      }
    }
  ]
}
