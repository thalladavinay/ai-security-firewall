// const API_URL =
//   process.env.NEXT_PUBLIC_API_URL ??
//   "http://localhost:8000";

const API_URL = "http://127.0.0.1:8000";

// ==========================
// Auth Header
// ==========================
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

// ==========================
// Handle API Response
// ==========================
async function handleResponse(response: Response) {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.detail || "Something went wrong."
    );
  }

  return data;
}

// ==========================
// Upload File
// ==========================
export async function uploadFile(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(`${API_URL}/upload`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: formData,
    });

    return await handleResponse(response);
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    throw error;
  }
}

// ==========================
// Login
// ==========================
export async function loginUser(
  email: string,
  password: string
) {
  try {
    const response = await fetch(
      `${API_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await handleResponse(response);

    if (data.access_token) {
      localStorage.setItem(
        "token",
        data.access_token
      );
    }

    return data;
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    throw error;
  }
}

// ==========================
// Register
// ==========================
export async function registerUser(user: {
  username: string;
  email: string;
  password: string;
}) {
  try {
    const response = await fetch(
      `${API_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );

    return await handleResponse(response);
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    throw error;
  }
}

// ==========================
// Dashboard Stats
// ==========================
export async function getDashboardStats() {
  const response = await fetch(
    `${API_URL}/dashboard/stats`,
    {
      headers: getAuthHeaders(),
    }
  );

  return handleResponse(response);
}

// ==========================
// Recent Scans
// ==========================
export async function getRecentScans() {
  const response = await fetch(
    `${API_URL}/dashboard/recent`,
    {
      headers: getAuthHeaders(),
    }
  );

  return handleResponse(response);
}

// ==========================
// Scan History
// ==========================
export async function getScanHistory() {
  const response = await fetch(
    `${API_URL}/history`,
    {
      headers: getAuthHeaders(),
    }
  );

  return handleResponse(response);
}

// ==========================
// Risk Trend
// ==========================
export async function getRiskTrend() {
  const response = await fetch(
    `${API_URL}/analytics/risk-trend`,
    {
      headers: getAuthHeaders(),
    }
  );

  return handleResponse(response);
}

// ==========================
// Notifications
// ==========================
export async function getNotifications() {
  const response = await fetch(
    `${API_URL}/notifications`,
    {
      headers: getAuthHeaders(),
    }
  );

  return handleResponse(response);
}

// ==========================
// Job Status
// ==========================
export async function getJob(
  jobId: string | number
) {
  const response = await fetch(
    `${API_URL}/jobs/${jobId}`,
    {
      headers: getAuthHeaders(),
    }
  );

  return handleResponse(response);
}