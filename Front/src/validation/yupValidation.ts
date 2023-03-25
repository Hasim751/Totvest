import * as Yup from 'yup';
import { email } from '../_mock/assets/email';

const optionalString = Yup.string().optional();

export const NewCustomerSchema = Yup.object().shape({
  customerName: Yup.string().required('Name is required'),
  customerEmail: Yup.string().required('Email is required').email(),
  customerPhone: Yup.string().required('Phone number is required').min(8, "Enter Number Properly"),
  customerBusiness_name: optionalString,
  customerGST: optionalString,
  customerPAN: optionalString,
});
const phoneRegExp = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/



export const NewAddressSchema = Yup.object().shape({
    businessAddress: Yup.string().required('Address is required'),
    pinCode: Yup.string().required('Pin code is required'),
    state: Yup.object().required(),
    city: Yup.string().required('city is required'),
  })

export const NewUserSchema = Yup.object().shape({
  firstName: Yup.string().required('please enter Name'),
  email: Yup.string().email("email is not valid").required(),
  mobile: Yup.string().required(),
  password: Yup.string().required('please enter password'),
  userType: Yup.string().required('please select userType'),
}) 
