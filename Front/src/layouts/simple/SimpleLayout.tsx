import { Outlet } from 'react-router-dom';
// hooks
import useOffSetTop from '../../hooks/general/useOffSetTop';
// config
import { HEADER } from '../../config';
// components
import Header from './Header';

// ----------------------------------------------------------------------

export default function SimpleLayout() {
  const isOffset = useOffSetTop(HEADER.H_MAIN_DESKTOP);

  return (
    <>
      <Header isOffset={isOffset} />

      <Outlet />
    </>
  );
}
