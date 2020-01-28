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
    `gatsby-plugin-typescript`,
    // `gatsby-plugin-csp`,
    `gatsby-transformer-remark`,
    
    {
      resolve: `gatsby-plugin-csp`,
      options: {
        mergeStyleHashes: false, 
        directives: {
          "style-src": "'self' 'unsafe-inline' 'https://fonts.googleapis.com/css?family=Open+Sans&display=swap'",
          "img-src": "'self' 'data:image/png;base64,*'",
          "default-src": "'self'", 
          "script-src": "'self'", 
          "connect-src": "'self'", 
          "img-src": "'self'",
          "font-src": "'self' 'static/*' 'https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFWZ0bf8pkAp6a.woff2'",
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
