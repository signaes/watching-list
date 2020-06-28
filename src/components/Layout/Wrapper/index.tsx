import * as React from 'react';

const Wrapper: React.SFC<{
  className?: string;
  children: React.Component | React.Component[] | JSX.Element | JSX.Element[] | string;
}> = ({
  className = '',
  children,
}) => (
  <div className={`max-w-5xl px-4 mx-auto lg:px-0 ${className}`}>
    { children }
  </div>
);

export default Wrapper;
