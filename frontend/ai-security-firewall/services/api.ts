const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:8000";

function getAuthHeaders(): HeadersInit {
  if (typeof window === "undefined") {
    return {};
  }

  const token = localStorage.getItem("token");

  return token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};
}

// Upload File
export async function uploadFile(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/upload`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: formData,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.detail || "Upload failed.");
  }

  return data;
}

// Login
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

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.detail || "Login failed.");
  }

  return data;
}

// Register
export async function registerUser(user: {
  username: string;
  email: string;
  password: string;
}) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const data = await response.json().catch(() => ({}));

if (!response.ok) {
  let message = "Registration failed.";

  if (typeof data.detail === "string") {
    message = data.detail;
  } else if (Array.isArray(data.detail)) {
    message = data.detail.map((e: any) => e.msg).join(", ");
  }

  throw new Error(message);
}

  return data;
}

// Dashboard Stats
export async function getDashboardStats() {
  const response = await fetch(`${API_URL}/dashboard/stats/`, {
    headers: getAuthHeaders(),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.detail || "Unable to load dashboard.");
  }

  return data;
}

// Recent Scans
export async function getRecentScans() {
  const response = await fetch(`${API_URL}/dashboard/recent`, {
    headers: getAuthHeaders(),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.detail || "Unable to load recent scans.");
  }

  return data;
}


// History
export async function getScanHistory() {
  const response = await fetch(`${API_URL}/history/`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.detail || "Failed to load scan history.");
  }

  return data;
}