import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoutes = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = sessionStorage.getItem('GTNLibrary');
        const role = sessionStorage.getItem('role')?.toLocaleLowerCase();
        if (token) {
            try {
                const decodedToken: any = jwtDecode(token);
                const currentTime = Date.now() / 1000;
                if (decodedToken.exp < currentTime) {
                    setIsAuthenticated(false);
                    setUserRole(null);
                    setLoading(false);
                    return;
                }
            } catch (error) {
                setIsAuthenticated(false);
                setUserRole(null);
                setLoading(false);
                return;
            }
        }
        setIsAuthenticated(!!token);
        setUserRole(role);
        setLoading(false);
    }, []);

    if (loading) return null;

    if (!isAuthenticated) {
        return <Navigate to="/auth/signin" />;
    }

    if (window.location.pathname === '/') {
        return <Navigate to={`/${userRole}/dashboard`} />;
    }

    if (window.location.pathname === `/${userRole} ` || window.location.pathname === `/${userRole}/`) {
        return <Navigate to={`/${userRole}/dashboard`} />;
    }

    return <Outlet />;
}

export default ProtectedRoutes
