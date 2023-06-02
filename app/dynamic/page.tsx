import { UnsplashImage } from "@/models/unsplash-image";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Tilt } from "@/components/Tilt";

//this is SSR page
export async function generateMetadata() {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  );

  const image: UnsplashImage = await response.json();

  return {
    title: image.description,
  };
}

//this means dont cache the image i.e. the image gets fetched on each request.This is the only difference between static and dynamic page
//this revalidate can also be added in other ways
// export const revalidate = 0;

export default async function DynamicPage() {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_ACCESS_KEY}`,
    {
      //thses three properties have same effect as revalidate=0
      //   cache: "no-cache",
      //   cache: "no-store",
      //next is an obj
      next: { revalidate: 0 },
    }
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
        This image below is fetched but not cached in server and then on every
        request the api is called and new image is requested and fetched again.
      </div>
      <Tilt>
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
            boxShadow: "2px 2px 5px black",
          }}
        ></Image>
      </Tilt>
      by{" "}
      <Link href={`/users/${image.user.username}`}>{image.user.username}</Link>
    </div>
  );
}
