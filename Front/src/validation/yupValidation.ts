import * as Yup from 'yup';

const optionalString = Yup.string().optional();

export const NewCustomerSchema = Yup.object().shape({
  customerName: Yup.string().required('Name is required'),
  customerEmail: Yup.string().required('Email is required').email(),
  customerPhone: Yup.string().required('Phone number is required').min(8,"Enter Number Properly"),
  customerBusiness_name: optionalString,
  customerGST: optionalString,
  customerPAN: optionalString,
});

export const NewAddressSchema = Yup.object().shape({
    businessAddress: Yup.string().required('Address is required'),
    pinCode: Yup.string().required('Pin code is required'),
    state: Yup.object().required(),
    city: Yup.string().required('city is required'),
}) 