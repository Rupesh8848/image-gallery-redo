import { UnsplashImage } from "@/models/unsplash-image";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Tilt } from "@/components/Tilt";

export async function generateMetadata() {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  );

  const image: UnsplashImage = await response.json();

  return {
    title: image.description,
  };
}

export default async function StaticPage() {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  );

  const image: UnsplashImage = await response.json();

  const width = Math.min(500, image.width);
  const height = (width / image.width) * image.height;

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div
        style={{
          width: "80vw",
          backgroundColor: "#CFE1FF",
          color: "#164090",
          padding: "1rem 2rem",
          marginTop: "1rem",
        }}
      >
        This image below is fetched and cached in server at build time and then
        the static page is generated and sent to the users browser.
      </div>
      <Tilt glareEnable={true} glareColor="#ffffff" glareMaxOpacity={0.7}>
        <Image
          src={image.urls.raw}
          width={width}
          height={height}
          alt={image.description}
          style={{
            borderRadius: "10px",
            minWidth: 100,
            minHeight: 100,
            margin: "1rem 0",
          }}
        />
      </Tilt>
      by{" "}
      <Link href={`/users/${image.user.username}`}>{image.user.username}</Link>
    </div>
  );
}
