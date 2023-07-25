import {Checkbox as CheckboxJoy, CheckboxProps as CheckboxJoyProps} from '@mui/joy';
export interface CheckboxProps extends CheckboxJoyProps {}

export default function Checkbox({...rest}: CheckboxProps) {
  return <CheckboxJoy sx={{fontWeight: '500', fontSize: 14}} {...rest} />;
}
