/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

// start/routes.ts


Route.group(() => {
  Route.post('/questions', 'QuestionController.store').middleware('apiKey')
  Route.get('/conversations', 'ConversationsController.index').middleware('apiKey')
  Route.get('/conversations/:id', 'ConversationsController.show').middleware('apiKey')
  Route.delete('/conversations/:id', 'ConversationsController.destroy').middleware('apiKey')
  Route.delete('/messages/:id', 'MessagesController.destroy').middleware('apiKey')
}).prefix('/api')
