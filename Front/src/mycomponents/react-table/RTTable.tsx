import { FC, useState } from 'react';
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { Button, IconButton, SxProps, Table, TableContainer, Tooltip } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { RTTableSelectedAction } from './components/RTTableSelectedAction';
import { RTHeader } from './components/RTHeader';
import { RTBody } from './components/RTBody';
import Scrollbar from 'src/components/scrollbar';
import Iconify from '../../components/iconify/Iconify';
import ConfirmDialog from 'src/components/confirm-dialog';

type Props = {
  tableData: object[];
  tableCols: ColumnDef<any, any>[];
  dense: boolean;
  sx?: SxProps<Theme>;
  handleDeleteRowByID: Function;
  handleDeleteSelectedRows: Function;
};

export const RTTable: FC<Props> = ({
  tableData,
  tableCols,
  dense,
  sx,
  handleDeleteSelectedRows,
}) => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };
  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };
  const table = useReactTable({
    data: tableData,
    columns: tableCols,
    state: {
      rowSelection,
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    getSortedRowModel: getSortedRowModel(),
  });
  const { getHeaderGroups, getRowModel, getSelectedRowModel } = table;
  const selected = getSelectedRowModel().flatRows;
  const numSelected = selected.length;
  return (
    <>
      <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
        {numSelected > 0 && (
          <RTTableSelectedAction
            numSelected={numSelected}
            table={table}
            actions={
              <Tooltip title="Delete">
                <IconButton onClick={handleOpenConfirm} color="primary">
                  <Iconify icon={'eva:trash-2-outline'} />
                </IconButton>
              </Tooltip>
            }
          />
        )}
        <Scrollbar>
          <Table size={dense ? 'small' : 'medium'}>
            <RTHeader HeaderGroups={getHeaderGroups()} sx={sx} />
            <RTBody RowModel={getRowModel()} />
          </Table>
        </Scrollbar>
      </TableContainer>
      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {selected.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteSelectedRows(selected);
              handleCloseConfirm();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
};
