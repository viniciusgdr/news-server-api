import { News } from '../../domain/models/news';
import { GetLatestNewsByCountry } from '../../domain/usecases/get-latest-news-by-country';
import { GetLatestNewsByCountryRepository } from '../protocols/get-latest-news-by-country-repository';

export class AppGetLatestNewsByCountry implements GetLatestNewsByCountry {
  constructor (
    private readonly getLatestNewsByCountryRepository: GetLatestNewsByCountryRepository
  ) {}
  async get(country: string): Promise<News[]> {
    const news = await this.getLatestNewsByCountryRepository.get(country)
    return news
  }
}