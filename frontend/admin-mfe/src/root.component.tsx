import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
export default function Root(props: any) {
  const { basePath, allowedRoutes } = props.customProps || {};

  const Lazy = (path: String) => {
    return lazy(() => import(`./pages/${path}`));
  };

  return (
    <BrowserRouter basename={basePath}>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {allowedRoutes &&
            allowedRoutes.map(
              (routes: { path: string; component: string }, index: number) => {
                const Component = Lazy(routes.component);
                return (
                  <Route
                    key={index}
                    path={routes.path}
                    element={<Component />}
                  />
                );
              }
            )}
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
