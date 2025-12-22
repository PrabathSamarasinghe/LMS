import { endpoints } from "../config/endPoints";
import axios from "axios";
import UserQueries from "../GraphQL/User.queries";
import { UserProfileData } from "../utils/interfaces";

const token = sessionStorage.getItem("GTNLibrary") || "";
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

// API endpoint for user operations
const USERS_API = endpoints.baseUrl + "users";

export interface User {
  id: string;
}
/**
 * Fetches basic user information by ID
 * @param userId - The ID of the user to fetch
 * @returns Promise<User | null> - The user object or null if not found or error occurs
 */
export const FetchUserById = async (userId: string): Promise<User | null> => {
  try {
    const response = await axios.post(USERS_API, {
        query: UserQueries.GET_PROFILE_BY_ID,
        variables: { userId },
    });
    const userData = response.data?.data?.GetProfile;
    if (userData) {
        return {
            id: userData.id,
        };
    }
    return null;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return null;
  }
};

/**
 * Fetches complete profile information for a user with formatted data
 * @param userId - The ID of the user to fetch
 * @returns Promise<UserProfileData> - The user's complete profile with formatted dates and ID
 */
export const FetchProfileById = async (userId: string): Promise<UserProfileData> => {
  try {
    const response = await axios.post(USERS_API, {
        query: UserQueries.GET_PROFILE_BY_ID,
        variables: { userId },
    });
    const userData = response.data?.data?.GetProfile;

    // Transform raw API data into formatted profile object
    const ModifiedUserData = {
      ...userData,
      // Format ID with member prefix (M) and zero-padding
      id: `M${userData.id.toString().padStart(3, "0")}`,
      // Convert timestamp to formatted date string
      dateOfBirth: new Date(parseInt(userData.dateOfBirth)).toLocaleDateString("en-CA"),
      // Convert timestamp to formatted date string
      membershipDate: new Date(parseInt(userData.membershipDate)).toLocaleDateString("en-CA"),
    };

    return ModifiedUserData;
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
  userInput: Partial<UserProfileData>
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