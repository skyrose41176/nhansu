import {useInfiniteQuery, useMutation, useQuery, useQueryClient} from 'react-query';
import {QueryParams, ResponseData, ResultData} from '../models/common';
import axiosClient from './axiosClient';
import {useSnackbar} from 'notistack';
export declare module NhanSuNamespace {
  export interface NhanSuRes {
    mail: string;
    ten: string;
    id: number;
    createdBy?: any;
    created: Date;
    lastModifiedBy?: any;
    lastModified?: any;
  }
}

const NhanSuApi = {
  getAll: (params: QueryParams): Promise<ResponseData<ResultData<NhanSuNamespace.NhanSuRes>>> => {
    const url = '/NhanSu/du-lieu';
    return axiosClient.get(url, {params});
  },
  getOne: (id: number | string): Promise<ResponseData<NhanSuNamespace.NhanSuRes>> => {
    const url = `/NhanSu/chi-tiet?id=${id}`;
    return axiosClient.get(url);
  },
  create: (data: Partial<NhanSuNamespace.NhanSuRes>): Promise<ResponseData<number>> => {
    const url = '/NhanSu/tao';
    return axiosClient.post(url, data);
  },
  update: (data: Partial<NhanSuNamespace.NhanSuRes>): Promise<ResponseData<number>> => {
    const url = `/NhanSu/cap-nhat/${data.id}`;
    return axiosClient.put(url, data);
  },
  delete: (id: number | string): Promise<ResponseData<number>> => {
    const url = `/NhanSu/xoa?id=${id}`;
    return axiosClient.delete(url);
  },
};

export const useGetListUser = (filters: QueryParams) => {
  return useQuery(['listuser', filters], () => NhanSuApi.getAll(filters), {
    onError: (error: Error) => {
      console.log(error);
    },
  });
};
export const useGetUser = (id: string | number) => {
  return useQuery(['user'], () => NhanSuApi.getOne(id), {
    onError: (error: Error) => {
      console.log(error);
    },
  });
};
export const useCreateNguoiDung = () => {
  const {enqueueSnackbar} = useSnackbar();
  const queryClient = useQueryClient();
  return useMutation(NhanSuApi.create, {
    onSuccess: () => {
      enqueueSnackbar('Tạo thành công', {variant: 'success'});
      queryClient.invalidateQueries('listuser');
    },
    onError: (error: Error) => {
      console.log(error);
      enqueueSnackbar('Đã xảy ra lỗi khi tạo', {variant: 'error'});
    },
  });
};
export const useUpdateNguoiDung = () => {
  const queryClient = useQueryClient();
  const {enqueueSnackbar} = useSnackbar();
  return useMutation(NhanSuApi.update, {
    onSuccess: () => {
      enqueueSnackbar('Tạo thành công', {variant: 'success'});
      queryClient.invalidateQueries('listuser');
    },
    onError: (error: Error) => {
      console.log(error);
      enqueueSnackbar('Đã xảy ra lỗi khi tạo', {variant: 'error'});
    },
  });
};
export const useDeleteNguoiDung = () => {
  const queryClient = useQueryClient();
  const {enqueueSnackbar} = useSnackbar();
  return useMutation(NhanSuApi.delete, {
    onSuccess: () => {
      enqueueSnackbar('Xóa thành công', {variant: 'success'});
      queryClient.invalidateQueries('listuser');
    },
    onError: (error: Error) => {
      console.log(error);
      enqueueSnackbar('Đã xảy ra lỗi khi xóa', {variant: 'error'});
    },
  });
};
export default NhanSuApi;
