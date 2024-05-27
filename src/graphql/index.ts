import type { HeaderInfo } from '../components/Nav'
import type { ImageStrapi } from '@/types'

interface IconText {
  icon: ImageStrapi
  text: string
}

type TypesContent =
  | 'ComponentComponentesImagenPrincipal'
  | 'ComponentComponentesSeccionBms'

interface PageContent {
  __typename: TypesContent
  mobile: ImageStrapi
  desk: ImageStrapi
  btnTexto: string
  link: string
  titulo: string
  barra: ImageStrapi
  barraMobil: ImageStrapi
  texto: string
}

export interface Pages {
  attributes: {
    titulo: string
    slug: string
    descripcion?: string
    imagen?: ImageStrapi
    contenido?: PageContent[]
  }
}

export interface FooterInfo {
  line: ImageStrapi
  footerInfo1: IconText
  footerInfo2: IconText
  links: { texto: string; link: string }[]
}

const backApi =
  import.meta.env.PUBLIC_STRAPI_ENV ||
  'https://staging.qantamedia.com/isa/api/graphql'

const getHeader = async () => {
  try {
    const responseHeader = await fetch(backApi, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
        query {
  header {
    data {
      attributes {
        logo {
          data {
            attributes {
              url 
              alternativeText
            }
          }
        }
        logoMobil {
          data {
            attributes {
              url 
              alternativeText
            }
          }
        }
        botonHamburguesa {
          data {
            attributes {
              url 
              alternativeText
            }
          }
        }
        xBtn {
          data {
            attributes {
              url 
              alternativeText
            }
          }
        }
        links {
          texto
          link
        }
        linksSociales {
          link 
          icono {
            data {
              attributes {
                url
                alternativeText
              }
            }
          }
        }
      }
    }
  }
}
      `,
      }),
    })

    const { data } = await responseHeader.json()
    const headerInfo: HeaderInfo = data.header.data.attributes

    return headerInfo
  } catch (error) {
    console.error(error)
    return null
  }
}

const getFooter = async () => {
  try {
    const responseFooter = await fetch(backApi, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
        query {
  footer {
    data {
      attributes {
        line {
          data {
            attributes {
              url
              alternativeText
            }
          }
        }
        footerInfo1 {
          icon {
            data {
              attributes {
                url 
                alternativeText
              }
            }
          }
          text
        }
        footerInfo2 {
          icon {
            data {
              attributes {
                url 
                alternativeText
              }
            }
          }
          text
        }
        links {
          texto
          link
        }
      }
    }
  }
}
      `,
      }),
    })

    const { data } = await responseFooter.json()
    const footerInfo: FooterInfo = data.footer.data.attributes

    return footerInfo
  } catch (error) {
    console.error(error)
    return null
  }
}

const getPages = async () => {
  try {
    const responsePages = await fetch(backApi, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
        query {
  pages {
    data {
      id 
      attributes {
        titulo
        slug
        descripcion
        imagen {
          data {
            attributes {
              url
              alternativeText
            }
          }
        }
        contenido {
          __typename
          ... on ComponentComponentesImagenPrincipal {
            mobile {
              data {
                attributes {
                  url 
                  alternativeText
                }
              }
            }
            desk {
              data {
                attributes {
                  url 
                  alternativeText
                }
              }
            }
            btnTexto
            link
          }
          ... on ComponentComponentesSeccionBms {
            titulo
            barra {
              data {
                attributes {
                  url 
                  alternativeText
                }
              }
            }
            texto
            barraMobil {
              data {
                attributes {
                  url 
                  alternativeText
                }
              }
            }
          }
        }
      }
    }
  }
}
      `,
      }),
    })

    const { data } = await responsePages.json()
    const pagesInfo: Pages[] = data.pages.data

    return pagesInfo
  } catch (error) {
    console.error(error)
    return null
  }
}

export { getHeader, getFooter, getPages }
