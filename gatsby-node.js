const graphql = require(`graphql`)
const path = require(`path`)

exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions
    
    const result = await graphql(
        `
          {
            members: markdownRemark(frontmatter: { title: { eq: "board" } }) {
                frontmatter {
                  members {
                    name
                    title
                    type
                    since
                    age
                    otherBoards {
                      title 
                    }
                    boardComittees {
                      title
                    } 
                    keyQualifications {
                      title
                    }
                    bio
                    slug
                    image {
                      childImageSharp {
                        fluid {
                            base64
                            tracedSVG
                            aspectRatio
                            src
                            srcSet
                            srcWebp
                            srcSetWebp
                            sizes
                            originalImg
                            originalName
                            presentationWidth
                            presentationHeight
                        }
                      }
                    }
                  }
                }
              }
          }
        `
      )

      if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`)
        return
      }

      const member = path.resolve(`src/templates/member.js`)
    
      result.data.members.frontmatter.members.forEach(( node, idx ) => {
        createPage({
          path: "/board/" + node.slug,
          component: member,
          context: {
            node, idx, members: result.data.members.frontmatter.members
          },
        })
      })
}
