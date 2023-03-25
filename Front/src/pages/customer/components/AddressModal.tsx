import { DialogTitle } from '@mui/material';
import { FC } from 'react';
import Scrollbar from 'src/components/scrollbar';
import { Address, AddressType } from '../../../@types/address';
import { AddressForm } from './AddressForm';
import DialogAnimate from '../../../components/animate/DialogAnimate';

type Props = {
  defaultAddress: Address | null;
  handleCloseModal: () => void;
  isModalOpen: boolean;
  title: string;
  AddressFunctions: {
    addAddress: (address: Address) => void;
    editAddress: (address: Address) => void;
    addressType: AddressType;
    removeAddress: (address_id: string) => void;
  };
};
export const AddressModal: FC<Props> = ({
  defaultAddress,
  handleCloseModal,
  isModalOpen,
  title,
  AddressFunctions,
}) => (
  <DialogAnimate fullWidth maxWidth="lg" open={isModalOpen} onClose={handleCloseModal}>
    <DialogTitle>{title}</DialogTitle>
    <Scrollbar>
      <AddressForm
        {...AddressFunctions}
        defaultAddress={defaultAddress}
        handleCloseModal={handleCloseModal}
      />
    </Scrollbar>
  </DialogAnimate>
);
