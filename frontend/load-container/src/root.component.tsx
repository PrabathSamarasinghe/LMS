import "./index.css";
import { mountRootParcel } from "single-spa";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./config/ProtectedRoutes";
import Parcel from "single-spa-react/parcel";
import Layout from "./components/Layout";
import { useMemo, createContext, useContext } from "react";
import { GetRoutes } from "@gtn/utility";

interface LayoutContextType {
  role: string;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const useLayoutContext = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayoutContext must be used within a Layout component");
  }
  return context;
};



const RoleBasedMFE = () => {
  const role = sessionStorage.getItem("role")?.toLocaleLowerCase();

  const { base, mfe, allowedRoutes } = useMemo(() => {
    const routesConfig = GetRoutes(role.toLowerCase());
    return routesConfig;
  }, [role]);


  return (
    <LayoutContext.Provider
      value={{ role }}
    >
      <Layout>
        <Parcel
          key={mfe}
          config={() => System.import(mfe) as Promise<any>}
          mountParcel={mountRootParcel}
          customProps={{ basePath: base, allowedRoutes: allowedRoutes }}
        />
      </Layout>
    </LayoutContext.Provider>
  );
};

export default function Root() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route
          path="/auth/*"
          element={
            <Parcel
              config={() => System.import("@gtn/login-mfe") as Promise<any>}
              mountParcel={mountRootParcel}
            />
          }
        />
        <Route element={<ProtectedRoutes />}>
          <Route path="/*" element={<RoleBasedMFE />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
