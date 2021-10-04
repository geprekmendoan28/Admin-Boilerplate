import { axiosInstance } from '../config/axios';

interface UserDto {
  data: {
    id: string;
    name: string;
    username: string;
    email: string;
    photoProfile: string;
  };
}
export const getUserByToken = async () => {
  const res = await axiosInstance.get<any, UserDto>('/users/profile');
  return res;
};
