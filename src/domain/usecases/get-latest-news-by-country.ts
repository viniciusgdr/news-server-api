import { News } from '../models/news';

export interface GetLatestNewsByCountry {
  get: (country: string) => Promise<News[]>
}