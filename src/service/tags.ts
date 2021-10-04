import { axiosInstance } from '../config/axios';

export const getTags = async (page?: number, perPage?: number, search?: string) => {
  const res = await axiosInstance.get<any, any>(
    `/admin/tags?page=${page || 1}&perPage=${perPage || 10}&search=${search || ''}`
  );
  return res;
};
export const getTagsById = async (id: string) => {
  const res = await axiosInstance.get<any, any>('/admin/tags/' + id);
  return res;
};
export const createTags = async (data: { name: string }) => {
  const res = await axiosInstance.post<any, any>('/admin/tags', data);
  return res;
};
export const updateTags = async (id: string, data: { name: string }) => {
  const res = await axiosInstance.put<any, any>('/admin/tags/' + id, data);
  return res;
};
export const deleteTags = async (id: string) => {
  const res = await axiosInstance.delete<any, any>('/admin/tags/' + id);
  return res;
};
