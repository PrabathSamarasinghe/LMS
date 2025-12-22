// Import AWS SDK for Cognito operations
const AWS = require("aws-sdk");
// Import the Prisma client to interact with the database
const prisma = require("../prisma.js");
// Import the crypto module for generating temporary passwords
const cripto = require("crypto");

// Initialize Cognito Identity Service Provider with the specified region
const cognito = new AWS.CognitoIdentityServiceProvider({
  region: "eu-north-1",
});

// Define Query resolvers
const Query = {
  // Fetch all users of a specific type
  GetAllUsers: async (_, { type }) => {
    return await prisma.user.findMany({ where: { type: type } });
  },

  // Fetch a user by their unique ID
  GetUserById: async (_, { userId }) => {
    return await prisma.user.findUnique({
      where: { id: userId },
    });
  },

  // Fetch a user profile by their Cognito user ID
  GetProfile: async (_, { userId }) => {
    return await prisma.user.findUnique({
      where: { cognitoUserId: userId },
    });
  },
};

// Define Mutation resolvers
const Mutation = {
  // Create a new user in Cognito and the database
  CreateUser: async (_, { userInput }) => {
    // Generate a temporary password for the new user
    const TemporaryPassword = cripto.randomBytes(8).toString("hex") + "A1!";

    const {
      email,
      fullname,
      phone,
      address,
      dateOfBirth,
      gender,
      nic,
      membershipDate,
      type,
      status,
      registeredBy,
    } = userInput;

    try {
      // Create the user in Cognito
      const params = {
        UserPoolId: "eu-north-1_qyHLCgvQW",
        Username: email,
        TemporaryPassword: TemporaryPassword,
        UserAttributes: [
          { Name: "email", Value: email },
          { Name: "custom:role", Value: type },
        ],
      };

      const result = await cognito.adminCreateUser(params).promise();

      // Extract the Cognito user ID (sub) from the response
      const sub = result.User.Attributes.find((a) => a.Name === "sub").Value;

      // Create the user in the database
      await prisma.user.create({
        data: {
          email,
          fullname,
          phone,
          address,
          dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
          gender,
          nic,
          cognitoUserId: sub,
          membershipDate: membershipDate
            ? new Date(membershipDate)
            : new Date(),
          type,
          status,
          registeredBy,
        },
      });
      return "User created successfully";
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Failed to create user");
    }
  },

  // Delete a user from Cognito and the database
  DeleteUser: async (_, { userId }) => {
    try {
      // Fetch the user from the database
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
      if (!user) {
        throw new Error("User not found");
      }

      // Delete the user from Cognito
      const params = {
        UserPoolId: "eu-north-1_qyHLCgvQW",
        Username: user.email,
      };

      await cognito.adminDeleteUser(params).promise();

      // Delete the user from the database
      await prisma.user.delete({
        where: { id: userId },
      });
      return "User deleted successfully";
    } catch (error) {
      console.error("Error deleting user:", error);
      throw new Error("Failed to delete user");
    }
  },

  // Update a user's details in Cognito and the database
  UpdateUser: async (_, { userId, userInput }) => {
    try {
      // Fetch the user from the database
      const user = await prisma.user.findUnique({
        where: { cognitoUserId: userId },
      });
      if (!user) {
        throw new Error("User not found");
      }

      // Update the user's attributes in Cognito
      await cognito
        .adminUpdateUserAttributes({
          UserPoolId: "eu-north-1_qyHLCgvQW",
          Username: user.email,
          UserAttributes: [
            ...(userInput.email
              ? [{ Name: "email", Value: userInput.email }]
              : []),
          ],
        })
        .promise();

      // Update the user's details in the database
      await prisma.user.update({
        where: { cognitoUserId: userId },
        data: { ...userInput },
      });
      return "User updated successfully";
    } catch (error) {
      console.error("Error updating user:", error);
      throw new Error("Failed to update user");
    }
  },
};

// Export the Query and Mutation resolvers
module.exports = {
  Query,
  Mutation,
};