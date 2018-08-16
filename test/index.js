"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptor"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/applyDecoratedDescriptor"));

var _dec, _dec2, _class, _class2, _class3, _class4, _class5, _class6;

const {
  default: {
    Mesero,
    Model,
    Controller,
    Interceptor,
    Service
  }
} = require('../dist');

const {
  Table,
  Field,
  SQL,
  Method
} = Model;
let A = (_dec = Table('A'), _dec2 = Field('id', String), Model(_class = _dec(_class = _dec2(_class = (_class2 = class A {
  sql() {
    return '';
  }

  sayHello() {
    console.log('hello !');
  }

}, ((0, _applyDecoratedDescriptor2.default)(_class2.prototype, "sql", [SQL], (0, _getOwnPropertyDescriptor.default)(_class2.prototype, "sql"), _class2.prototype), (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "sayHello", [Method], (0, _getOwnPropertyDescriptor.default)(_class2.prototype, "sayHello"), _class2.prototype)), _class2)) || _class) || _class) || _class);

let C = Controller(_class3 = class C {
  sayHello() {
    console.log('hello !');
  }

}) || _class3;

const {
  ServerBeforeStart,
  ServerStarted
} = Interceptor;

let I = Interceptor(_class4 = (_class5 = class I {
  sayHello1() {
    console.log('hello1 !');
  }

  sayHello2() {
    console.log('hello2 !');
  }

  sayHello3() {
    console.log('hello3 !');
  }

}, ((0, _applyDecoratedDescriptor2.default)(_class5.prototype, "sayHello1", [ServerBeforeStart], (0, _getOwnPropertyDescriptor.default)(_class5.prototype, "sayHello1"), _class5.prototype), (0, _applyDecoratedDescriptor2.default)(_class5.prototype, "sayHello2", [ServerBeforeStart], (0, _getOwnPropertyDescriptor.default)(_class5.prototype, "sayHello2"), _class5.prototype), (0, _applyDecoratedDescriptor2.default)(_class5.prototype, "sayHello3", [ServerStarted], (0, _getOwnPropertyDescriptor.default)(_class5.prototype, "sayHello3"), _class5.prototype)), _class5)) || _class4;

let S = Service(_class6 = class S {
  sayHello() {
    console.log('hello !');
  }

}) || _class6;

new Mesero();
