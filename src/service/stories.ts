import { axiosInstance } from '../config/axios';

interface createStoryTypes {
  title: string;
  content: string;
  featuredImages: string;
  tags: string[];
}
interface updateStoryTypes extends Partial<createStoryTypes> {}
export const getStories = async (page?: number, perPage?: number, search?: string) => {
  const res = await axiosInstance.get<any, any>(
    `/admin/stories?page=${page || 1}&perPage=${perPage || 5}&search=${search || ''}`
  );
  return res;
};

export const getStoryById = async (id: string) => {
  const res = await axiosInstance.get<any, any>('/admin/stories/' + id);
  return res;
};

export const createStory = async (data: createStoryTypes) => {
  const res = await axiosInstance.post('/admin/stories', data);
  return res;
};
export const deleteStory = async (id: string) => {
  const res = await axiosInstance.delete('/admin/stories/' + id);
  return res;
};
export const updateStory = async (data: updateStoryTypes, id: string) => {
  const res = await axiosInstance.put('/admin/stories/' + id, data);
  return res;
};
