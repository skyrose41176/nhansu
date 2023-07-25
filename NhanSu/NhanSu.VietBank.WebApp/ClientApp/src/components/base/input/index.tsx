import {
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input as InputJoy,
  InputProps as InputJoyProps,
} from '@mui/joy';
import {Eye, EyeSlash, Icon} from 'iconsax-react';
import {Colors} from '../../../assets/styles';
import {useState} from 'react';
export interface InputProps extends InputJoyProps {
  label: string;
  placeholder?: string;
  helperText?: string;
  icon?: Icon;
  required?: boolean;
  usePassword?: boolean;
}

export default function Input({
  label,
  placeholder = 'Vui lòng nhập thông tin',
  helperText = '',
  icon: Icon,
  required = false,
  usePassword = false,
  ...rest
}: InputProps) {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  return (
    <FormControl>
      <FormLabel sx={{color: rest.error ? Colors.redDark : Colors.text}}>
        {label}
        {required && <span style={{color: Colors.redDark, marginLeft: 4}}>*</span>}
      </FormLabel>
      <InputJoy
        {...rest}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        type={usePassword ? (showPassword ? 'text' : 'password') : 'text'}
        startDecorator={
          Icon && (
            <Icon
              variant="Bulk"
              color={
                rest.error
                  ? focused
                    ? Colors.redDark
                    : Colors.red
                  : focused
                  ? Colors.blueLight
                  : Colors.stroke
              }
            />
          )
        }
        endDecorator={
          usePassword && (
            <IconButton variant="plain" onClick={() => setShowPassword(prev => !prev)}>
              {!showPassword ? (
                <EyeSlash variant="Bulk" color={rest.error ? Colors.redDark : Colors.blueLight} />
              ) : (
                <Eye variant="Bulk" color={rest.error ? Colors.redDark : Colors.blueLight} />
              )}
            </IconButton>
          )
        }
      />
      <FormHelperText sx={{color: rest.error ? Colors.redDark : Colors.text}}>
        {helperText}
      </FormHelperText>
    </FormControl>
  );
}
