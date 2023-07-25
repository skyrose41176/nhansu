import {DialogTitle, Divider, Stack, Typography} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
import {TransitionProps} from '@mui/material/transitions';
import React, {FC} from 'react';
import ButtonBase from '../button-base';
import LoadingOverlay from '../loading-overlay';
import IconButtonBase from '../icon-button-base';
import {CloseCircle} from 'iconsax-react';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  open: boolean;
  title: string;
  content: React.ReactNode;
  loading?: boolean;
  onClose?: () => void;
  onAgree?: () => void;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  onCloseText?: string;
  onAgreeText?: string;
  className?: string;
  children?: React.ReactNode;
}
const DialogConfirm: FC<Props> = ({
  open,
  title,
  loading = false,
  content,
  onClose = () => {},
  onAgree = () => {},
  maxWidth = 'sm',
  onCloseText = 'TỪ CHỐI',
  onAgreeText = 'ĐỒNG Ý',
  className = '',
  children,
}) => {
  return (
    <Dialog
      maxWidth={maxWidth}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      className={className}
      sx={{zIndex: 101}}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText className="text-center">{content}</DialogContentText>
        {children}
      </DialogContent>
      <Divider />
      <DialogActions>
        <Stack direction="row" justifyContent="center">
          <ButtonBase
            variant="outlined"
            color="error"
            onClick={onClose}
            sx={{minWidth: 150}}
            label={onCloseText}
          />
          <div style={{width: 16}} />
          <ButtonBase
            onClick={onAgree}
            variant="contained"
            color="success"
            sx={{minWidth: 150}}
            label={onAgreeText}
          />
        </Stack>
      </DialogActions>
      <LoadingOverlay open={loading} />
    </Dialog>
  );
};

export default DialogConfirm;
