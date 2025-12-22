import React, { useState, useEffect, useMemo } from "react";
import ProfileAvatar from "../components/ProfileComponents/ProfileAvatar";
import ProfileInfo from "../components/ProfileComponents/ProfileInfo";
import ProfileEditForm from "../components/ProfileComponents/ProfileEditForm";
import ProfileStats from "../components/ProfileComponents/ProfileStats";
import { FetchProfileById } from "../services/UserAPI";
import { TypeOfInput } from "../utils/enums";
import { ProfilePageProps, UserProfileData } from "../utils/interfaces";


export default function ProfilePage({
  stats = [],
  infoSections = [],
  editableFields = [],
  onSaveProfile,
}: ProfilePageProps = {}) {

  const [user, setUser] = useState<UserProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [success, setSuccess] = useState("");

  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      setFetchError("User ID not found in session");
      setIsLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const fetchedUser = await FetchProfileById(userId);
        if (fetchedUser) {
          setUser(fetchedUser);
          console.log(fetchedUser);
          
          setFetchError("");
        } else {
          setFetchError("User not found");
        }
      } catch (error) {
        setFetchError(error instanceof Error ? error.message : "Failed to fetch user");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const currentUser = user;

  const defaultStats = useMemo(() => {
    if (!currentUser) return [];
    return [
      {
        label: "Status",
        value: currentUser.status || "Active",
        icon: "✓",
      },
      {
        label: "Member Since",
        value: currentUser.membershipDate?.split("-")[0] || "N/A",
        icon: "📅",
      },
      {
        label: "Type",
        value: currentUser.type || "N/A",
        icon: "👤",
      },
    ];
  }, [currentUser]);

  const defaultInfoSections = useMemo(() => {
    if (!currentUser) return [];
    return [
      {
        title: "Personal Information",
        items: [
          { label: "Full Name", value: currentUser.fullname, key: "fullname" },
          { label: "Email Address", value: currentUser.email, key: "email" },
          { label: "Phone Number", value: currentUser.phone || "-", key: "phone" },
          { label: "Date of Birth", value: currentUser.dateOfBirth || "-", key: "dateOfBirth" },
          { label: "Gender", value: currentUser.gender || "-", key: "gender" },
          { label: "NIC", value: currentUser.nic || "-", key: "nic" },
          { label: "Address", value: currentUser.address || "-", key: "address" },
          { label: "Member ID", value: currentUser.id, key: "id" },
          { label: "Membership Date", value: currentUser.membershipDate || "-", key: "membershipDate" },
          { label: "Member Type", value: currentUser.type || "-", key: "type" },
          { label: "Account Status", value: currentUser.status || "Active", key: "status" },
          { label: "Registered By", value: currentUser.registeredBy || "-", key: "registeredBy" },
        ],
      },
    ];
  }, [currentUser]);

  const defaultEditableFields = useMemo(() => {
    if (!currentUser) return [];
    return [
      {
        name: "fullname",
        label: "Full Name",
        type: TypeOfInput.TEXT,
        value: currentUser.fullname,
        required: true,
      },
      {
        name: "email",
        label: "Email Address",
        type: TypeOfInput.EMAIL,
        value: currentUser.email,
        required: true,
      },
      {
        name: "phone",
        label: "Phone Number",
        type: TypeOfInput.TEL,
        value: currentUser.phone || "",
      },
      {
        name: "dateOfBirth",
        label: "Date of Birth",
        type: TypeOfInput.DATE,
        value: currentUser.dateOfBirth || "",
      },
      {
        name: "gender",
        label: "Gender",
        type: TypeOfInput.SELECT,
        value: currentUser.gender || "",
        options: [
          { label: "Male", value: "Male" },
          { label: "Female", value: "Female" },
          { label: "Other", value: "Other" },
        ],
      },
      {
        name: "address",
        label: "Address",
        type: TypeOfInput.TEXT,
        value: currentUser.address || "",
      },
    ];
  }, [currentUser]);

  const handleSaveProfile = async (data: { [key: string]: string }) => {
    setIsSaving(true);
    setSaveError("");
    setSuccess("");

    try {
      if (onSaveProfile) {
        await onSaveProfile(data);
        setSuccess("Profile updated successfully!");
        setTimeout(() => {
          setEditOpen(false);
          setSuccess("");
        }, 2000);
      } else {
        console.log("Profile data:", data);
        setSuccess("Profile updated successfully!");
        setTimeout(() => {
          setEditOpen(false);
          setSuccess("");
        }, 2000);
      }
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Failed to save profile");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full bg-gray-50 py-6">
        <div className="text-center">
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="w-full bg-gray-50 py-6">
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">{fetchError}</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="w-full bg-gray-50 py-6">
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800">No user data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-gray-800">My Profile</h1>
        <p className="text-gray-600 text-sm mt-1">
          Manage your account information
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        {/* Profile Avatar */}
        <div className="lg:col-span-1">
          <ProfileAvatar
            name={currentUser.fullname}
            email={currentUser.email}
            role={currentUser.type}
            onEditClick={() => setEditOpen(true)}
          />
        </div>

        {/* Stats */}
        {(stats.length > 0 || defaultStats.length > 0) && (
          <div className="lg:col-span-2">
            <ProfileStats stats={stats.length > 0 ? stats : defaultStats} />
          </div>
        )}
      </div>
      {/* Profile Information */}
      <div className="w-full">
        <ProfileInfo
          sections={infoSections.length > 0 ? infoSections : defaultInfoSections}
        />
      </div>

      {/* Edit Profile Form Dialog */}
      {editableFields.length > 0 || defaultEditableFields.length > 0 ? (
        <ProfileEditForm
          open={editOpen}
          onClose={() => {
            setEditOpen(false);
            setSaveError("");
            setSuccess("");
          }}
          onSubmit={handleSaveProfile}
          fields={
            editableFields.length > 0 ? editableFields : defaultEditableFields
          }
          isLoading={isSaving}
          error={saveError}
          success={success}
        />
      ) : null}
    </div>
  );
}
