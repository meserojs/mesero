const Sequelize = require('sequelize')

const { Mesero, Model, Controller, Interceptor, Service, router, Middleware } = require('../dist')

const { Table, Field, SQL, Method } = Model

@Model
@Table('user')
@Field('id', {
  type: Sequelize.INTEGER,
  primaryKey: true,
  autoIncrement: true
  })
@Field('name', Sequelize.STRING)
class M {
  @SQL
  findAll () {
    return 'SELECT * FROM `user`'
  }

  @SQL
  findAllAndCount () {
    return ['SELECT COUNT(*) AS count FROM `user`', 'SELECT * FROM `user`']
  }

  @Method
  sayHello () {
    console.log('hello !')
  }
}

@Controller
class C {
  sayHello () {
    return 'hello !'
  }
}

const { ServerBeforeStart, ServerStarted } = Interceptor

@Interceptor
class I1 {
  @ServerBeforeStart
  sayHello1 () {
    console.log('I1, hello1 !')
  }

  @ServerStarted
  sayHello2 () {
    console.log('I1, hello2 !')
  }
};

@Interceptor
class I2 {
  @ServerBeforeStart
  sayHello1 () {
    console.log('I2, hello1 !')
  }

  @ServerStarted
  sayHello2 () {
    console.log('I2, hello2 !')
  }
};

@Service
class S {
  sayHello () {
    console.log('hello !')
  }
}

router.get('/', function (ctx, next) {
  ctx.body = ctx.controller.C.sayHello()
})

router.all('/user/:id', async function (ctx, next) {
  ctx.body = (await ctx.model.M.find({where: {id: ctx.params.id}})) || 'not found user'
})

router.post('/user', async function (ctx, next) {
  ctx.body = (await ctx.model.M.find({where: {id: ctx.request.body.id}})) || 'not found user'
})

router.get('/sql/1', async function (ctx, next) {
  ctx.body = await ctx.model.M.SQL.findAll()
})

router.get('/sql/2', async function (ctx, next) {
  const [ count, users ] = await Promise.all(ctx.model.M.SQL.findAllAndCount())
  ctx.body = {count, users}
})

router.all('/error', function (ctx, next) {
  ctx.error('test error message')
  console.log('not run here')
})

router.get('/ejs', async function (ctx, next) {
  await ctx.render('a', {msg: ctx.controller.C.sayHello()})
})

router.get('/store', async function (ctx, next) {
  !ctx.store.code && (ctx.store.code = 0)
  ctx.body = ++ctx.store.code
})

router.get('/jwt/sign/:code', async function (ctx, next) {
  ctx.body = ctx.jwt.sign(ctx.params.code)
})

router.get('/jwt/verify/:token', async function (ctx, next) {
  ctx.body = ctx.jwt.verify(ctx.params.token)
})

router.get('/session', async function (ctx, next) {
  !ctx.session.code && (ctx.session.code = 0)
  ctx.body = ++ctx.session.code
})

router.get('/io', async function (ctx, next) {
  ctx.body = !!ctx.io
})

Middleware.add((app, config) => async (ctx, next) => {
  console.log('middle ware 1')
  await next()
})

Middleware.add((app, config) => console.log('middle ware 2'))

const mesero = new Mesero()

mesero.start()
