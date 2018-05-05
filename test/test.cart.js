const should = require('should')
const express = require('express')
const supertest = require('supertest')
const app = express()
const request = supertest(app)

describe('test cart', () => {
  it('create cart!', (done) => {
    request.post('/cart')
      .send({ goods_id: 1, user_id: 1, amount: 2 })
      .end((err, res) => {
        should.not.exists(err)
        done()
      })
  })
  it('search cart!', (done) => {
    request.get('/cart')
      .end((err, res) => {
        should.not.exists(err)
        done()
      })
  })
  it('put cart!', (done) => {
    request.put('/cart/1')
      .send({amount: 2})
      .end((err, res) => {
        should.not.exists(err)
        done()
      })
  })
  it('destroy cart!', (done) => {
    request.delete('/cart/1')
      .end((err, res) => {
        should.not.exists(err)
        done()
      })
  })
})
