import React from 'react';

type Props = {
  index: number;
  value: number;
  children?: React.ReactNode;
  className?: string;
};

const TabPanel = (props: Props) => {
  const { children, value, index, className, ...other } = props;

  return (
    <div
      className={className}
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
};

export default TabPanel;
