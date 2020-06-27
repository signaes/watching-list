import * as React from 'react';

const ArrowRight: React.SFC<{
  fill?: string;
  className?: string;
}> = ({
  fill = '#000000',
  className = '',
}) => (
  <span className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" fill={fill} />
    </svg>
  </span>
);

export default ArrowRight;
