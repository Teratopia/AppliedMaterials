module.exports = {
  pathPrefix: `/interactive-proxy`,

  siteMetadata: {
    title: `Applied Materials`,
    description: `Notice of 2020 Annual Meeting of Shareholders and Proxy Statement`,
    author: `@samullman`,
  },

  
  
  plugins: [
    
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-csp`,
    `gatsby-transformer-remark`,
    
    {
      resolve: `gatsby-plugin-csp`,
      options: {
        mergeStyleHashes: false, 
        directives: {
          "style-src": "'self' 'unsafe-inline'",
          "img-src": "'self'",
          "default-src": "'none'", 
          "script-src": "'self'", 
          "connect-src": "'self'", 
          "img-src": "'self'",
          "style-src": 'self',
          "font-src": 'self',
        }
      }
    },
    

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },


    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/board`,
      },
    },

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data`,
      },
    },

    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `applied-materials-proxy-2020`,
        short_name: `applied-materials`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/applied-icon.png`, // This path is relative to the root of the site.
      },
    },
    
    // `gatsby-plugin-offline`,


  ],
}
