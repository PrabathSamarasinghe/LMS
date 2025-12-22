import { endpoints } from "../config/endPoints";
import axios from "axios";
import UserQueries from "../GraphQL/User.queries";
import {
  FetchBookCountByMemberId,
  FetchTotalFinesByMemberId,
} from "./IssueBooksAPI";
import { CreateMemberInput, Member, User, UserProfileData, UserValidation } from "../utils/interfaces";

const token = sessionStorage.getItem("GTNLibrary") || "";
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

const USERS_API = endpoints.baseUrl + "users";

export const FetchUserById = async (userId: string): Promise<UserValidation | null> => {
  //Fetch user by ID 
  try {
    const response = await axios.post(USERS_API, {
        query: UserQueries.GET_USER_BY_ID,
        variables: { userId },
    });
    const userData = response.data?.data?.GetUserById;
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

export const FetchAllUsers = async (type: string): Promise<User[]> => {
  //Fetch all users of a specific type
  try {
    const response = await axios.post(USERS_API, {
      query: UserQueries.GET_ALL_USERS,
      variables: { type },
    });
    const users = response.data?.data?.GetAllUsers || [];

    // Map to User interface
    return users.map((user: User) => ({
      id: user.id,
      fullname: user.fullname,
    }));
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const FetchAllMembers = async (type: string): Promise<Member[]> => {
  //Fetch all members with detailed info
  try {
    const response = await axios.post(USERS_API, {
      query: UserQueries.GET_ALL_MEMBERS,
      variables: { type },
    });
    const members = response.data?.data?.GetAllUsers || [];

    //  Enhance with total fines and book count
    const DetailedMembers = await Promise.all(
      members.map(async (member: Member) => ({
        id: `M${member.id.toString().padStart(3, "0")}`, // Format member ID with 'M' prefix
        email: member.email,
        fullname: member.fullname,
        phone: member.phone,
        address: member.address,
        dateOfBirth: new Date(Number(member.dateOfBirth)).toLocaleDateString("en-GB"), // Format date of birth
        gender: member.gender,
        nic: member.nic,
        membershipDate:new Date(Number(member.membershipDate)).toLocaleDateString("en-GB"), // Format membership date
        // Fetch total fines and book count
        totalFines: await FetchTotalFinesByMemberId(
          `M${member.id.toString().padStart(3, "0")}`
        ),
        // Fetch total books issued
        totalBooksIssued: await FetchBookCountByMemberId(
          `M${member.id.toString().padStart(3, "0")}`
        ),
        status: member.status,
        registeredBy: member.registeredBy,
      }))
    );
    return DetailedMembers;
  } catch (error) {
    console.error("Error fetching members:", error);
    return [];
  }
};

export const CreateNewMember = async (memberData: CreateMemberInput) => {
  //Create a new member
  try {
    const response = await axios.post(USERS_API, {
      query: UserQueries.CREATE_MEMBER,
      variables: { memberData },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating new member:", error);
    throw error;
  }
};

export const GetNameById = async (userId: number): Promise<string> => {
  //Fetch user name by ID
  try {
    const response = await axios.post(USERS_API, {
        query: UserQueries.GET_NAME_BY_ID,
        variables: { userId },
        });
    const user = response.data?.data?.GetUserById;
    return user ? user.fullname : "Unknown User";
  } catch (error) {
    console.error("Error fetching user name by ID:", error);
    return "Unknown User";
  }
};

export const FetchNamebyId = async (userId: number): Promise<string> => {
  //Fetch user name by ID
  try {
    const response = await axios.post(USERS_API, {
        query: UserQueries.GET_NAME_BY_ID,
        variables: { userId },
        });
    const user = response.data?.data?.GetUserById;
    return user ? user.fullname : "Unknown User";
  } catch (error) {
    console.error("Error fetching user name by ID:", error);
    return "Unknown User";
  }
};

export const FetchProfileById = async (userId: string): Promise<UserProfileData> => {
  //Fetch user profile by ID
  try {
    const response = await axios.post(USERS_API, {
        query: UserQueries.GET_PROFILE_BY_ID,
        variables: { userId },
    });
    const userData = response.data?.data?.GetProfile;

    const ModifiedUserData = {
      ...userData,
      id: `L${userData.id.toString().padStart(3, "0")}`, // Format ID with 'L' prefix
      dateOfBirth: new Date(parseInt(userData.dateOfBirth)).toLocaleDateString("en-CA"), // Format date of birth
      membershipDate: new Date(parseInt(userData.membershipDate)).toLocaleDateString("en-CA"),// Format membership date
    };

    return ModifiedUserData;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return null;
  }
};

export const UpdateUser = async (
  userId: string,
  userInput: Partial<UserProfileData>
): Promise<string> => {
  //Update user details
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