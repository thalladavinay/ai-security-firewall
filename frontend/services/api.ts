const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:8000";

// Upload File API
export async function uploadFile(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/scan`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Upload failed");
  }

  return response.json();
}

// Login API
export async function loginUser(
  email: string,
  password: string
) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json();
}