// Anything exported from this file is importable by other in-browser modules.
import routeConfig from "./routes/routes.config.json"
import InputField from "./components/InputField";
import DropDownField from "./components/DropDownField";

export function publicApiFunction() {}

export { default as useAuth } from '../../member-mfe/src/hooks/useAuth';

export { default as GridParcel } from './components/GridParcel';
export type { GridParcelProps } from './components/GridParcel';
export { default as routeConfig } from './routes/routes.config.json';

const GetRoutes = (role: String) => {
    const roleConfig = routeConfig[role.toUpperCase()];
    return roleConfig;
}

export { GetRoutes };
export { InputField };
export { DropDownField };