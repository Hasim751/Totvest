import { FC, useMemo } from 'react';
import { RTTable } from '../../mycomponents/react-table/RTTable';
import { customerCols } from './helper/customer.col';
import { useQuery } from '@tanstack/react-query';
import { Button, Container } from '@mui/material';
import { PATH_DASHBOARD } from '../../routes/paths';
import { Link as RouterLink } from 'react-router-dom';
import Iconify from '../../components/iconify/Iconify';
import { CustomBreadcrumbs } from '../../components/custom-breadcrumbs/CustomBreadcrumbs';
import { useSettingsContext } from '../../components/settings/SettingsContext';
import { Helmet } from 'react-helmet-async';
import { useCustomer } from 'src/hooks/database/useCustomer';
type Props = {};

const CustomerList: FC<Props> = () => {
  const { getAllCustomers, deleteCustomerByID, deleteMany } = useCustomer();
  const tableColumns = useMemo(() => customerCols, []);
  const { data } = useQuery(['customers'], getAllCustomers, {
    initialData: [],
    refetchOnWindowFocus: false,
  });

  const { themeStretch } = useSettingsContext();
  

  return (
    <>
      <Helmet>
        <title> Customer List | SMTEg</title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="User List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Customers', href: PATH_DASHBOARD.customer.root },
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.customer.add}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              New Customer
            </Button>
          }
        />
        <RTTable
          tableCols={tableColumns}
          tableData={data}
          dense={true}
          handleDeleteSelectedRows={deleteMany}
          handleDeleteRowByID={deleteCustomerByID}
        />
        ;
      </Container>
    </>
  );
};

export default CustomerList;
