const should = require('should')
const express = require('express')
const supertest = require('supertest')
const app = express()
const request = supertest(app)

describe('test admin login', () => {
  it('login sucessfully!', (done) => {
    request.post('/admin/login')
      .send({ phone: '18585855858', password: 'supermall123' })
      .end((err, res) => {
        should.not.exists(err)
        done()
      })
  })
  it('login failed!', (done) => {
    request.post('/admin/login')
      .send({ phone: '18585855858', password: '' })
      .end((err, res) => {
        should.not.exists(err)
        done()
      })
  })
})
