import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const SigninPage = lazy(() => import("./pages/SigninPage"));

export default function Root() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/auth/signin" element={<SigninPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
