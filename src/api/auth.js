const API_URL = "http://localhost:3333/auth";

export const loginRequest = async (email, password) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json()
  console.log('LOGIN RESPONSE:', data)

  if (!res.ok) throw new Error("Login failed");
  return data;
};

export const registerRequest = async (fullName, email, password) => {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fullName, email, password }),
  });

  if (!res.ok) throw new Error("Register failed");
  return res.json();
};

export const logoutRequest = async (token) => {
  await fetch(`${API_URL}/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const meRequest = async (token) => {
  const res = await fetch("http://localhost:3333/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Not authenticated");
  return res;
};
