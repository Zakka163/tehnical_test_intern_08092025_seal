// app/Validators/QuestionValidator.ts
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class QuestionValidator {
  public schema = schema.create({
    question: schema.string({}, [rules.trim(), rules.minLength(1)]),
    session_id: schema.string.optional({}, [rules.trim(), rules.maxLength(255)]),
  })

  public messages = {
    'question.required': 'Pertanyaan wajib diisi',
    'question.minLength': 'Pertanyaan terlalu pendek',
  }
}
