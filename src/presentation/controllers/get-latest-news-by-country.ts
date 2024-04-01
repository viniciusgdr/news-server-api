import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { badRequest, ok, serverError } from '../helpers/http-helper'
import { MissingParamError } from '../errors/missing-param-error'
import { GetLatestNewsByCountry } from '../../domain/usecases/get-latest-news-by-country'

export class GetLatestNewsByCountryController implements Controller {
  constructor (
    private readonly getLatestNewsByCountry: GetLatestNewsByCountry
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { country } = httpRequest.body
      if (!country) {
        return badRequest(new MissingParamError('country'))
      }
      const news = await this.getLatestNewsByCountry.get(country)
      return ok(news)
    } catch (error: any) {
      return serverError(error)
    }
  }
}