import {
  Breakpoint,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  Divider,
  TextField,
  Typography,
} from '@mui/material';
import Slide from '@mui/material/Slide';
import {TransitionProps} from '@mui/material/transitions';
import {CloseCircle} from 'iconsax-react';
import React, {FC} from 'react';
import ButtonBase from '../button-base';
import IconButtonBase from '../icon-button-base';
import {Color} from '../../types';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props extends DialogProps {
  open: boolean;
  title: string;
  children?: React.ReactNode;
  onClose?: () => void;
  onSubmit?: () => void;
  isSubmitting?: boolean;
  textAccept?: string;
  textCancel?: string;
  maxWidth?: false | Breakpoint;
  hiddenAcceptButton?: boolean;
  className?: string;
  loading?: boolean;
  color?: Color;
}
export interface DialogBaseProps extends Props {}

const DialogBase: FC<Props> = ({
  open,
  title,
  children,
  onClose,
  onSubmit,
  isSubmitting = false,
  textCancel = 'Thoát',
  textAccept = 'Xác nhận',
  maxWidth = 'xs',
  className = '',
  hiddenAcceptButton = false,
  loading = false,
  color = 'success',
  ...rest
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={maxWidth}
      onClick={e => {
        e.stopPropagation();
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions className="txtUpper case">
        <div className="flex justify-end">
          <ButtonBase
            style={{
              marginRight: 4,
            }}
            label={textCancel}
            variant="outlined"
            color="inherit"
            onClick={onClose}
          />
          <ButtonBase
            label={textAccept}
            variant="contained"
            color={color}
            onClick={onSubmit}
            loading={loading}
          />
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default DialogBase;
