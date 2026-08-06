const API_URL = "http://localhost:8000";

export async function getJob(jobId: string) {
  const response = await fetch(`${API_URL}/jobs/${jobId}`);

  if (!response.ok) {
    throw new Error("Unable to fetch job status");
  }

  return response.json();
}