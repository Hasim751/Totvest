import { RTCheckBox } from '../../../mycomponents/react-table/components/RTCheckBox';
import { ColumnDef } from '@tanstack/react-table';
import { Customer } from '../../../@types/customer';
import { RTActions } from 'src/mycomponents/react-table/components/RTActions';
import { CustomerActions } from '../components/CustomerAction';

export const customerCols: ColumnDef<Customer, any>[] = [
  {
    id: 'selection',
    header: ({ table }) => (
      <RTCheckBox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <RTCheckBox
        {...{
          checked: row.getIsSelected(),
          indeterminate: row.getIsSomeSelected(),
          onChange: row.getToggleSelectedHandler(),
        }}
      />
    ),
  },
  {
    accessorKey: 'customerId',
    header: 'Id',
  },
  {
    accessorKey: 'customerName',
    header: 'Name',
  },
  {
    accessorKey: 'customerPhone',
    header: 'Phone',
  },
  {
    accessorKey: 'customerEmail',
    header: 'Email',
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ cell }) => <RTActions row={cell.row} Actions={CustomerActions} />,
  },
];
