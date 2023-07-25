import {FC} from 'react';
import {useQueryClient} from 'react-query';
import {useCreateNguoiDung, useUpdateNguoiDung} from '../../../api/nguoi-dung.api';
import FieldLayout from '../../../layouts/FieldLayout';
import DialogBase from '../../../components/base/dialog-base';
import {useForm} from 'react-hook-form';
import {InputField} from '../../../components/hook-form/fields';
interface Props {
  id: number | string | null;
  open: boolean;
  data: any | null;
  onClose: () => void;
}
interface FormData {
  ten: string;
  mail: string;
}
const DialogNhanSu: FC<Props> = ({id, onClose = () => {}, open, data, ...rest}) => {
  const queryClient = useQueryClient();

  const form = useForm<FormData>({
    defaultValues: {
      ten: data?.ten || '',
      mail: data?.mail || '',
    },
  });
  const {handleSubmit, reset} = form;
  const {mutate, isLoading} = useCreateNguoiDung();
  const {mutate: mutateUpdate, isLoading: isLoadingUpdate} = useUpdateNguoiDung();
  const onSubmit = async (data: any) => {
    if (id) {
      mutateUpdate({...data, id});
    } else {
      mutate(data);
    }
    onClose();
  };

  return (
    <DialogBase
      {...rest}
      onClose={onClose}
      open={open}
      title={id ? 'Cập nhật' : 'Thêm'}
      onSubmit={handleSubmit(onSubmit)}
      loading={form.formState.isSubmitting}
      maxWidth={'sm'}
      style={{zIndex: 101}}
    >
      <FieldLayout sm={6} md={6} lg={6} xl={6}>
        <InputField
          form={form}
          label="Tên"
          name="ten"
          rules={{
            required: {
              value: true,
              message: 'Vui lòng nhập',
            },
          }}
        />
        <InputField
          form={form}
          label="Email"
          name="mail"
          rules={{
            required: {
              value: true,
              message: 'Vui lòng nhập',
            },
          }}
        />
      </FieldLayout>
    </DialogBase>
  );
};

export default DialogNhanSu;
