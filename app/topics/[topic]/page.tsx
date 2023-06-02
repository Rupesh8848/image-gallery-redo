import { UnsplashImage } from "@/models/unsplash-image";
import styles from "./TopicPage.module.css";

import Image from "next/image";
import { Suspense } from "react";
interface PageProps {
  params: {
    topic: string;
  };
}

export async function generateMetadata({ params: { topic } }: PageProps) {
  return {
    title: `${topic.charAt(0).toUpperCase() + topic.slice(1)} Image Gallery`,
  };
}

//this functions pre builds heath, fitness and coding site (static)
//this only works after building the project
export function genereateStaticParams() {
  return ["health", "fitness", "coding"].map((topic) => ({ topic }));
}

export default async function UserInputImage({ params: { topic } }: PageProps) {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?query=${topic}&count=30&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  );

  const images: UnsplashImage[] = await response.json();

  console.log(images);
  return (
    <div>
      <h1>{topic}</h1>
      {images.map((image) => (
        <Suspense fallback={<strong>Loading...</strong>}>
          <Image
            src={image.urls.raw}
            width={250}
            height={250}
            alt={image.description}
            key={image.urls.raw}
            className={styles.image}
          />
        </Suspense>
      ))}
    </div>
  );
}
