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
          "style-src": "'self' 'unsafe-inline' fonts.googleapis.com appliedmaterials.com amatsmartdev.prod.acquia-sites.com",
          "img-src": "'self' data: blob: appliedmaterials.com amatsmartdev.prod.acquia-sites.com",
          "default-src": "'self' appliedmaterials.com amatsmartdev.prod.acquia-sites.com", 
          "script-src": "'self' 'unsafe-eval' appliedmaterials.com amatsmartdev.prod.acquia-sites.com", 
          "connect-src": "'self' appliedmaterials.com amatsmartdev.prod.acquia-sites.com", 
          "worker-src": "'self' blob: appliedmaterials.com amatsmartdev.prod.acquia-sites.com",
          "script-src-elem": "'self' blob: localhost 'unsafe-inline' unpkg.com temp-applied-link.netlify.com appliedmaterials.com amatsmartdev.prod.acquia-sites.com",
          "font-src": "'self' data: fonts.gstatic.com appliedmaterials.com amatsmartdev.prod.acquia-sites.com",
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
