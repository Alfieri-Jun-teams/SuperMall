const should = require('should')
const express = require('express')
const supertest = require('supertest')
const app = express()
const request = supertest(app)

describe('test user', () => {
  it('create user!', (done) => {
    request.post('/users')
      .send({ phone: '13800008888', password: 'supermall123', username: 'super' })
      .end((err, res) => {
        should.not.exists(err)
        done()
      })
  })
  it('search user!', (done) => {
    request.get('/users')
      .end((err, res) => {
        should.not.exists(err)
        done()
      })
  })
  it('put user!', (done) => {
    request.put('/users/1')
      .send({password: 'supermall123'})
      .end((err, res) => {
        should.not.exists(err)
        done()
      })
  })
  it('destroy user!', (done) => {
    request.delete('/users/1')
      .end((err, res) => {
        should.not.exists(err)
        done()
      })
  })
})
