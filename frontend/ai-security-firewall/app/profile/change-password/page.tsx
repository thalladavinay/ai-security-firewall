"use client";

import { useState } from "react";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  async function handleSubmit() {
    await fetch(
      "http://localhost:8000/auth/change-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword,
        }),
      }
    );

    alert("Password changed successfully.");
  }

  return (
    <main className="mx-auto max-w-md p-8">
      <h1 className="mb-6 text-3xl font-bold">
        Change Password
      </h1>

      <input
        type="password"
        placeholder="Current Password"
        className="mb-4 w-full rounded border p-2"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
      />

      <input
        type="password"
        placeholder="New Password"
        className="mb-4 w-full rounded border p-2"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        Change Password
      </button>
    </main>
  );
}