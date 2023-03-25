import { CustForm, Customer, CustomerWithAddress } from '../../@types/customer';
import { usePrivateApi } from './usePrivateApi';
import { NestCommonRes } from '../../@types/https';
import { Row } from '@tanstack/react-table';
import { useMutation, useQueryClient } from '@tanstack/react-query';


export const useCustomer = () => {
  const privateApi = usePrivateApi()
  const getAllCustomers = async () => {
    const { data } = await privateApi.get('/customer/all');
    return Promise.resolve(data as Customer[]);
  }

  const createCustomer = async (formData: CustomerWithAddress) => {
    const { data } = await privateApi.post("/customer/create", formData);
    return Promise.resolve(data as NestCommonRes)
  }
  const editCustomer = async (formData: CustomerWithAddress, customerId: string) => {
    const { data } = await privateApi.put(
      `/customer/edit/${customerId}`,
      formData
    );
    return Promise.resolve(data)
  }

  const getCustomerById = async (customerId: string) => {
    const { data } = await privateApi.get(`/customer/${customerId}`);
    return Promise.resolve(data)
  }

  const deleteCustomerByID = async (customerId: string) => {
    const { data } = await privateApi.delete(`/customer/delete/${customerId}`);
    return data
  }

  const deleteManyCustomers = async (selectedFlatRows: Row<any>[]) => {

    const customerIds = selectedFlatRows.map((row) => row.original.customerId)
    const { data } = await privateApi.delete(`/customer/deleteMany`, {
      data: { customerIds }
    });
    return data
  }



  const defaultCustomer = (customer: CustForm | undefined) => ({
    customerName: customer?.customerName || '',
    
  })

  const queryClient = useQueryClient()
  const { mutateAsync: deleteMany } = useMutation(deleteManyCustomers, {
    onSuccess: () => {
      queryClient.invalidateQueries(["customers"])
    }
  })

  return { getAllCustomers, createCustomer, editCustomer, getCustomerById, defaultCustomer, deleteCustomerByID, deleteMany }
}