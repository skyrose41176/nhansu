import {IconButton, Input as InputJoy, InputProps as InputJoyProps} from '@mui/joy';
import {CloseCircle, SearchNormal} from 'iconsax-react';
import {useRef, useState} from 'react';
import {Colors} from '../../../assets/styles';
export interface SearchBarProps extends Omit<InputJoyProps, 'onSubmit'> {
  placeholder?: string;
  onSubmit?: (value: string) => void;
}

export default function SearchBar({
  placeholder = 'Vui lòng nhập thông tin',
  onSubmit,
  ...rest
}: SearchBarProps) {
  const [search, setSearch] = useState('');
  const typingRef = useRef<any>();

  const handleSearchDebounce = (value: string) => {
    setSearch(value);
    if (typingRef.current) {
      clearTimeout(typingRef.current);
    }
    typingRef.current = setTimeout(() => {
      onSubmit && onSubmit(value);
    }, 300);
  };
  return (
    <InputJoy
      {...rest}
      placeholder={placeholder}
      startDecorator={<SearchNormal variant="Bulk" color={Colors.blueLight} />}
      fullWidth
      endDecorator={
        search.length > 0 && (
          <IconButton
            onClick={() => handleSearchDebounce('')}
            variant="plain"
            color="neutral"
            sx={{borderRadius: 100}}
          >
            <CloseCircle variant="Bulk" color={Colors.gray} />
          </IconButton>
        )
      }
      value={search}
      onChange={({target: {value}}) => handleSearchDebounce(value)}
    />
  );
}
