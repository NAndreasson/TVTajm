import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Shows } from "./pages/Shows.tsx";
import { Show } from "./pages/Show.tsx";
import { Landing } from "./pages/Landing.tsx";
import "./index.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { NotFoundPage } from "./pages/404Page.tsx";

function HelmetWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Helmet>
        <title>TVtajm</title>
      </Helmet>
      {children}
    </>
  );
}
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/shows",
    element: <Shows />,
  },
  {
    path: "/shows/:id",
    element: <Show />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

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
