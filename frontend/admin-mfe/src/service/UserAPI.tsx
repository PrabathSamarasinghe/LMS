import { endpoints } from "../config/endPoints";
import axios from "axios";
import UserQueries from "../GraphQL/User.queries";
import { UserInput, User } from "../utils/interfaces";

const token = sessionStorage.getItem("GTNLibrary") || "";
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// API endpoint for user operations
const USERS_API = endpoints.baseUrl + "users";

/**
 * Registers a new librarian in the system
 * @param userInput - The librarian's profile information
 * @returns Promise<string> - Success message with user ID or error message
 */
export const RegisterLibrarian = async (
  userInput: UserInput
): Promise<string> => {
  try {
    const response = await axios.post(USERS_API, {
      query: UserQueries.REGISTER_LIBRARIAN,
      variables: { userInput },
    });
    return response.data?.data?.CreateUser || "Registration failed";
  } catch (error) {
    console.error("Error registering librarian:", error);
    return "Error registering librarian";
  }
};

/**
 * Fetches all librarians from the system with formatted profile data
 * @returns Promise<User[]> - Array of librarian profiles with formatted IDs and dates
 */
export const FetchAllLibrarians = async (): Promise<User[]> => {
  try {
    const response = await axios.post(USERS_API, {
      query: UserQueries.GET_ALL_LIBRARIANS,
      variables: { type: "librarian" },
    });
    const librarians = response.data?.data?.GetAllUsers || [];

    // Transform and format librarian data from API response
    const formattedLibrarians: User[] = librarians.map((librarian: any) => ({
      // Format ID with librarian prefix (L) and zero-padding
      id: `L${librarian.id.toString().padStart(3, '0')}`,
      email: librarian.email,
      fullname: librarian.fullname,
      phone: librarian.phone,
      address: librarian.address,
      // Convert timestamp to Date object
      dateOfBirth: new Date(parseInt(librarian.dateOfBirth)),
      gender: librarian.gender,
      nic: librarian.nic,
      // Convert timestamp to Date object
      membershipDate: new Date(parseInt(librarian.membershipDate)),
      type: librarian.type,
      status: librarian.status,
      registeredBy: librarian.registeredBy,
    }));
    return formattedLibrarians;
  } catch (error) {
    console.error("Error fetching librarians:", error);
    return [];
  }
};

/**
 * Fetches a user's complete profile information by ID
 * @param userId - The ID of the user to fetch
 * @returns Promise<User | null> - The user's profile with formatted data or null if not found
 */
export const FetchUserById = async (userId: string): Promise<User | null> => {
  try {
    const response = await axios.post(USERS_API, {
      query: UserQueries.GET_PROFILE_BY_ID,
      variables: { userId },
    });
    const user = response.data?.data?.GetProfile;
    if (user) {
      // Transform and format user data from API response
      return {
        // Format ID with admin prefix (A) and zero-padding
        id: `A${user.id.toString().padStart(3, '0')}`,
        email: user.email,
        fullname: user.fullname,
        phone: user.phone,
        address: user.address,
        // Convert timestamp to Date object
        dateOfBirth: new Date(parseInt(user.dateOfBirth)),
        gender: user.gender,
        nic: user.nic,
        // Convert timestamp to Date object
        membershipDate: new Date(parseInt(user.membershipDate)),
        type: user.type,
        status: user.status,
        registeredBy: user.registeredBy,
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return null;
  }
};

/**
 * Updates a user's profile information
 * @param userId - The ID of the user to update
 * @param userInput - Partial user profile data containing fields to update
 * @returns Promise<string> - Success message or error message
 */
export const UpdateUser = async (
  userId: string,
  userInput: Partial<UserInput>
): Promise<string> => {
  try {
    const response = await axios.post(USERS_API, {
      query: UserQueries.UPDATE_USER,
      variables: { userId, userInput },
    });
    return response.data?.data?.UpdateUser || "Update failed";
  } catch (error) {
    console.error("Error updating user:", error);
    return "Error updating user";
  }
};