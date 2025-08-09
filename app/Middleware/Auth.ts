
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ApiKeyAuth {
  public async handle ({ request, response }: HttpContextContract, next: () => Promise<void>) {
    const provided = request.header('x-api-key')
    const expected = process.env.API_KEY
    if (!expected || provided !== expected) {
      return response.unauthorized({ message: 'Unauthorized' })
    }
    await next()
  }
}
