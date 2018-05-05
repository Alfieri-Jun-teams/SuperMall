const should = require('should')
const express = require('express')
const supertest = require('supertest')
const app = express()
const request = supertest(app)

describe('test goods', () => {
  it('create goods!', (done) => {
    request.post('/goods')
      .send({ serial: 'A0000201805051342', name: '芒果', price: '39.90', description: '海南大芒果' })
      .end((err, res) => {
        should.not.exists(err)
        done()
      })
  })
  it('search goods!', (done) => {
    request.get('/goods')
      .end((err, res) => {
        should.not.exists(err)
        done()
      })
  })
  it('put goods!', (done) => {
    request.put('/goods/1')
      .send({name: '海南大芒果'})
      .end((err, res) => {
        should.not.exists(err)
        done()
      })
  })
  it('destroy goods!', (done) => {
    request.delete('/goods/1')
      .end((err, res) => {
        should.not.exists(err)
        done()
      })
  })
})
