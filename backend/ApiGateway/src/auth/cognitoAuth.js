const {jwtVerify, createRemoteJWKSet } = require("jose");
const dotenv = require("dotenv");
dotenv.config();

const region = process.env.COGNITO_REGION;
const userPoolId = process.env.COGNITO_USER_POOL_ID;
const issuer = `https://cognito-idp.${region}.amazonaws.com/${userPoolId}`;

const jwks = createRemoteJWKSet(
  new URL(`${issuer}/.well-known/jwks.json`)
);

const authenticateCognito = async (token) => {
  const { payload } = await jwtVerify(token, jwks, {
    issuer,
  });

  return payload;
}

module.exports = { authenticateCognito };