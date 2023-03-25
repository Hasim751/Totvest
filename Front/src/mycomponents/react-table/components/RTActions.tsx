// @mui
import { IconButton } from '@mui/material';
//
import { FC, useState } from 'react';
import { Row } from '@tanstack/react-table';
import MenuPopover from '../../../components/menu-popover/MenuPopover';
import Iconify from '../../../components/iconify/Iconify';
// ----------------------------------------------------------------------
type ActionProps = {
  handleCloseMenu: VoidFunction;
  row: Row<any>
};
type Props = {
  Actions: FC<ActionProps>;
  row: Row<any>
};

export const RTActions: FC<Props> = ({ Actions, row }) => {
  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };
  return (
    <>
      <IconButton onClick={handleOpenMenu}>
        <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
      </IconButton>

      <MenuPopover
        open={openMenu}
        anchorEl={openMenu}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        arrow="right-top"
        sx={{
          mt: -1,
          width: 160,
          '& .MuiMenuItem-root': {
            px: 1,
            typography: 'body2',
            borderRadius: 0.75,
            '& svg': { mr: 2, width: 20, height: 20 },
          },
        }}
      >
        <Actions row={row} handleCloseMenu={handleCloseMenu} />
      </MenuPopover>
    </>
  );
};
