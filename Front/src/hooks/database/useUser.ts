import { CustForm, Customer, CustomerWithAddress } from '../../@types/customer';
import { usePrivateApi } from './usePrivateApi';
import { NestCommonRes } from '../../@types/https';
import { Row } from '@tanstack/react-table';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { User } from 'src/pages/public/Register/RegisterForm';


export const useUser = () => {
  const privateApi = usePrivateApi()


  const createUser = async (formData: User) => {
    const { data } = await privateApi.post("/auth/register", formData);
    
    return Promise.resolve(data as NestCommonRes)
  }
  const addCampaign = async (formData: any) => {
    const { data } = await privateApi.post("/auth/register", formData);
    
    return Promise.resolve(data as NestCommonRes)
  }

  return { createUser, addCampaign }
}