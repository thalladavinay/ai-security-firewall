"use client";

import { useEffect, useState } from "react";

type UserProfile = {
  id: number;
  username: string;
  email: string;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    async function loadProfile() {
      const token = localStorage.getItem("token");

      if (!token) return;

      const response = await fetch(
        "http://localhost:8000/auth/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) return;

      const data = await response.json();
      setProfile(data);
    }

    loadProfile();
  }, []);

  if (!profile) {
    return (
      <div className="p-8 text-white">
        Loading profile...
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-3xl p-4 md:p-8">
      <h1 className="mb-8 text-2xl md:text-4xl font-bold text-white">
        My Profile
      </h1>

      <div className="rounded-xl bg-slate-900 p-6 space-y-4">
        <div>
          <p className="text-gray-400">Username</p>
          <p className="text-white text-lg">
            {profile.username}
          </p>
        </div>

        <div>
          <p className="text-gray-400">Email</p>
          <p className="text-white text-lg">
            {profile.email}
          </p>
        </div>
      </div>
    </main>
  );
}