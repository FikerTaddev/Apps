import request from "supertest";
import { app } from "../../app.js";
import { beforeAll, it, expect,describe } from "vitest";



let token: string;
let projectId: number;
let issueId: number;


  const testUser = {
    email: `test_${Date.now()}@example.com`,
    password: '123456'
  }


beforeAll(async () => {
  // signup
  await request(app)
    .post("/auth/v1/signup")
    .send(testUser);

  // login
  const loginRes = await request(app)
    .get("/auth/v1/signin")
    .send(testUser);

  token = loginRes.body.token.data;

  // workspace
  const wsRes = await request(app)
    .post("/workspaces")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: `Issue Workspace_${Date.now()}`,
      description: "test workspace",
    });
  

  const workspaceId = wsRes.body.workspace.id;
  

  // project
  const projectRes = await request(app)
    .post(`/workspaces/${workspaceId}/projects`)
    .set("Authorization",`Bearer ${token}`)
    .send({
      name: "Issue Project",
    });
 
  projectId = projectRes.body.Project.id;
});

describe("Issues Integration", () => {

  it("should create an issue", async () => {
    const res = await request(app)
      .post(`/projects/${projectId}/issues`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Fix login bug",
        description: "Login fails intermittently",
      });
    
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("Issues");
    expect(res.body.Issues.title).toBe("Fix login bug");

    issueId = res.body.Issues.id;
  
  });

  it("should fetch all issues for a project", async () => {
    const res = await request(app)
      .get(`/projects/${projectId}/issues`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should fetch single issue", async () => {
    const res = await request(app)
      .get(`/projects/${projectId}/issues/${issueId}`)
      .set("Authorization", `Bearer ${token}`);
    
    expect(res.status).toBe(200);
    expect(res.body.Issue.id).toBe(issueId);
  });

  it("should update issue", async () => {
    const res = await request(app)
      .patch(`/projects/${projectId}/issues`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        status: "done",
      });
    
    expect(res.status).toBe(200);
    expect(res.body.Issues.status).toBe("done");
  });

  it("should reject invalid status update", async () => {
    const res = await request(app)
      .patch(`/projects/${projectId}/issues`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        
        status: "invalid_status",
      });

    expect(res.status).toBe(500);
  });

  it("should fail without auth", async () => {
    const res = await request(app)
      .get(`/projects/${projectId}/issues`);

    expect(res.status).toBe(500);
  });
});