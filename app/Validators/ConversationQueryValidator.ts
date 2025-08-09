import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const ConversationValidator = {
  indexQuery: schema.create({
    page: schema.number.optional([rules.range(1, 9999)]),
    limit: schema.number.optional([rules.range(1, 100)]),
    sesion_id: schema.string.optional({}, [rules.trim()]),
    q: schema.string.optional({}, [rules.trim()]),
    sort: schema.enum.optional(['id', 'created_at', 'updated_at'] as const),
    order: schema.enum.optional(['asc', 'desc'] as const),
  }),
  idParam: schema.create({
    id: schema.number(),
  }),

  messages: {
    'page.range': 'Halaman minimal 1',
    'limit.range': 'Limit maksimal 100',
    'sort.enum': 'Sort hanya: id, created_at, updated_at',
    'order.enum': 'Order hanya: asc atau desc',
    'id.number': 'Param id harus angka',
    'id.required': 'Param id harus diisi',
  },
}
