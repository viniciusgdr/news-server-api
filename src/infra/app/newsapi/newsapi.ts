import fetch from 'node-fetch'
import { GetLatestNewsByCountryRepository } from '../../../data/protocols/get-latest-news-by-country-repository'

const tempNewsArticles: {
  articles: GetLatestNewsByCountryRepository.Result[]
  latestUpdated: Date
  country: string
}[] = []

const ONE_HOUR = 60 * 60 * 1000

export class NewsAPIRepository implements GetLatestNewsByCountryRepository {
  async get(country: string): Promise<GetLatestNewsByCountryRepository.Result[]> {
    const tempNewsArticle = tempNewsArticles.find(article => article.country === country)
    if (tempNewsArticle && new Date().getTime() - tempNewsArticle.latestUpdated.getTime() < ONE_HOUR) {
      return tempNewsArticle.articles
    }
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${process.env.NEWS_API_KEY}`)
    const data = await response.json()
    if (!Array.isArray(data.articles)) {
      return []
    }

    if (tempNewsArticle) {
      tempNewsArticle.articles = data.articles
      tempNewsArticle.latestUpdated = new Date()
    } else {
      tempNewsArticles.push({
        articles: data.articles,
        latestUpdated: new Date(),
        country
      })
    }
    return data.articles.map((article: any) => ({
      title: article.title,
      author: article.author,
      description: article.description,
      url: article.url,
      urlToImage: article.urlToImage,
      publishedAt: article.publishedAt,
      content: article.content,
      sourceName: article.source.name
    }))
  }
}