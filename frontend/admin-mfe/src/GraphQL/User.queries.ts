const REGISTER_LIBRARIAN = `
mutation Mutation($userInput: UserInput!) {
  CreateUser(userInput: $userInput)
}
`;

const GET_ALL_LIBRARIANS = `
query GetAllUsers($type: String!) {
  GetAllUsers(type: $type) {
    id
    email
    fullname
    phone
    address
    dateOfBirth
    gender
    nic
    membershipDate
    type
    status
    registeredBy
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
    REGISTER_LIBRARIAN,
    GET_ALL_LIBRARIANS,
    GET_PROFILE_BY_ID,
    UPDATE_USER
 };