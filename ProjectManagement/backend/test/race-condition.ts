import fetch from "node-fetch";

const url = "http://localhost:4000/auth/v1/signup";

const payload = {
  email: "jemal@test.com",
  password: "123456"
};

async function sendRequest(i:any) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    console.log(i, res.status, data);
  } catch (err:any) {
    console.log(i, "error", err.message);
  }
}

// fire 20 requests at the same time
Promise.all(Array.from({ length: 20 }, (_, i) => sendRequest(i)));