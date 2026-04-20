
import { describe, it, expect } from 'vitest'
import request from 'supertest'
import { app } from '../../app.js'
import { get } from 'node:http'

describe('Workspace Integration', () => {
  it('should create and fetch user workspaces', async () => {
    const email = `ws_${Date.now()}@example.com`
    const password = '123456'

    
    const signup = await request(app)
      .post('/auth/v1/signup')
      .send({ email, password })

    const token = signup.body.token.data

    const createRes = await request(app)
      .post('/workspaces')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: `Test workspace_${Date.now()}`,
        description: 'This is a Test workspace'
      })
    
    expect(createRes.status).toBe(201)
    expect(createRes.body).toHaveProperty('workspace')

   
    const getRes = await request(app)
      .get('/workspaces') 
      .set('Authorization', `Bearer ${token}`)
      console.log(getRes.error)
    expect(getRes.status).toBe(200)
    expect(Array.isArray(getRes.body.workspaces)).toBe(true)
  })

  it('should fail without auth', async () => {
    const res = await request(app)
      .post('/workspaces')
      .send({
        name: 'No Auth',
        description: 'fail case'
      })

    expect(res.status).toBe(500)
  })
})
