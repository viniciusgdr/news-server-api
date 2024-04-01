export interface GetLatestNewsByCountryRepository {
  get: (country: string) => Promise<GetLatestNewsByCountryRepository.Result[]>
}

export namespace GetLatestNewsByCountryRepository {
  export type Result = {
    title: string
    description: string
    author: string
    url: string
    urlToImage: string
    publishedAt: string
    content: string
    sourceName: string
  }
}