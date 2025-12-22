import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { userPool } from "./cognito";

export interface AuthResponse {
  idToken: string;
  accessToken: string;
  refreshToken: string;
}

export interface NewPasswordRequiredResponse {
  newPasswordRequired: true;
  user: CognitoUser;
}

// Sign in
export const signIn = async (username: string, password: string): Promise<AuthResponse | NewPasswordRequiredResponse> => {
  const user = new CognitoUser({ Username: username, Pool: userPool });
  const authDetails = new AuthenticationDetails({ Username: username, Password: password });

  return new Promise((resolve, reject) => {
    user.authenticateUser(authDetails, {
      onSuccess: (session) => {
        resolve({
          idToken: session.getIdToken().getJwtToken(),
          accessToken: session.getAccessToken().getJwtToken(),
          refreshToken: session.getRefreshToken().getToken(),
        });
      },
      onFailure: (err) => reject(err),
      newPasswordRequired: (userAttributes, requiredAttributes) => {
        resolve({ newPasswordRequired: true, user });
      },
    });
  });
};

// Complete first-time password setup
export const completeNewPassword = async (user: CognitoUser, newPassword: string): Promise<AuthResponse> => {
  return new Promise((resolve, reject) => {
    user.completeNewPasswordChallenge(newPassword, {}, {
      onSuccess: (session) => {
        resolve({
          idToken: session.getIdToken().getJwtToken(),
          accessToken: session.getAccessToken().getJwtToken(),
          refreshToken: session.getRefreshToken().getToken(),
        });
      },
      onFailure: (err) => reject(err),
    });
  });
};
