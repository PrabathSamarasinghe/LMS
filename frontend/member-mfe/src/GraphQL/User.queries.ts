const GET_USER_BY_ID = `
query GetUserById($userId: String!) {
  GetUserById(userId: $userId) {
    id
  }
}`;

const GET_PROFILE_BY_ID = `
query GetProfile($userId: String!) {
  GetProfile(userId: $userId) {
    id
    email
    fullname
    phone
    address
    cognitoUserId
    dateOfBirth
    gender
    nic
    membershipDate
    type
    status
    registeredBy
  }
}`;

const UPDATE_USER = `
mutation UpdateUser($userId: String!, $userInput: UpdateUserInput!) {
  UpdateUser(userId: $userId, userInput: $userInput)
}`;

export default {
  GET_USER_BY_ID,
  GET_PROFILE_BY_ID,
  UPDATE_USER,
};
