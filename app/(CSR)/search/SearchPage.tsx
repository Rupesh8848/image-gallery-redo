"use client";
import { UnsplashImage } from "@/models/unsplash-image";
import Image from "next/image";
import React, { FormEvent, Suspense } from "react";
import { Button, Form, FormGroup } from "react-bootstrap";
import styles from "../../topics/[topic]/TopicPage.module.css";

export default function SearchPage() {
  const [searchResults, setSearchResults] = React.useState<
    null | UnsplashImage[]
  >(null);

  const [searchResultsLoading, setSearchResultsLoading] = React.useState(false);
  const [searchResultsLoadingIsError, setSearchResultsLoadingIsError] =
    React.useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const query = formData.get("query")?.toString().trim();

    if (query) {
      try {
        setSearchResults(null);
        setSearchResultsLoadingIsError(false);
        setSearchResultsLoading(true);
        const response = await fetch("/api/search?query=" + query);
        const images: UnsplashImage[] = await response.json();
        setSearchResults(images);
      } catch (error) {
        console.log(error);
        setSearchResultsLoadingIsError(true);
      } finally {
        setSearchResultsLoading(false);
      }
    }
  }

  return (
    <div style={{ padding: "3rem" }}>
      <Form onSubmit={handleSubmit}>
        <FormGroup controlId="search-input">
          <Form.Label>Search Query</Form.Label>
          <Form.Control
            name="query"
            placeholder="eg cats, dogs, buildings..."
          />
        </FormGroup>
        <Button type="submit" disabled={searchResultsLoading}>
          Search
        </Button>
      </Form>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {searchResultsLoading && <p>Loading...</p>}
        {searchResultsLoadingIsError && (
          <p>Something is wrong. Please try agian.</p>
        )}
        {searchResults?.length === 0 && (
          <p>Nothing found. Try a different query.</p>
        )}
      </div>
      {searchResults && (
        <>
          {searchResults.map((image) => (
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
        </>
      )}
    </div>
  );
}
