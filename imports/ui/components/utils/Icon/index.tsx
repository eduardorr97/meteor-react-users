import React from 'react';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap } from '@material-ui/core';

type Props = {
  Component: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
  color?: 'inherit' | 'disabled' | 'action' | 'primary' | 'secondary' | 'error';
};

const Icon = ({ Component, color }: Props) => <Component color={color} />;

export default Icon;
