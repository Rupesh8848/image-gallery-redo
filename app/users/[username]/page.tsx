import { UnsplashUser } from "@/models/userModel";
import { notFound } from "next/navigation";
import React from "react";

interface PageProps {
  params: { username: string };
}

export async function generateMetadata({ params: { username } }: PageProps) {
  const response = await fetch(
    `https://api.unsplash.com/users/${username}?client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  );
  const user: UnsplashUser = await response.json();

  return {
    title: `${user.first_name} ${user.last_name}'s Profile`,
  };
}

export default async function UserProfile({ params: { username } }: PageProps) {
  const response = await fetch(
    `https://api.unsplash.com/users/${username}?client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  );

  if (response.status === 404) notFound();

  const user: UnsplashUser = await response.json();
  return (
    <div style={{ padding: "3rem" }}>
      <h1>{user.username}</h1>
      <p>First Name: {user.first_name}</p>
      <p>Last Name: {user.last_name}</p>
      <a href={"https://unsplash.com/" + user.username} target="_blank">
        Unsplash profile
      </a>
    </div>
  );
}
