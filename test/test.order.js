const should = require('should')
const express = require('express')
const supertest = require('supertest')
const app = express()
const request = supertest(app)

describe('test order', () => {
  it('create order!', (done) => {
    request.post('/order')
      .send({ goods_id: 1, user_id: 1, amount: 1 })
      .end((err, res) => {
        should.not.exists(err)
        done()
      })
  })
  it('search order!', (done) => {
    request.get('/order')
      .end((err, res) => {
        should.not.exists(err)
        done()
      })
  })
  it('put order!', (done) => {
    request.put('/order/1')
      .send({amount: 2})
      .end((err, res) => {
        should.not.exists(err)
        done()
      })
  })
  it('destroy order!', (done) => {
    request.delete('/order/1')
      .end((err, res) => {
        should.not.exists(err)
        done()
      })
  })
})
