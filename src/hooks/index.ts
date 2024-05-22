import type { ImageStrapi } from '@/types'
import { apiImgs } from '@/envs'

const imagesApi = import.meta.env.PUBLIC_STRAPI_IMAGES || apiImgs

export const getStrapiImage = (url: string) => `${imagesApi}${url}`
export const getInfoFromImg = (img: ImageStrapi) => {
  const url = getStrapiImage(img.data.attributes.url)
  const alt = img.data.attributes.alternativeText

  return { url, alt }
}
