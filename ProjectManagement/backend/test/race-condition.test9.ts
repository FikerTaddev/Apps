import { describe, it, expect } from "vitest";
import fetch from "node-fetch";

const url = "http://localhost:4000/auth/v1/signup";

const payload = (i: number) => ({
  email: `jemal+${i}@test.com`,
  password: "123456",
});

async function sendRequest(i: number) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload(i)),
    });

    const data = await res.json();

    return {
      index: i,
      status: res.status,
      data,
    };
  } catch (err: any) {
    return {
      index: i,
      error: err.message,
    };
  }
}

describe("POST /auth/v1/signup (concurrent requests)", () => {
  it("should handle 20 concurrent signup attempts correctly", async () => {
    const results = await Promise.all(
      Array.from({ length: 20 }, (_, i) => sendRequest(i))
    );

    // Debug if needed
    // console.log(results);

    const success = results.filter(r => r.status === 200 || r.status === 201);
    const conflicts = results.filter(r => r.status === 409);
    const errors = results.filter(r => "error" in r);

    // Core expectations (adjust based on your backend logic)
    
    // 1. At least one request should succeed
    expect(success.length).toBeGreaterThan(0);

    // 2. Duplicate requests should be rejected (if your API enforces uniqueness)
    expect(conflicts.length + success.length).toBe(results.length);

    // 3. No unexpected runtime/network errors
    expect(errors.length).toBe(0);
  });
});