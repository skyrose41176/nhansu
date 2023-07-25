import {Stack} from '@mui/material';
import {Edit, Trash} from 'iconsax-react';
import {useState} from 'react';
import {useDeleteNguoiDung, useGetListUser} from '../../api/nguoi-dung.api';
import background from '../../assets/images/background.png';
import logo from '../../assets/images/logo.png';
import DataTable from '../../components/base/data-table';
import DialogConfirm from '../../components/base/dialog-confirm';
import IconButtonBase from '../../components/base/icon-button-base';
import {ColumnTableProps} from '../../components/types';
import {useWindowDimensions} from '../../hooks';
import {QueryParams} from '../../models/common';
import DialogNhanSu from './dialog-nhan-su';
import CardBase from '../../components/base/card-base';
import ButtonBase from '../../components/base/button-base';
const MainPage = () => {
  const [filters, setFilters] = useState<QueryParams>({
    pageNumber: 1,
    pageSize: 10,
    search: '',
  });

  const [showDialog, setShowDialog] = useState<{
    open: boolean;
    data: any | null;
    id: number | string | null;
  }>({
    open: false,
    data: null,
    id: null,
  });
  const [showDelete, setShowDelete] = useState<{
    open: boolean;
    id: number | string | null;
  }>({
    open: false,
    id: null,
  });
  const {data, isLoading} = useGetListUser(filters);
  const {mutate: mutateDelete, isLoading: isLoadingDelete} = useDeleteNguoiDung();

  const {width, height} = useWindowDimensions();
  const columns: ColumnTableProps[] = [
    {field: 'id', headerName: 'ID', width: (width * 20) / 100},
    {field: 'ten', headerName: 'Họ Tên', width: (width * 20) / 100},
    {field: 'mail', headerName: 'Email', width: (width * 20) / 100},
    {
      field: 'thaoTac',
      headerName: 'Thao tác',
      type: 'text',
      width: (width * 10) / 100,
      center: true,
      renderCell: (row: any) => {
        return (
          <div className="flex flex-row justify-center">
            <IconButtonBase
              iconName={Edit}
              hasBackground={false}
              tooltip="Sửa "
              onClick={() => setShowDialog({open: true, id: row.id, data: row})}
            />
            <IconButtonBase
              iconName={Trash}
              hasBackground={false}
              color="error"
              tooltip="Xóa "
              onClick={() => setShowDelete({open: true, id: row.id})}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        minWidth: '100vw',
        placeItems: 'center',
        display: 'grid',
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        marginBottom: 2,
      }}
    >
      {/* <Stack spacing={4} alignItems="center">
        <img
          src={logo}
          alt="logo"
          style={{
            height: 100,
            objectFit: 'contain',
          }}
        />
      </Stack> */}
      <CardBase className="mb-2">
        <ButtonBase
          variant="outlined"
          color="success"
          label="Thêm nhân sự"
          onClick={() => setShowDialog(prev => ({...prev, open: true}))}
        />
      </CardBase>
      <Stack>
        <DataTable
          columns={columns}
          rows={data?.data.data || []}
          loading={isLoading}
          maxHeight={height - 200}
          pagination={{
            show: true,
            page: (data?.data.currentPage ?? 1) - 1,
            totalCount: data?.data.totalCount ?? 0,
            rowsPerPage: data?.data.pageSize ?? 0,
            onPageChange: page => {
              console.log({page});
              setFilters(prev => ({...prev, pageNumber: page + 1}));
            },
            onRowsPerPageChange: value => {
              setFilters(prev => ({...prev, pageSize: value, pageNumber: 1}));
            },
          }}
        />
      </Stack>
      {showDialog.open && (
        <DialogNhanSu
          open={showDialog.open}
          data={showDialog?.data ?? null}
          id={showDialog.id}
          onClose={() => setShowDialog(prev => ({...prev, open: false, id: null}))}
        />
      )}
      {showDelete.open && (
        <DialogConfirm
          open={showDelete.open}
          title="Xác nhận"
          maxWidth="md"
          content="Bạn có chắc chắc muốn xóa?"
          loading={isLoadingDelete}
          onClose={() => setShowDelete(prev => ({...prev, open: false}))}
          onAgree={() => {
            mutateDelete(showDelete.id as number);
            setShowDelete(prev => ({...prev, open: false}));
          }}
        />
      )}
    </div>
  );
};

export default MainPage;
