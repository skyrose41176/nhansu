/* eslint-disable react-hooks/exhaustive-deps */
import {Card, CardActions, Divider, Stack, Typography} from '@mui/material';
import {Refresh} from 'iconsax-react';

import React, {FC, useEffect, useRef} from 'react';
import {COLORS} from '../../../constants';
import IconButtonBase from '../icon-button-base';

interface Props {
  headerShow?: boolean;
  title?: React.ReactNode;
  maxHeight?: number;
  height?: number;
  fullWidth?: boolean;
  children?: React.ReactNode | React.ReactChild;
  actions?: React.ReactNode | React.ReactChild;
  actionsHeader?: React.ReactNode | React.ReactChild;
  className?: string;
  textAlign?: 'left' | 'right' | 'center' | undefined;
  getSize?: ({width, height}: {width: number; height: number}) => void;
  refreshData?: () => void;
}
const CardBase: FC<Props> = props => {
  const {
    children,
    actions,
    actionsHeader,
    headerShow = false,
    maxHeight,
    title,
    fullWidth,
    className,
    textAlign,
    height,
    getSize = () => {},
    refreshData,
  } = props;
  const ref = useRef<any>(null);
  useEffect(() => {
    getSize && getSize({width: ref.current.clientWidth, height: ref.current.clientHeight});
  });
  return (
    <Card
      ref={ref}
      className={className + ' rounded-[4px] shadow-none card-border overflow-auto'}
      elevation={3}
      sx={{maxHeight, height}}
    >
      {headerShow && (
        <div className="sticky top-0 z-10">
          <Stack
            sx={{px: 1, backgroundColor: '#fff'}}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            textAlign={textAlign}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography
                flex={1}
                className="border-0  box-title"
                variant="subtitle2"
                color={COLORS.primary}
              >
                {title}
              </Typography>
              {refreshData && (
                <IconButtonBase
                  title="Làm mới dữ liệu"
                  size="small"
                  iconName={Refresh}
                  color="primary"
                  rounded
                  onClick={refreshData}
                />
              )}
            </Stack>
            {actionsHeader}
          </Stack>
          <Divider />
        </div>
      )}
      <div className={`${fullWidth ? '' : 'p-4'}`}>{children}</div>

      {actions && (
        <>
          <Divider />
          <CardActions className="flex flex-row justify-end p-2">
            <div>{actions}</div>
          </CardActions>
        </>
      )}
    </Card>
  );
};
export default CardBase;
