// routes
import { PATH_AUTH, PATH_ABOUT, PATH_STARTUP, PATH_TOTDOCS, PATH_PARTNERSHIP } from '../../../routes/paths';
// config
import { PATH_AFTER_LOGIN } from '../../../config';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const navConfig = [
  {
    title: 'Home',
    icon: <Iconify icon="eva:home-fill" />,
    path: '/',
  },
  {
    title: 'StartUp',
    icon: <Iconify icon="eva:home-fill" />,
    path: PATH_STARTUP,
  },
  {
    title: 'TotDocs',
    icon: <Iconify icon="eva:home-fill" />,
    path: PATH_TOTDOCS,
  },
  {
    title: 'Partnership',
    icon: <Iconify icon="eva:home-fill" />,
    path: PATH_TOTDOCS,
  },
  {
    title: 'About Us',
    icon: <Iconify icon="eva:book-open-fill" />,
    path: PATH_ABOUT,
  },
];

export default navConfig;
