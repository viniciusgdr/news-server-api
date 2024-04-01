import { AppGetLatestNewsByCountry } from '../../data/usecases/app-get-latest-news-by-country';
import { NewsAPIRepository } from '../../infra/app/newsapi/newsapi';
import { GetLatestNewsByCountryController } from '../../presentation/controllers/get-latest-news-by-country';
import { Controller } from '../../presentation/protocols/controller';

export const makeGetLatestNewsByCountryController = (): Controller => {
  const getLatestNewsByCountryRepository = new NewsAPIRepository()
  const getLatestNewsByCountry = new AppGetLatestNewsByCountry(getLatestNewsByCountryRepository)
  return new GetLatestNewsByCountryController(getLatestNewsByCountry)
}