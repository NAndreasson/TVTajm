import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ShowSearchPage } from "./pages/ShowSearchPage.tsx";
import { ShowPage } from "./pages/ShowPage.tsx";
import { LandingPage } from "./pages/LandingPage.tsx";
import "./index.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { NotFoundPage } from "./pages/404Page.tsx";
import { SITE_NAME } from "./siteConfig.ts";

function HelmetWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Helmet>
        <title>{SITE_NAME}</title>
      </Helmet>
      {children}
    </>
  );
}
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/shows",
    element: <ShowSearchPage />,
  },
  {
    path: "/shows/:id",
    element: <ShowPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

// TODO: wrap in ErrorBoundary

export function App() {
  return (
    <React.StrictMode>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <HelmetWrapper>
            <RouterProvider router={router} />
          </HelmetWrapper>
        </QueryClientProvider>
      </HelmetProvider>
    </React.StrictMode>
  );
}
