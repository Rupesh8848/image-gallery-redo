"use client";
import { Container } from "react-bootstrap";
export { Container, SSRProvider, Alert, Spinner } from "react-bootstrap";

import React from "react";

export default function BootstrapContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Container>{children}</Container>;
}
