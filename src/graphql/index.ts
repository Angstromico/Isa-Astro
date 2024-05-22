import type { HeaderInfo } from 'c/Nav'
import { api } from '@/envs'

const backApi = import.meta.env.PUBLIC_STRAPI_ENV || api
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

export { getHeader }
