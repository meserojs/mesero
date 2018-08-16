const { default: { Mesero, Model, Controller, Interceptor, Service } } = require('../dist')

const { Table, Field, SQL, Method } = Model

@Model
@Table('A')
@Field('id', String)
class A {
  @SQL
  sql () {
    return ''
  }

  @Method
  sayHello () {
    console.log('hello !')
  }
}

@Controller
class C {
  sayHello () {
    console.log('hello !')
  }
}

const { ServerBeforeStart, ServerStarted } = Interceptor

@Interceptor
class I {
  @ServerBeforeStart
  sayHello1 () {
    console.log('hello1 !')
  }

  @ServerBeforeStart
  sayHello2 () {
    console.log('hello2 !')
  }

  @ServerStarted
  sayHello3 () {
    console.log('hello3 !')
  }
}

@Service
class S {
  sayHello () {
    console.log('hello !')
  }
}

new Mesero()
