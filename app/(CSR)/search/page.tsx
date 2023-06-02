import React from "react";
import SearchPage from "./SearchPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Page",
};

export default function page() {
  return <SearchPage />;
}
