import { capitalCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
// sections
import { CustomBreadcrumbs } from '../../components/custom-breadcrumbs/CustomBreadcrumbs';
import { Helmet } from 'react-helmet-async';
import { useSettingsContext } from '../../components/settings/SettingsContext';
import { FC } from 'react';
import { CampaignForm } from './CampaignForm';

// ----------------------------------------------------------------------
type Props = {};
const AddCampaign: FC<Props> = () => {
  const { themeStretch } = useSettingsContext();

  const { pathname } = useLocation();

  const { name = '' } = useParams();

  const isEdit = pathname.includes('edit');


  return (
    <>
      <Helmet>
        <title>Create Customer</title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={!isEdit ? 'Add a new customer' : 'Edit customer'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'campaign', href: PATH_DASHBOARD.customer.root },
            { name: !isEdit ? 'New customer' : capitalCase(name) },
          ]}
        />
        <CampaignForm />
      </Container>
    </>
  );
};

export default AddCampaign;
