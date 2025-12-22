import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolId = process.env.REACT_APP_COGNITO_USER_POOL_ID;
const clientId = process.env.REACT_APP_COGNITO_CLIENT_ID;

if (!poolId || !clientId) {
  throw new Error("Missing REACT_APP_COGNITO_* env variables");
}

export const userPool = new CognitoUserPool({
  UserPoolId: poolId,
  ClientId: clientId,
});