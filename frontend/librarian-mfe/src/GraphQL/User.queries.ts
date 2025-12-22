const GET_ALL_USERS = `
query GetAllUsers($type: String!) {
  GetAllUsers(type: $type) {
    fullname
    id
  }
}`;

const GET_ALL_MEMBERS = `
query GetAllUsers($type: String!) {
  GetAllUsers(type: $type) {
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

const CREATE_MEMBER = `
mutation CreateUser($memberData: UserInput!) {
  CreateUser(userInput: $memberData)
}`;

const GET_NAME_BY_ID = `
query Query($userId: Int!) {
  GetUserById(userId: $userId) {
    fullname
  }
}`;
const GET_USER_BY_ID = `
query GetUserById($userId: int!) {
  GetUserById(userId: $userId) {
    id
  }
}`;

const UPDATE_USER = `
mutation UpdateUser($userId: String!, $userInput: UpdateUserInput!) {
  UpdateUser(userId: $userId, userInput: $userInput)
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

export default {
  GET_PROFILE_BY_ID,
  UPDATE_USER,
  GET_ALL_USERS,
  GET_ALL_MEMBERS,
  CREATE_MEMBER,
  GET_NAME_BY_ID,
  GET_USER_BY_ID
};
