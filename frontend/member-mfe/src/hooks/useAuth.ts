import { useEffect, useState } from "react";
import { FetchUserById } from "../services/UserAPI";
const useAuth = () => {

  const token = sessionStorage.getItem("GTNLibrary");
  const role = sessionStorage.getItem("role").toLocaleLowerCase();
  const userId = sessionStorage.getItem("userId");

  const [userIdValue, setUserIdValue] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (token && userId) {
        const user = await FetchUserById(userId);
        if (role == "librarian") {
          return setUserIdValue(`L${user?.id.toString().padStart(3, "0")}`);
        }
        if (role == "member") {
          return setUserIdValue(`M${user?.id.toString().padStart(3, "0")}`);
        }
        return setUserIdValue(`A${user?.id.toString().padStart(3, "0")}`);
      }
    };
    fetchUserData();
  }, [token, userId]);
  return { userId: userIdValue, id: userId};
};

export default useAuth;
