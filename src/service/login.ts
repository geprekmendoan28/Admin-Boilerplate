import { axiosInstance } from '../config/axios';

interface loginType {
  email: string;
  password: string;
}
export const login = async (body: loginType) => {
  const res = await axiosInstance.post<any, any>('/admin/auth/login', body);
  return res;
};
