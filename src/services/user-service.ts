import { useQuery } from "@tanstack/react-query";

import { UserRole } from "@/constants/user";
import type { IUserMeta } from "@/types/user/user-meta";
import { getAccessToken } from "@/utils/access-token";

export const getMe = async () => {
  //mock api for getting profile;
  const user: IUserMeta = await new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        email: "user@email.com",
        firstName: "John Doe",
        lastName: "EMAIL",
        id: "sass",
        role: UserRole.Developer,
      });
    }, 1000); // Simulating 1 second delay
  });
  return user;
};

export const useGetMe = () => {
  const token = getAccessToken();

  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    enabled: Boolean(token),
  });
};
