import {Button as ButtonJoy, ButtonProps as ButtonJoyProps} from '@mui/joy';
import {Icon} from 'iconsax-react';
export interface ButtonProps extends Omit<ButtonJoyProps, 'startDecorator' | 'endDecorator'> {
  icon?: Icon;
  rounded?: boolean;
}

export default function Button({icon: Icon, rounded = false, ...rest}: ButtonProps) {
  return (
    <ButtonJoy
      {...rest}
      sx={{
        borderRadius: rounded ? 30 : 8,
      }}
      startDecorator={Icon && <Icon variant="Bulk" />}
    />
  );
}
