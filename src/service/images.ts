import { axiosInstance } from '../config/axios';

export const UploadsImages = async (data: any) => {
  const res = await axiosInstance.post('/upload/images', data, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
  return res;
};
