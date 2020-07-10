import React from 'react';
import { Tooltip, colors, TooltipProps } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';

type Props = {
  title: string;
  placement: TooltipProps['placement'];
};
export default function ({ title, placement }: Props) {
  return (
    <Tooltip arrow title={title} placement={placement}>
      <HelpIcon fontSize="small" style={{ color: colors.grey[400] }} />
    </Tooltip>
  );
}
