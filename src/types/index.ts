export interface ImageStrapi {
  data: {
    attributes: {
      url: string
      alternativeText?: string
    }
  }
}

export interface ImageContent {
  url: string
  alt?: string
}
