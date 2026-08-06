"use client";

import { useEffect, useState } from "react";

type UserProfile = {
  id: number;
  username: string;
  email: string;
  is_active?: boolean;
  is_admin?: boolean;
  email_verified?: boolean;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProfile() {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Please login first.");
          setLoading(false);
          return;
        }

        const response = await fetch(
          "http://127.0.0.1:8000/profile/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.detail || "Failed to load profile."
          );
        }

        setProfile(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unable to load profile.");
        }
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-white">
        Loading profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-red-400">
        {error}
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="p-8 text-white">
        No profile found.
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-3xl p-6 text-white">
      <h1 className="mb-8 text-4xl font-bold text-cyan-400">
        My Profile
      </h1>

      <div className="space-y-5 rounded-2xl border border-slate-800 bg-slate-900 p-8">

        <div>
          <p className="text-sm text-slate-400">
            Username
          </p>

          <p className="text-xl font-semibold">
            {profile.username}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-400">
            Email
          </p>

          <p className="text-xl font-semibold">
            {profile.email}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-400">
            Email Verified
          </p>

          <p
            className={
              profile.email_verified
                ? "text-green-400"
                : "text-red-400"
            }
          >
            {profile.email_verified
              ? "Verified"
              : "Not Verified"}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-400">
            Account Status
          </p>

          <p
            className={
              profile.is_active
                ? "text-green-400"
                : "text-red-400"
            }
          >
            {profile.is_active
              ? "Active"
              : "Disabled"}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-400">
            Role
          </p>

          <p className="text-cyan-400">
            {profile.is_admin
              ? "Administrator"
              : "User"}
          </p>
        </div>

      </div>
    </main>
  );
}