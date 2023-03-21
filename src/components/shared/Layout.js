import React from "react";
import { DataProvider } from "../../context/PostContext";

import Navigation from "./Navigation";
import Container from "./Container";
import { Outlet } from "react-router-dom";
export default function Layout() {
  return (
    <>
      <Navigation />
      <Container>
        <DataProvider>
          <main className="container-fluid main-content">
            <Outlet />
          </main>
        </DataProvider>
      </Container>
    </>
  );
}
