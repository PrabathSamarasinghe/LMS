import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { signIn, completeNewPassword } from "../cognito/auth";
import { useNavigate } from "react-router-dom";
import ErrorDisplay from "../components/ErrorDisplay";
import LoginForm from "../components/LoginForm";
import NewPasswordForm from "../components/NewPasswordForm";
import RightSidePanel from "../components/RightSidePanel";

const SigninPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userObj, setUserObj] = useState<any>(null);
  const [isNewPassword, setIsNewPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await signIn(username, password);
      if ('newPasswordRequired' in result && result.newPasswordRequired) {
        setUserObj(result.user);
        setIsNewPassword(true);
      } else {
        const authResult = result as any;
        const decoded = jwtDecode<any>(authResult.idToken);
    
        const role = decoded["custom:role"];
        sessionStorage.setItem("role", role);
        sessionStorage.setItem("userId", decoded.sub);
        sessionStorage.setItem("idToken", authResult.idToken);
        sessionStorage.setItem("GTNLibrary", authResult.accessToken);
        sessionStorage.setItem("refreshToken", authResult.refreshToken);
        navigate(`/${role.toLowerCase()}/dashboard`);
      }
    } catch (e: any) {
      setError(e.message || "Login failed");
      console.error("Login error:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetPassword = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await completeNewPassword(userObj, newPassword);
      const decoded = jwtDecode<any>(result.idToken);
      const role = decoded["custom:role"];
      sessionStorage.setItem("role", role);
      sessionStorage.setItem("userId", decoded.sub);
      sessionStorage.setItem("idToken", result.idToken);
      sessionStorage.setItem("GTNLibrary", result.accessToken);
      sessionStorage.setItem("refreshToken", result.refreshToken);
      navigate(`/${role.toLowerCase()}/dashboard`);
    } catch (e: any) {
      setError(e.message || "Password setup failed");
      console.error("Password setup error:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const passwordMismatch = newPassword && confirmPassword && newPassword !== confirmPassword;

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center ">
      <div className="min-h-[500px] flex justify-center shadow-lg overflow-hidden rounded-3xl w-4/5 max-w-4xl bg-white">
        {/* Left Side - Login Form */}
        <div className="flex-1 bg-gray-50 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Welcome Message */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome Back !!!
              </h1>

              <p className="text-gray-600">
                Please enter your credentials to log in
              </p>
            </div>

            {/* Error Message */}
            <ErrorDisplay error={error} />

            {/* Login Form */}
            <div className="space-y-6">
              {isNewPassword ? (
                <NewPasswordForm
                  newPassword={newPassword}
                  confirmPassword={confirmPassword}
                  isLoading={isLoading}
                  passwordMismatch={passwordMismatch}
                  onNewPasswordChange={setNewPassword}
                  onConfirmPasswordChange={setConfirmPassword}
                  onSubmit={handleSetPassword}
                />
              ) : (
                <LoginForm
                  username={username}
                  password={password}
                  isLoading={isLoading}
                  onUsernameChange={setUsername}
                  onPasswordChange={setPassword}
                  onSubmit={handleLogin}
                />
              )}
            </div>
          </div>
        </div>

        {/* Right Side */}
        <RightSidePanel />
      </div>
    </div>
  );
};

export default SigninPage;
