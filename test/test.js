const Sequelize = require('sequelize')

const { default: { Mesero, Model, Controller, Interceptor, Service, router } } = require('../dist')

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

router.all('/error', function (ctx, next) {
  ctx.error('test error message')
  console.log('not run here')
})

router.get('/ejs', async function (ctx, next) {
  await ctx.render('a', {msg: ctx.controller.C.sayHello()})
})

const mesero = new Mesero()

mesero.start()
