"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptor"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/applyDecoratedDescriptor"));

var _dec, _dec2, _dec3, _class, _class2, _class3, _class4, _class5, _class6, _class7, _class8;

const Sequelize = require('sequelize');

const {
  default: {
    Mesero,
    Model,
    Controller,
    Interceptor,
    Service,
    router
  }
} = require('../dist');

const {
  Table,
  Field,
  SQL,
  Method
} = Model;
let M = (_dec = Table('user'), _dec2 = Field('id', {
  type: Sequelize.INTEGER,
  primaryKey: true,
  autoIncrement: true
}), _dec3 = Field('name', Sequelize.STRING), Model(_class = _dec(_class = _dec2(_class = _dec3(_class = (_class2 = class M {
  findAll() {
    return 'SELECT * FROM `user`';
  }

  sayHello() {
    console.log('hello !');
  }

}, ((0, _applyDecoratedDescriptor2.default)(_class2.prototype, "findAll", [SQL], (0, _getOwnPropertyDescriptor.default)(_class2.prototype, "findAll"), _class2.prototype), (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "sayHello", [Method], (0, _getOwnPropertyDescriptor.default)(_class2.prototype, "sayHello"), _class2.prototype)), _class2)) || _class) || _class) || _class) || _class);

let C = Controller(_class3 = class C {
  sayHello() {
    return 'hello !';
  }

}) || _class3;

const {
  ServerBeforeStart,
  ServerStarted
} = Interceptor;

let I1 = Interceptor(_class4 = (_class5 = class I1 {
  sayHello1() {
    console.log('I1, hello1 !');
  }

  sayHello2() {
    console.log('I1, hello2 !');
  }

}, ((0, _applyDecoratedDescriptor2.default)(_class5.prototype, "sayHello1", [ServerBeforeStart], (0, _getOwnPropertyDescriptor.default)(_class5.prototype, "sayHello1"), _class5.prototype), (0, _applyDecoratedDescriptor2.default)(_class5.prototype, "sayHello2", [ServerStarted], (0, _getOwnPropertyDescriptor.default)(_class5.prototype, "sayHello2"), _class5.prototype)), _class5)) || _class4;

;

let I2 = Interceptor(_class6 = (_class7 = class I2 {
  sayHello1() {
    console.log('I2, hello1 !');
  }

  sayHello2() {
    console.log('I2, hello2 !');
  }

}, ((0, _applyDecoratedDescriptor2.default)(_class7.prototype, "sayHello1", [ServerBeforeStart], (0, _getOwnPropertyDescriptor.default)(_class7.prototype, "sayHello1"), _class7.prototype), (0, _applyDecoratedDescriptor2.default)(_class7.prototype, "sayHello2", [ServerStarted], (0, _getOwnPropertyDescriptor.default)(_class7.prototype, "sayHello2"), _class7.prototype)), _class7)) || _class6;

;

let S = Service(_class8 = class S {
  sayHello() {
    console.log('hello !');
  }

}) || _class8;

router.get('/', function (ctx, next) {
  ctx.body = ctx.controller.C.sayHello();
});
router.all('/user/:id', async function (ctx, next) {
  ctx.body = (await ctx.model.M.find({
    where: {
      id: ctx.params.id
    }
  })) || 'not found user';
});
router.post('/user', async function (ctx, next) {
  ctx.body = (await ctx.model.M.find({
    where: {
      id: ctx.request.body.id
    }
  })) || 'not found user';
});
router.all('/error', function (ctx, next) {
  ctx.error('test error message');
  console.log('not run here');
});
router.get('/ejs', async function (ctx, next) {
  await ctx.render('a', {
    msg: ctx.controller.C.sayHello()
  });
});
router.get('/store', async function (ctx, next) {
  !ctx.store.code && (ctx.store.code = 0);
  ctx.body = ++ctx.store.code;
});
const mesero = new Mesero();
mesero.start();
