import { describe, it, expect } from 'vitest'
import request from 'supertest'
import { app } from '../../app.js'

describe('Auth Integration Flow', () => {
  it('should complete full auth lifecycle (signup → login → profile)', async () => {
    const email = `test_${Date.now()}@example.com`
    const password = '123456'

    // 1. SIGNUP
    const signupRes = await request(app)
      .post('/auth/v1/signup')
      .send({ email, password })

    expect(signupRes.status).toBe(201)
    expect(signupRes.body).toHaveProperty('token')

    const signupToken = signupRes.body.token

    // 2. LOGIN
    const loginRes = await request(app)
      .post('/auth/v1/signin')
      .send({ email, password })

    expect(loginRes.status).toBe(200)
    expect(loginRes.body).toHaveProperty('token')

    const token = loginRes.body.token

    // 3. PROFILE WITH TOKEN
    const profileRes = await request(app)
      .get('/profile')
      .set('Authorization', `Bearer ${token}`)

    expect(profileRes.status).toBe(200)
    expect(profileRes.body).toHaveProperty('user')

    // 4. PROFILE WITHOUT TOKEN (NEGATIVE CASE)
    const noTokenRes = await request(app)
      .get('/profile')

    expect(noTokenRes.status).toBe(401)
  })
})