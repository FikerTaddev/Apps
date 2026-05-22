
import { describe, it, expect } from 'vitest'
import request from 'supertest'
import { app } from '../../app.js'

describe('Auth Integration', () => {
  const testUser = {
    email: `test_${Date.now()}@example.com`,
    password: '123456'
  }

  let token: string

  it('should signup user', async () => {
    const res = await request(app)
      .post('/auth/v1/signup')
      .send(testUser)

    // adjust based on your API response shape
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('token')

    token = res.body.token
  })

  it('should login user', async () => {
    const res = await request(app)
      .get('/auth/v1/signin')
      .send(testUser)

    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('token')

    token = res.body.token
  })

  it('should fail login with wrong password', async () => {
    const res = await request(app)
      .post('/auth/v1/signin')
      .send({
        email: testUser.email,
        password: 'wrongpassword'
      })

    expect(res.status).toBe(401)
  })

  it('should access protected route', async () => {
    const res = await request(app)
      .get('/profile')
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('user')
  })

  it('should fail protected route without token', async () => {
    const res = await request(app)
      .get('/profile')

    expect(res.status).toBe(401)
  })
})
